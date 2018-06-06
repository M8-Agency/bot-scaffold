var restify = require('restify');
var builder = require('botbuilder');
var azure = require('botbuilder-azure'); 

//Dialogs
const dialogRoot = require('./dialogs/root');
const dialogGetName = require('./dialogs/getName');

//Configuración server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
  openIdMetadata: process.env.BotOpenIdMetadata
});

server.post('/api/messages', connector.listen());
/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var documentDbOptions = {
  host: 'bot-scaffold.documents.azure.com', 
  masterKey: '4U7tD9zMNuScRRhYXphlQbJ7HfVJw4Ekj5FJGH85ZTUnO3L8qbkte5TJubd1NolrZuy2cZ9IoTRQH20tGmeQ1w==', 
  database: 'db',   
  collection: 'users'
};
var docDbClient = new azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

const bot = new builder.UniversalBot(connector);
bot.set('storage', cosmosStorage);
bot.dialog('/', dialogRoot.dialog());
bot.dialog('/getName', dialogGetName.dialog());
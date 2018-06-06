var restify = require('restify');
var builder = require('botbuilder');
var azure = require('botbuilder-azure'); 
require('dotenv').load();
//https://bot-scaffold.azurewebsites.net/api/messages
//Dialogs
const dialogRoot = require('./dialogs/root');
const dialogGetFbData = require('./dialogs/getFbData');
const dialogGetStarted = require('./dialogs/getStarted');

//Configuración server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', connector.listen());
/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var documentDbOptions = {
  host: process.env.DB_HOST, 
  masterKey: process.env.DB_MASTER_KEY, 
  database: 'db',   
  collection: 'users'
};
var docDbClient = new azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

const bot = new builder.UniversalBot(connector);
const dialog = new builder.IntentDialog();

bot.set('storage', cosmosStorage);
bot.dialog('/', dialogRoot.dialog());
bot.dialog('/getStarted', dialogGetStarted.dialog());
bot.dialog('/getFbData', dialogGetFbData.dialog());

//dialog.matches('get_started', dialogGetStarted.dialog());
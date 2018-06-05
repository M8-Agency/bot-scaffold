const builder = require('botbuilder');
const restify = require('restify');
//Dialogs
const dialogRoot = require('./dialogs/root');
const dialogGetName = require('./dialogs/getName');

//Configuración server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, ()=>{
    console.log(`Listening`, server.name, server.url)
})

/*
const connector = new builder.ConsoleConnector().listen();//Console connector
*/

const connector = new builder.ChatConnector({//Chat connector
    appId : '',
    appPassword : ''
});

const bot = new builder.UniversalBot(connector);


bot.dialog('/', dialogRoot.dialog());
bot.dialog('/getName', dialogGetName.dialog());

server.post('/api/messages', connector.listen());
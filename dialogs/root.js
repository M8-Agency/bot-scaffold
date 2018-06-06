const builder = require('botbuilder');

const dialog = () => {
    return [
        (session) => {
            session.send(`Hola`)
            session.beginDialog('/getName')
        },
        (session, results) => {
            session.userData.userName = results.response;
            session.send(`Okey ${results.response}, vamos a jugar`)
            session.beginDialog('/questionsDialog')
        }
    ]
}

module.exports = {
    dialog
}
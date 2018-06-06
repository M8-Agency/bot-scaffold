const builder = require('botbuilder');

const dialog = () => {
    return [
        (session) => {
            session.send(`Hola`)
            session.beginDialog('/getName')
        },
        (session, results) => {
            session.userData.name = results.response
            console.log(session.message);
            session.send(`Hola ${results.response}`)
        }            
    ]
}

module.exports = {
    dialog
}
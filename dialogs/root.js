const builder = require('botbuilder');

const dialog = () => {
    return [
        (session) => {
            session.send(`Hola`)
            session.beginDialog('/getName')
        },
        (session, results) => {
            session.send(`Hola ${results.response}`)
        }            
    ]
}

module.exports = {
    dialog
}
const builder = require('botbuilder');

const dialog = () => {
    return [
        (session) => {
            let msg = session.message.text;
            session.send(`Me dijiste ${msg}`)
        }
    ]
}

module.exports = {
    dialog
}
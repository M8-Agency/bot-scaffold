const builder = require('botbuilder');

const dialog = () => {
    return [
        (session, results, next) => {
            builder.Prompts.text(session, `¿Como te llamas?`)
        },
        (session, results) => {
            session.userData.fbData.first_name = result.response;
            session.endDialogWithResult(results);
        }
    ]
}

module.exports = {
    dialog
}
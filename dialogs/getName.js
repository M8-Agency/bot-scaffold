const builder = require('botbuilder');

const dialog = () => {
    return [
        (session, results, next) => {
            if(!session.userData.name){
                builder.Prompts.text(session, `¿Como te llamas?`)
            }else{
                next();
            }
            
        },
        (session, results) => {
            if(results.response){
                session.userData.name = results.response
            }
            session.endDialogWithResults(results)
        }
    ]
}

module.exports = {
    dialog
}
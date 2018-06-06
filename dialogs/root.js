const builder = require('botbuilder');

const dialog = () => {
    return [
        (session) => {
            if(session.message.type == "message" && session.message.sourceEvent.postback){
                session.beginDialog('/getStarted')    
            }else{
                session.send(`Hola`)
                session.beginDialog('/getName')
            }            
        },
        (session, results) => {
            console.log(session.userData)
            session.send(`Hola ${session.userData.fbData.first_name}`)
        }            
    ]
}

module.exports = {
    dialog
}
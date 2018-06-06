const builder = require('botbuilder');

const dialog = () => {
    return [
        (session, results, next) => {
            if(!session.userData.fbData){
                if(session.message.type == "message" && session.message.sourceEvent.postback){
                    session.beginDialog('/getStarted') //Solicito los datos y guarde datos ref 
                }else{
                    session.beginDialog('/getFbData') //Solicito los datos desde fb
                }
            }else{
                next();
            }
                        
        },
        (session, results) => {
            session.send(`Hola ${session.userData.fbData.first_name}`)
        }            
    ]
}

module.exports = {
    dialog
}
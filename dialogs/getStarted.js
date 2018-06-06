const builder = require('botbuilder');

const dialog = () => {

    return [
        (session, results, next) => {
            
            //Recupero informacion de facebook
            session.userData.fbData = session.message.address.user

            if(session.message.sourceEvent.postback){
                if(message.sourceEvent.postback.referral){
                    session.userData.market = message.sourceEvent.postback.referral.ref;
                }
            }

            session.beginDialog('/')
        }
    ]
}

module.exports = {
    dialog
}
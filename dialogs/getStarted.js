const builder = require('botbuilder');
const axios = require('axios');
require('dotenv').load();

const dialog = () => {
    return [
        (session, results, next) => {
            
            if(session.message.sourceEvent.postback && session.message.sourceEvent.postback.referral){
                session.userData.market = session.message.sourceEvent.postback.referral.ref;
            }
            //Recupero informacion de facebook
            axios.get(`https://graph.facebook.com/v2.6/${session.message.address.user.id}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`).then((response)=>{
                session.userData.fbData = response.data;
                session.endDialogWithResult(results)
            }).catch((error) => {
                new Error(error)
            })
        }
    ]
}

module.exports = {
    dialog
}
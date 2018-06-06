const builder = require('botbuilder');
const getFbData = require('../functions/getFbData');
require('dotenv').load();

const dialog = () => {
    return [
        (session, results, next) => {
            //Recupero informacion de facebook
            getFbData(session.message.address.user.id, process.env.PAGE_ACCESS_TOKEN).then((response)=>{
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
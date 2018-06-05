const builder = require('botbuilder');

const dialog = () => {
    return [
        (session, results, next) => {
            builder.Prompts.choice(session, `¿Cual es tu color preferido?`, 'Rojo|Verde|Azul', {listStyle : builder.ListStyle.button });
        },
        (session, results) => {
            console.log(results.response.entity);
        }
    ]
}

module.exports = {
    dialog
}
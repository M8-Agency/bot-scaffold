const builder = require('botbuilder');
const Question = require('../questions/Question');
const Answer = require('../questions/Answer');
const PromptsBuilder = require('../questions/PromptsBuilder')
const questionsJSON = require('../questions/questions.json');

promptsBuilder = new PromptsBuilder(builder)

const dialog = () => {
    let dialogArray = [
        (session, results, next) => {
            // Initialize game variables
            session.dialogData.score = 0
            next()
        }
    ]
    let questions = promptsBuilder.buildPrompts(questionsJSON)
    dialogArray.push(...questions)
    dialogArray.push(
        (session, results) => {
            session.send(`El juego ha terminado. Tu puntaje: ${session.dialogData.score}`)
            session.endDialogWithResult(results)
        }
    )
    return dialogArray
}

module.exports = {
    dialog
}
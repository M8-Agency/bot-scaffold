const Question = require('./Question');
const Answer = require('./Answer');
const _ = require('lodash');

class PromptsBuilder {
    constructor(botbuilder) {
        this.botbuilder = botbuilder
    }

    buildPrompts(data) {
        let botbuilder = this.botbuilder
        let questionArray = buildQuestions(data);
        let prompts = questionArray.map((question) => {
            return [
                (session, results) => {
                    botbuilder.Prompts.choice(session, question.title, Answer.buildTitlesArray(question.answers), {listStyle: botbuilder.ListStyle.button});
                },
                (session, results, next) => {
                    if (results.response) {
                        let answer = question.answers.find(item => item.title == results.response.entity)
                        if (answer.correct) {
                            session.dialogData.score += 1
                            session.send(answer.botReply || "Correct!")
                        } else {
                            session.send(answer.botReply || "Incorrect!")
                        }
                    }
                    next()
                }
            ]
        })
        return _.flatten(prompts)
    }
}

// Private method
const buildQuestions = (data) => {
    return data.map((item) => {
        let answersArray = Answer.buildAnswersArray(item.answers)
        return new Question(item.title, answersArray)
    })
}

module.exports = PromptsBuilder
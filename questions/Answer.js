class Answer {
    constructor(title, correct, botReply) {
        this.title = title,
        this.correct = correct,
        this.botReply = botReply
    }

    static buildAnswersArray(answersJSON) {
        return answersJSON.map((answer) => {
            return new this(answer.title, answer.correct, answer.botReply)
        })
    }

    static buildTitlesArray(answersArray) {
        return answersArray.map(answer => answer.title)
    }
}

module.exports = Answer
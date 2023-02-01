const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    login_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secret_question: {
        type: Number,
        default: 0
    },
    secret_answer: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User', userSchema)
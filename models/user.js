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
    question_secrete: {
        type: String
    },
    reponse_secrete: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)
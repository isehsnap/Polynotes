const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');


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
        type: Number
    },
    secret_answer: {
        type: String
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)
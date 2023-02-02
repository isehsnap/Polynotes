const mongoose = require('mongoose')

// Définition du schéma pour le modèle user
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

// Export du modèle user en utilisant mongoose.model
module.exports = mongoose.model('User', userSchema)
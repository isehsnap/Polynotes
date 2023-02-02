const mongoose = require('mongoose')

// Définition du schéma pour le modèle schéma
const semestreSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    Promotion: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Promotion'
    }
})

// Export du modèle semestre en utilisant mongoose.model
module.exports = mongoose.model('Semestre', semestreSchema)
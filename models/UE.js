const mongoose = require('mongoose')

// Définition du schéma pour le modèle UE
const ueSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    coefficient: {
        type: Number,
        required: true
    },
    Semestre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Semestre'
    }
})

// Export du modèle UE en utilisant mongoose.model
module.exports = mongoose.model('UE', ueSchema)
const mongoose = require('mongoose')

// Définition du schéma pour le modèle ECUE
const ecueSchema = new mongoose.Schema({
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
    UE: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UE'
    }
})

// Export du modèle ECUE en utilisant mongoose.model
module.exports = mongoose.model('ECUE', ecueSchema)
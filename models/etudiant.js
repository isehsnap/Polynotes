const mongoose = require('mongoose')
const note = require('note.js')


// Définition du schéma pour le modèle étiduant
const etudiantSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    Promotion: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Promotion'
    }
})

// Export du modèle etudiant en utilisant mongoose.model
module.exports = mongoose.model('Etudiant', etudiantSchema)
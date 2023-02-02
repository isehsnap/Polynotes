const mongoose = require('mongoose')

// Définition du schéma pour le modèle note
const noteSchema = new mongoose.Schema({
    note: {
        type: Number,
        required: true
    },
    session: {
        type: Number,
        required: true
    },
    ECUE: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ECUE'
    },
    UE: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UE'
    },
    Semestre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Semestre'
    },
    Etudiant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Etudiant'
    }
})

// Export du modèle note en utilisant mongoose.model
module.exports = mongoose.model('Note', noteSchema)
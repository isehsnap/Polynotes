const mongoose = require('mongoose')
const etudiant = require('etudiant.js')

const promotionSchema = new mongoose.Schema({
    id: {
        type: number,
        required: true
    },
    annee: {
        type: number,
        required: true
    },
    dateDebut: {
        type: date,
        required: true
    },
    dateFin: {
        type: date,
        required: true
    },
    etudiants: {
        type: [etudiant],
        required: true
    },
})

module.exports = mongoose.model('Promotion', promotionSchema)
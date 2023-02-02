const mongoose = require('mongoose')

// Définition du schéma pour le modèle promotion
const promotionSchema = new mongoose.Schema({
    annee: {
        type: Number,
        required: true
    }
})

// Export du modèle promotion en utilisant mongoose.model
module.exports = mongoose.model('Promotion', promotionSchema)
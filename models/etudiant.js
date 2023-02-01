const mongoose = require('mongoose')
const note = require('note.js')

const etudiantSchema = new mongoose.Schema({
    id: {
        type: number,
        required: true
    },
    nom: {
        type: string,
        required: true
    },
    prenom: {
        type: string,
        required: true
    },
    notes: {
        type: [note],
        required: true
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Etudiant', etudiantSchema)
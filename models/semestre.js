const mongoose = require('mongoose')

const semestreSchema = new mongoose.Schema({
    id: {
        type: number,
        required: true
    },
    numero: {
        type: string,
        required: true
    },
    annee: {
        type: number,
        required: true
    },
})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Semestre', semestreSchema)
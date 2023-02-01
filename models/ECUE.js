const mongoose = require('mongoose')

const ecueSchema = new mongoose.Schema({
    id: {
        type: number,
        required: true
    },
    nom: {
        type: string,
        required: true
    },
    coefficient: {
        type: number,
        required: true
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('ECUE', ecueSchema)
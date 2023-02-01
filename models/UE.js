const mongoose = require('mongoose')

const ueSchema = new mongoose.Schema({
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

module.exports = mongoose.model('UE', ueSchema)
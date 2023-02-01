const mongoose = require('mongoose')
const ecue = require('ECUE.js')
const ue = require('UE.js')
const semestre = require('semestre.js')


const noteSchema = new mongoose.Schema({
    note: {
        type: number,
        required: true
    },
    session: {
        type: number,
        required: true
    },
    ecue: {
        type: ecue,
        required: true
    },
    ue: {
        type: ue,
        required: true
    },
    semestre: {
        type: semestre,
        required: true
    },
})


module.exports = mongoose.model('Note', noteSchema)
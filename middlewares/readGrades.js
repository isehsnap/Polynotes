const Busboy = require('busboy')
const XLSX = require('xlsx')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Promotion = require('../models/Promotion')
const Semestre = require('../models/Semestre')
const UE = require('../models/UE')
const ECUE = require('../models/ECUE')
const note = require('../models/note')

async function readGrades(req, res, next) {
    let busboy = Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, fname) => {
        if (fieldname === 'file') {
            const buffers = []
            file.on('data', (data) => {
                buffers.push(data)
            })
            file.on('end', async () => {
                let buffer = Buffer.concat(buffers)
                let workbook = XLSX.read(buffer, {
                    type: 'buffer',
                })
                const firstSheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[firstSheetName]
                // for (let cell in worksheet) {
                //   if(typeof worksheet[cell].v == 'number')
                //   {
                //   }
                // }
            })
        }
    })

    req.pipe(busboy)
    return next()
}

module.exports = readGrades
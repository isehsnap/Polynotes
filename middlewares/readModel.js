const Busboy = require('busboy')
const XLSX = require('xlsx')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Promotion = require('../models/Promotion')
const Semestre = require('../models/Semestre')
const UE = require('../models/UE')
const ECUE = require('../models/ECUE')

/**
 * 
 * @param {String} cell 
 * @param {Integer} i 
 * @returns la cellule i cases a droite
 */
function cellMoveHor(cell, i) {
  const colNumber = XLSX.utils.decode_col(cell);
  const newColNumber = colNumber + i;
  const newColLetter = XLSX.utils.encode_col(newColNumber);
  return newColLetter + cell.substr(1);
}


function getStringBetween(str, start, end) {
  const result = str.match(new RegExp(start + "(.*)" + end));
  if (result != null) {
    return result[1]
  }
}

/**
 * prends en entrée un code APOGEE
 * @param {String} code 
 * @returns 'S' si c'est un semestre
 * @returns 'E' si c'est un ECUE
 * @returns 'X' si c'est a ignorer
 * @returns 'U' si c'est un UE
 * @returns 'O' si c'est une Option
 */
function check_code(code) {
  if (code.includes('ST0') && !code.includes('X')) { return 'S' }
  else if (code.includes('T0')
    || typeof code != 'string'
    || typeof code === 'undefined'
    || code.includes('X')
    || code.includes('APOGEE')
    || code == undefined) { return 'X' }
  else if (code.includes('U')) { return 'U' }
  else if (code.includes('O')) { return 'O' }
  else return 'E'
}

/**
 * Ce code définit une fonction asynchrone nommée readModel qui est utilisée pour lire des données à partir d'un fichier et les stocker dans une base de données MongoDB.
La fonction utilise la bibliothèque Busboy pour gérer les téléchargements de fichiers et la bibliothèque XLSX pour lire les fichiers Excel. La fonction s'attend à recevoir un objet de requête (req) qui contient un fichier.
Lorsqu'un fichier est reçu, les données sont collectées dans un tampon (buffers) et lorsque les données sont toutes reçues, le tampon est concaténé et utilisé pour créer un objet workbook.
L'objet workbook est ensuite utilisé pour itérer sur les cellules de la première feuille du fichier Excel. Chaque cellule est vérifiée pour savoir si elle contient un code d'UE, de semestre ou d'ECUE. En fonction du type de code, un nouvel objet Mongoose (Semestre, UE ou ECUE) est créé et sauvé dans la base de données.
Enfin, le pipe req est transmis à busboy pour terminer la gestion de la requête de téléchargement de fichier. La fonction appelle next pour permettre à la requête de continuer à être gérée par les middlewares suivants.
 * @param req 
 * @param res 
 * @param next
 */
async function readModel(req, res, next) {
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
        let promo = new Promotion({ annee: req.body.promotion })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const Semestres = [ObjectId]
        const UEs = [ObjectId]
        const ECUEs = [ObjectId]
        let type, coeff, code;
        for (let cell in worksheet) {
          if (cell[0] == 'B') {
            type = check_code(worksheet[cell].v)
            code = worksheet[cell].v
            if (type == 'S') {
              let s = new Semestre({
                code: code,
                num: getStringBetween(code, 'JIN', 'ST0'),
                Promotion: promo.id
              })
              await s.save()
              Semestres.push(s.id)
            }
            else if (type == 'U' || type == 'O') {
              nom = worksheet[cellMoveHor(cell, 1)]
                == undefined ? code : worksheet[cellMoveHor(cell, 1)].v
              coeff = worksheet[cellMoveHor(cell, 4)]
                == undefined ? 0 : worksheet[cellMoveHor(cell, 4)].v // si il y a un coeff, ce coeff, sinon 0
              let u = new UE({
                code: code,
                nom: nom,
                coefficient: coeff,
                Semestre: Semestres[Semestres.length - 1]
              })
              await u.save()
              UEs.push(u.id)
            }
            else if (type == 'E') {
              nom = worksheet[cellMoveHor(cell, 2)]
                == undefined ? code : worksheet[cellMoveHor(cell, 2)].v
              coeff = worksheet[cellMoveHor(cell, 4)]
                == null ? 0 : worksheet[cellMoveHor(cell, 4)].v // si il y a un coeff, ce coeff, sinon 0
              let e = new ECUE({
                code: code,
                nom: nom,
                coefficient: coeff,
                UE: UEs[UEs.length - 1]
              })
              await e.save()
              ECUEs.push(e.id)
            }
          }
        }
      })
    }
  })

  req.pipe(busboy)
  return next()
}

module.exports = readModel
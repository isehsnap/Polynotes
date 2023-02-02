// Importe les modules nécessaires
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const readModel = require('../middlewares/readModel')

// Route pour gérer la publication des maquettes
router.get('/', auth, async (req, res) => {
    try {
        res.render('logged_in/uploadModel', {hasError: null, successMessage: 'Fichier enregistré dans la base de données'})
    } catch (e) {

    }
})

router.post('/', auth, readModel, async (req, res) => {
    res.render('logged_in/uploadModel', {hasError: null, successMessage: 'Fichier enregistré dans la base de données'})
})

// Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
module.exports = router
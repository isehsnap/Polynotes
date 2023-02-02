// Importe les modules nécessaires
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const readGrades = require('../middlewares/readGrades')

// Route pour gérer la publication de notes
router.get('/', auth, async (req, res) =>
{
    try {
        res.render('logged_in/uploadGrades', {hasError: null, successMessage: null})
    } catch (e) {
        
    }
})

router.post('/', readGrades, async (req, res) => {
    res.render('logged_in/uploadGrades', {hasError: null, successMessage: 'Fichier enregistré dans la base de données'})
})

// Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
module.exports = router
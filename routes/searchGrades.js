// Importe les modules nécessaires
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

// Route pour gérer la recherche de notes
router.get('/', auth, async (req, res) =>
{
    try {
        res.render('logged_in/searchGrades')
    } catch (e) {
        
    }
})

// Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
module.exports = router
// Importe les modules nécessaires
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')

// Route GET pour la page d'accueil une fois connecté
router.get('/', auth, async (req, res) => {
    try {
        // Récupération de l'utilisateur à partir de son identifiant
        const user = await User.findOne({login_id: req.user.username})
        // Si l'utilisateur n'a pas encore défini de question secrète et de réponse secrète
        if(user.secret_answer=='' || user.secret_question==0) {
            // Rendu de la page firstConnection
            res.render('logged_in/firstConnection', {hasError: null})
        }
        else {
            // Rendu de la page home
            res.render('logged_in/home')
        }
    } catch (error) {
        // Affichage de l'erreur dans la console
        console.log(error)
    }
})
// Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
module.exports = router

//Importe les modules nécessaires
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')

// Définir la route pour la requête GET
router.get('/', auth, async (req, res) => {
    // Récupérer le utilisateur correspondant au login_id dans la requête
    let user = await User.findOne({ login_id: req.user.username })
    try {
        // Si l'utilisateur a déjà une question secrète et une réponse, rediriger vers "/home"
        if (user.secret_question != 0 && user.secret_answer != '') {
            res.redirect('/home')
        }
        // Sinon, afficher la page "firstConnection" avec un message d'erreur nul
        else { res.render('logged_in/firstConnection', { hasError: null }) }
    } catch (e) {
        console.log(e)
    }
})

// Définir la route pour la requête PUT
router.put('/', auth, async (req, res) => {
    try {
        // Récupérer le utilisateur correspondant au login_id dans la requête
        let user = await User.findOne({ login_id: req.user.username })
        // Si le mot de passe et la confirmation de mot de passe sont les mêmes 
        // et que la question secrète est valide (1, 2 ou 3) 
        // et que la réponse à la question secrète a plus de 4 caractères,
        if (req.body.password == req.body.password_confirm
            && req.body.secret_question in [1, 2, 3]
            && req.body.secret_answer.length > 4) {
            // Chiffrer le nouveau mot de passe
            user.password = await bcrypt.hash(req.body.password, 10)
            user.secret_question = req.body.secret_question
            user.secret_answer = req.body.secret_answer
            console.log(user)
            // Enregistrer les nouvelles informations de l'utilisateur
            user.save()
            // Rediriger vers "/home"
            res.redirect('/home')
        }
        // Si le mot de passe et la confirmation de mot de passe ne correspondent pas, 
        // afficher la page "firstConnection" avec un message d'erreur
        else if (req.body.password != req.body.password_confirm) {
            res.render('logged_in/firstConnection',
                { hasError: "Echec : Les deux nouveaux mots de passe ne correspondent pas." })
        }
        // Si la réponse à la question secrète fait moins de 4 caractères, 
        // afficher la page "firstConnection" avec un message d'erreur
        else {
            // Si la réponse à la question secrète est inférieure à 4 caractères
            // On envoie une erreur à l'utilisateur pour le lui indiquer
            res.render('logged_in/firstConnection', { hasError: "Echec : La réponse à la question fait moins de 4 caractères." })
        }

    } catch (e) {
        // Si une erreur survient lors de l'opération, on la log dans la console
        // Et on redirige l'utilisateur vers la page d'accueil
        console.log(e)
        res.redirect('/home')
        }
    })

    // Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
    module.exports = router
// Importe les modules nécessaires
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')

/**
 * Une route GET "/" qui affiche une page pour réinitialiser le mot de passe de l'utilisateur connecté. Elle utilise le middleware "auth" pour vérifier l'authentification de l'utilisateur. Si l'authentification est réussie, elle trouve l'utilisateur en utilisant son nom d'utilisateur (login_id) et affiche une page avec la question secrète de l'utilisateur.
 */
router.get('/', auth, async (req, res) =>
{
    let user = await User.findOne({login_id: req.user.username})
    try {
        res.render('logged_in/resetPassword', {secretQuestion: user.secret_question, hasError: null})
    } catch (e) {
        
    }
})

/**
 * Une route PUT "/" qui traite la soumission du formulaire de réinitialisation du mot de passe. Il utilise également le middleware "auth" pour vérifier l'authentification de l'utilisateur. Si l'authentification est réussie, il trouve l'utilisateur en utilisant l'ID de session. Il vérifie ensuite les données soumises pour s'assurer que l'ancien mot de passe est correct, que les nouveaux mots de passe correspondent, et que la réponse à la question secrète est correcte. Si tout est correct, il met à jour le mot de passe de l'utilisateur en utilisant la bibliothèque bcrypt pour hacher le nouveau mot de passe. Enfin, il redirige l'utilisateur vers la page "home". Si une erreur se produit, il affiche la page de réinitialisation du mot de passe avec un message d'erreur indiquant les erreurs rencontrées.
 */
router.put('/', auth, async (req, res) => {
    try {
        let user = await User.findOne({_id: req.session.passport.user})
        let Error = ''
        const old_password_wrong = "L'ancien mot de passe n'est pas reconnu."
        const password_not_matching = "Les nouveaux mots de passe ne correspondent pas."
        const false_answer = "La réponse à la question secrète est fausse."
        if(await bcrypt.compare(password_old, user.password)){
            Error = old_password_wrong
        }
        if(req.body.password_new != req.body.password_confirm){
            if(Error==''){
                Error = password_not_matching
            } else {
                Error += '<br>' + password_not_matching
            }
        }
        if (req.body.secret_answer != user.secret_answer){
            if(Error==''){
                Error = false_answer
            } else {
                Error += '<br>' + false_answer
            }
        }
        if (Error == '')
        {
            user.password = await bcrypt.hash(req.body.password_new, 10)
            user.secret_answer = req.body.secret_answer
            console.log(user)
            user.save()
            res.redirect('/home')
        } else {
            console.log(Error)
            res.render('logged_in/resetPassword',{secretQuestion: user.secret_question, hasError: Error})
        }
    } catch (e) {
        console.log(e)
    }
    
})
// Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
module.exports = router
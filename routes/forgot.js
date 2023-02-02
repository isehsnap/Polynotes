// Importe les modules nécessaires
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Définit la route pour la page de réinitialisation du mot de passe
router.get('/', async (req, res) => {
    try {
        // Définit une variable d'état pour la première étape de la réinitialisation
        res.login_first_step = true
        // Render la vue pour la première étape de la réinitialisation
        res.render('logged_in/forgot', { hasError: null, secretQuestion: null })
    } catch (error) {
        // Capture les erreurs potentielles
    }
})

// Route pour gérer la mise à jour du mot de passe oublié
router.put('/', async (req, res) => {
    // Vérifie si c'est le premier étape du processus de mise à jour du mot de passe
    if (req.login_first_step == true) {
      // Recherche un utilisateur avec le nom d'utilisateur spécifié
      const user = await User.findOne({ login_id: req.body.username})
      // Si l'utilisateur existe
      if (user) {
        // Définit la première étape comme terminée
        res.login_first_step=false
        // Enregistre le nom d'utilisateur
        res.username = req.body.username
        // Affiche la page pour confirmer la réponse à la question secrète
        res.render('logged_in/forgot_confirm',
          {
            hasError: null,
            secretQuestion: user.secret_question
          })
      } 
      // Si l'utilisateur n'existe pas
      else 
        res.render('logged_in/forgot', { hasError: 'Ce nom d\'utilisateur n\'existe pas.', secretQuestion: null })
    } 
    // Si ce n'est pas la première étape
    else {
      // Recherche l'utilisateur avec le nom d'utilisateur enregistré
      const user = await User.findOne({ login_id: req.username})
      // Si l'utilisateur existe, si les mots de passe sont identiques et si la réponse à la question secrète est correcte
      if(user
        && req.body.password == req.body.password_confirm
        && req.body.secret_answer == user.secret_answer) {
        // Chiffre le nouveau mot de passe
        user.password = await bcrypt.hash(req.body.password, 10)
      } 
      // Si les informations sont incorrectes
      else {
        res.render('logged_in/forgot_confirm',
        {
          hasError: 'La réponse à la question secrète est fausse, ou les mots de passent ne correspondent pas',
          secretQuestion: req.user
        })
      }
    }
  })

// Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
module.exports = router 
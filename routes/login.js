// Importe les modules nécessaires
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Route pour gérer la connexion d'un utilisateur
router.post('/', async (req, res) => {
    try {
        // Recherche de l'utilisateur avec le nom d'utilisateur fourni
        const user = await User.findOne({ login_id: req.body.username })

        // Si l'utilisateur n'existe pas, renvoyer une erreur
        if (user == null) {
            res.render('login', { hasError: 'Cet utilisateur n\'existe pas' })
        } 
        // Si le mot de passe est correct, générer un token d'accès et le stocker dans un cookie
        else if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({username: req.body.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
            res.redirect('/home')
        }
        // Si le mot de passe est incorrect, renvoyer une erreur
        else res.render('login', { hasError: 'Mot de passe incorrect' })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// Route pour afficher la page de connexion
router.get('/', async (req, res) => {
    try {
        res.render('login', { hasError: null })

    } catch (e) {
        console.log(e)
    }
})





// Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
module.exports = router
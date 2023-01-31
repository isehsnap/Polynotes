const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth').checkAuthenticated
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', auth, async (req, res) =>
{
    const user = await User.findOne({_id: req.session.passport.user})
    try {
        if(user.secret_question != 0 && user.secret_answer != ''){
            res.redirect('/home')
        }
        else {res.render('logged_in/firstConnection', {hasError: null})}
    } catch (e) {
        console.log(e)
    }
})

router.put('/', auth, async (req, res) => {
    try {
        let user = await User.findOne({_id: req.session.passport.user})
        if(req.body.password == req.body.password_confirm
            && !(req.body.secret_question in [1,2,3])
            && req.body.secret_answer.length > 4)
        {
            user.password = await bcrypt.hash(req.body.password, 10)
            user.secret_question = req.body.secret_question
            user.secret_answer = req.body.secret_answer
            console.log(user)
            user.save()
            res.redirect('/home')
        } else if(req.body.password != req.body.password_confirm) {
            res.render('logged_in/firstConnection',
            {hasError: "Echec : Les deux nouveaux mots de passe ne correspondent pas OU l'ancien mot de passe est incorrect OU la réponse fait moins de 4 caractères"})
        }
    } catch (e) {
        console.log(e)
        res.redirect('/login')
    }
    
})

module.exports = router
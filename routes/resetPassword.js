const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')


router.get('/', auth, async (req, res) =>
{
    let user = await User.findOne({login_id: req.user.username})
    try {
        res.render('logged_in/resetPassword', {secretQuestion: user.secret_question, hasError: null})
    } catch (e) {
        
    }
})

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
module.exports = router
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth').checkAuthenticated
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', auth, async (req, res) =>
{
    let user = await User.findOne({_id: req.session.passport.user})
    try {
        res.render('logged_in/resetPassword', {secretQuestion: user.secret_question, hasError: null})
    } catch (e) {
        
    }
})

router.put('/', auth, async (req, res) => {
    try {
        let user = await User.findOne({_id: req.session.passport.user})
        let hashed_old_password = await bcrypt.hash(req.body.password_old)
        if(hashed_old_password == user.password
            && req.body.password_new == req.body.password_confirm
            && req.body.secret_answer == user.secret_answer)
        {
            user.password = await bcrypt.hash(req.body.password, 10)
            user.secret_question = req.body.secret_question
            user.secret_answer = req.body.secret_answer
            console.log(user)
            user.save()
            res.redirect('/home')
        } else {
            res.redirect('/home')
        }
    } catch (e) {
        console.log(e)
    }
    
})
module.exports = router
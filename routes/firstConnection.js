const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth').checkAuthenticated
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', auth, async (req, res) =>
{
    const user = await User.findOne({_id: req.session.passport.user})
    try {
        if(user.secret_question != undefined && user.secret_question != undefined){
            res.redirect('/home')
        }
        else {res.render('logged_in/firstConnection')}
    } catch (e) {
        console.log(e)
    }
})

router.put('/', auth, async (req, res) => {
    try {
        let user = await User.findOne({_id: req.session.passport.user})
        if(req.body.password == req.body.password_confirm
            && req.body.secret_question != null
            && req.body.secret_answer != null)
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
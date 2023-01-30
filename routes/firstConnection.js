const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth').checkAuthenticated
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', auth, async (req, res) =>
{
    const user = await User.findOne({_id: req.session.passport.user})
    console.log(user.secret_question)
    try {
        if(user.secret_question != undefined && user.secret_question != undefined){
            res.redirect('/home')
        }
        res.render('logged_in/firstConnection')
    } catch (e) {
        
    }
})

router.put('/', async (req, res) => {
    try {
        let user = await User.findOne({_id: req.session.passport.user})
        if(req.body.password == req.body.password-confirm
            && req.body.secret-question != null
            && req.body.secret-answer != null)
        {
            user.password = await bcrypt.hash(req.body.password)
            user.secret_question = req.body.secret-question
            user.secret_answer = req.body.secret-answer
            console.log(user)
            user.save()
        }
    } catch (e) {
        console.log(e)
    }
    
})

module.exports = router
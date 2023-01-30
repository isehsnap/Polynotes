const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')


router.post('/', passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true
    }), async (req, res) => {
        const user = await User.findOne({_id: req.session.passport.user})
        if(user.secret_question == null || user.secret_answer == null){
            res.redirect('/firstConnection')
        } else {
            res.redirect('/home')
        }
    }
    
)

router.get('/', async (req, res) =>
{
    try {
        res.render('login')

    } catch (e) {
        console.log(e)
    }
})





module.exports = router
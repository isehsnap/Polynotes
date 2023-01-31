const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')


router.post('/', passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true
    }), async (req, res) => {
        try {
            const user = await User.findOne({_id: req.session.passport.user})
            if(user.secret_question == 0 || user.secret_answer == ''){
                res.redirect('/firstConnection')
            } else {
                res.redirect('/home')
            }
        } catch (e) {
            console.log(e)
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
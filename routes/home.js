const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')

router.get('/', auth, async (req, res) =>
{
    try {
        const user = await User.findOne({login_id: req.user.username})
        if(user.secret_answer=='' || user.secret_question==0) {
            res.render('logged_in/firstConnection', {hasError: null})
        }
        else res.render('logged_in/home')
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router
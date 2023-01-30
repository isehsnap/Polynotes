const express = require('express')
const router = express.Router()
const passport = require('passport')


router.post('/', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
    })
)

router.get('/', async (req, res) =>
{
    res.render('login')
})





module.exports = router
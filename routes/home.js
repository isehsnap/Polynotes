const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) =>
{
    try {
        res.render('logged_in/home')
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router
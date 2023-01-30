const express = require('express')
const auth = require('../middlewares/auth').checkAuthenticated
const router = express.Router()

router.get('/', auth, async (req, res) =>
{
    try {
        res.render('logged_in/home')
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router
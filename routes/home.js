const express = require('express')
const auth = require('../middlewares/auth').checkAuthenticated
const router = express.Router()


router.get('/', auth, async (req, res) =>
{
    res.render('logged_in/home')
})

module.exports = router
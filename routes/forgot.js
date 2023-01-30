const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth').checkAuthenticated
const User = require('../models/user')

router.get('/', async (req, res) =>
{
    try {
        res.render('logged_in/forgot', {secretQuestion: null})        
    } catch (error) {
        
    }
})

router.put('/', auth, async (req, res) => {
    const user = new User({

    })
})

module.exports = router
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) =>
{
    try {
        res.render('logged_in/forgot', {secretQuestion: null})        
    } catch (error) {
        
    }
})

router.put('/', async (req, res) => {
    const user = new User({

    })
})

module.exports = router
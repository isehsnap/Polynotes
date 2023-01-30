const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) =>
{
    res.render('logged_in/forgot', {secretQuestion: null})
})

router.put('/', async (req, res) => {
    const user = new User({

    })
})

module.exports = router
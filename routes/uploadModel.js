const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')


router.get('/', auth, async (req, res) =>
{
    try {
        res.render('logged_in/uploadModel')
    } catch (e) {
        
    }
})

router.put('/', async (req, res) => {
})

module.exports = router
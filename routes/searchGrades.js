const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth').checkAuthenticated

router.get('/', auth, async (req, res) =>
{
    try {
        res.render('logged_in/searchGrades')
    } catch (e) {
        
    }
})

router.put('/', auth, async (req, res) => {
})

module.exports = router
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        res.login_first_step = true
        res.render('logged_in/forgot', { hasError: null, secretQuestion: null })
    } catch (error) {

    }
})

router.put('/', async (req, res) => {
    if (req.login_first_step == true) {

        const user = await User.findOne({ login_id: req.body.username})
        if (user) {
            res.login_first_step=false
            res.username = req.body.username
            res.render('logged_in/forgot_confirm',
                {
                    hasError: null,
                    secretQuestion: user.secret_question
                })
        } else res.render('logged_in/forgot', { hasError: 'Ce nom d\'utilisateur n\'existe pas.', secretQuestion: null })
    } else {
        const user = await User.findOne({ login_id: req.username})
        if(user
            && req.body.password == req.body.password_confirm
            && req.body.secret_answer == user.secret_answer) {
            user.password = await bcrypt.hash(req.body.password, 10)
        } else {
            res.render('logged_in/forgot_confirm',
            {
                hasError: 'La réponse à la question secrète est fausse, ou les mots de passent ne correspondent pas',
                secretQuestion: req.user
            })
        }
    }

})

module.exports = router 
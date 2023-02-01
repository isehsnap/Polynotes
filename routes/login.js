const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ login_id: req.body.username })
        if (user == null) {
            res.render('login', { hasError: 'Cet utilisateur n\'existe pas' })
        } else if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({username: req.body.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
            res.redirect('/home')
        }
        else res.render('login', { hasError: 'Mot de passe incorrect' })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}
)

router.get('/', async (req, res) => {
    try {
        res.render('login', { hasError: null })

    } catch (e) {
        console.log(e)
    }
})





module.exports = router
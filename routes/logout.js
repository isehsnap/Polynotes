// Importe les modules nécessaires
const express = require('express')
const router = express.Router()

//Route qui sert a se deconnecter en supprimant le token JWT et redirigeant vers la page de connection
router.get('/', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
  });
// Exportation du routeur pour pouvoir être utilisé ailleurs dans l'application
  module.exports = router
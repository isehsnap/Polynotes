const jwt = require('jsonwebtoken')

// Fonction de middleware pour vérifier le token JWT
const checkToken = (req, res, next) => {
    // Récupération du token depuis les cookies de la requête
    const token = req.cookies.token

    // Vérification de la présence du token
    if (!token) {
        // Redirection vers la page de connexion avec un message d'erreur si le token est absent
        return res.render('login', {hasError: 'Accès refusé. Veuillez vous reconnecter.'});
    }

    try {
        // Décodage du token en utilisant la clé secrète
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Stockage des informations décodées dans la propriété req.user
        req.user = decoded;
        // Passage à la prochaine étape du pipeline de middleware
        next();
    } catch (error) {
        // Log de l'erreur
        console.log(error)
        // Redirection vers la page de connexion avec un message d'erreur si le token est invalide
        return res.render('login', {hasError: 'Accès refusé. Veuillez vous reconnecter.'})
    }
}

// Export du module pour utilisation ailleurs dans l'application
module.exports = checkToken

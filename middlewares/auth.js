const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.render('login', {hasError: 'Accès refusé. Veuillez vous reconnecter.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.render('login', {hasError: 'Accès refusé. Veuillez vous reconnecter.'})
    }
}

module.exports = checkToken
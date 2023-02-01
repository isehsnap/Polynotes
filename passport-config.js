const localStragy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Users = require('./models/user')

function initialize(passport)
{
    const authenticateUser = async (username, password, done) => {
        const user = await Users.findOne({login_id: username})
        if(user==null){
            return done(null, false, {message : 'Votre identifiant est incorrect.'})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else {
                return done(null, false, {message : 'Votre mot de passe est incorrect.'})
            }
        } catch (error) {
            return done(error)
            
        }

    }
    passport.use(new localStragy({ usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        done(null, Users.findOne({_id: id}))
    })
}

module.exports = initialize
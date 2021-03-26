const {Strategy, ExtractJwt} = require('passport-jwt')

const config = require('./config')
const db = require('../db/index')
const User = db.users

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}

module.exports = (passport) => {
    passport.use(new Strategy(opts, async (payload, done) => {
        const user = await User.findByPk(payload.id)
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    }))
}
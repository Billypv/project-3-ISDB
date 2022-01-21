const passport = require('passport')
const passportJwt = require('passport-jwt')
const {User} =  require('../models/user');



const jwtOptions = {
     jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
     secretOrKey: 'theKey'
}

const strategy = new  passportJwt.Strategy(jwtOptions, (jwtPayload, next)=>  {
    User.findOne({username: jwtPayload.username}, (err, user) => {
       if (err) { next(null, false) }
       else {  next(null, user) }
    })
    
})


passport.use(strategy)
passport.use(User.createStrategy())
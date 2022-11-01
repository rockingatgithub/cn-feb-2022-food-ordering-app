const passport = require('passport')
const { ExtractJwt } = require('passport-jwt')
const Customer = require('../models/customer')
const Restaurant = require('../models/restaurant')
const passportJWT = require('passport-jwt').Strategy


passport.use(new passportJWT({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'my_key'
}, async(payload, done) => {

    let customer = await Customer.findById(payload.id)
    if(customer){
        done(null, customer)
    } else {
        // check restaurant of no customer found
        return await checkRestaurant(payload.id, done)
    }

} ))

async function checkRestaurant( id, done){

    let restaurant = await Restaurant.findById(id)
    if(restaurant){
        done(null, restaurant)
    } else {
        done(null, false)
    }

}


module.exports = passport

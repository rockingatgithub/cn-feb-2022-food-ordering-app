const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('../config/passportJWT')
const Restaurant = require('../models/restaurant')
const router = express.Router()



router.post('/signup', async (req, res) => {

    console.log(req.body)

    let restaurant = await Restaurant.create(req.body)

    const user = { email: restaurant.email, id: restaurant._id }

    let token = jwt.sign(user, 'my_key', { expiresIn: '1h' })

    return res.status(200).json({
        data: restaurant,
        token,
        message: "Success"
    })


})

router.post('/signin', async (req, res) => {
    console.log(req.body)
    console.log(req.user)


    let restaurant = await Restaurant.findOne({email: req.body.email})

    if(restaurant){

        const user = { email: restaurant.email, id: restaurant._id }
        let token = jwt.sign(user, 'my_key', { expiresIn: '1h' })

        return res.status(200).json({
            data: restaurant,
            token,
            message: "Success"
        })
    }

    return res.status(401).json({
        data: {},
        message: "Unauthorized"
    })
})

router.get('/listRestaurant', passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
async (req, res) => {
    console.log('user', req.user)

    if(req.user) {
        const restaurants = await Restaurant.find({})
        return res.status(200).json({
            data: restaurants,
            message: "Success"
        })
    }
    return res.status(401).json({
        data: {},
        message: "Unauthorized"
    })
}
)

module.exports = router
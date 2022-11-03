const express = require('express')
const Router = express.Router()
const passport = require('../config/passportJWT')
const Food = require('../models/food')
const Restaurant = require('../models/restaurant')


Router.post('/addFood', passport.authenticate('jwt', { failureRedirect: '/signin', session: false }), async (req, res) => {
    console.log(req.body)

    try{

        const restaurant = await Restaurant.findById(req.body.client)

        const food = await Food.create(req.body)
        restaurant.food.push(food._id)
        await restaurant.save()
        return res.status(200).json({
            data: food,
            message: "Food successfully added!"
        })


    }catch(error){

        console.log('Error', error)

        return res.status(401).json({

            message: "Not added!"
        })

    }




} )

Router.get('/listFood', passport.authenticate('jwt', { failureRedirect: '/signin', session: false }), async (req, res) => {
    const foods = await Food.find({ client: req.query.client })

    return res.status(200).json({
        data: foods,
        message: "Food successfully fetched!"
    })

})

module.exports = Router
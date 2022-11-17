const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('../config/passportJWT')
const Customer = require('../models/customer')
const router = express.Router()



router.post('/signup', async (req, res) => {

    console.log(req.body)

    let customer = await Customer.create(req.body)

    const user = { email: customer.email, id: customer._id }

    let token = jwt.sign(user, 'my_key', { expiresIn: '5d' })

    return res.status(200).json({
        data: customer,
        token,
        userType: "customer",
        message: "Success"
    })


})

router.post('/signin', async (req, res) => {
    console.log(req.body)
    console.log(req.user)


    let customer = await Customer.findOne({email: req.body.email})

    if(customer){

        const user = { email: customer.email, id: customer._id }
        let token = jwt.sign(user, 'my_key', { expiresIn: '5d' })

        return res.status(200).json({
            data: customer,
            token,
            userType: "customer",
            message: "Success"
        })
    }

    return res.status(401).json({
        data: {},
        message: "Unauthorized"
    })
})

router.get('/listCustomer', passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
async (req, res) => {
    console.log('user', req.user)

    if(req.user) {
        const customers = await Customer.find({})
        return res.status(200).json({
            data: customers,
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
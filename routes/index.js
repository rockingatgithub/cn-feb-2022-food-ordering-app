const express = require('express')
const passport = require('../config/passportJWT')
const Customer = require('../models/customer')
const router = express.Router()



router.use('/customer', require('./customer'))
router.use('/restaurant', require('./restaurant'))

router.use('/food', require('./food'))

router.get('/profile', passport.authenticate('jwt', {session: false}), async (req, res) => {

    if(req.user){

        let userType = ''
        const customer = await Customer.findById(req.user._id)
        if(customer){
            userType = 'customer'
        }else{
            userType = 'restaurant'
        }

        return res.status(200).json({
            message: "LoggedIn successfully!",
            user: req.user,
            userType
        })

    }

    return res.status(401).json({
        message: "LoggedIn unsuccessful!",
        user: null
    })

} )



module.exports = router
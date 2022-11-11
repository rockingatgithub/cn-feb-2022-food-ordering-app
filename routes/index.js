const express = require('express')
const passport = require('../config/passportJWT')
const router = express.Router()



router.use('/customer', require('./customer'))
router.use('/restaurant', require('./restaurant'))

router.use('/food', require('./food'))

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {

    if(req.user){

        return res.status(200).json({
            message: "LoggedIn successfully!",
            user: req.user
        })

    }

    return res.status(401).json({
        message: "LoggedIn unsuccessful!",
        user: null
    })

} )



module.exports = router
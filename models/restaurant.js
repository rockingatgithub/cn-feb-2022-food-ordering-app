const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
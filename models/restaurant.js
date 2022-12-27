const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    food: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }
    ]
})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
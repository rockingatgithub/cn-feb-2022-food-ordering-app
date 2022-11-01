const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    },

    client: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant'
    }
    


}, {
    timestamps: true
})


const Food = mongoose.model('Food', foodSchema)
module.exports = Food
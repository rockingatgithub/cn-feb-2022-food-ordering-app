const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/food_app')


const db = mongoose.connection

db.once('open', (err) => {
    console.log('Db connected')
})

module.exports = db
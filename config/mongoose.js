const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sudhendra:CLJYigy0Z2CwvpPV@cluster0.rhtev.mongodb.net/?retryWrites=true&w=majority')


const db = mongoose.connection

db.once('open', (err) => {
    console.log('Db connected')
})

module.exports = db
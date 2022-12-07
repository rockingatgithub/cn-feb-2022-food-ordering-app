const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://sudhendra:pDk85mO2m5rFo79D@cluster0.rhtev.mongodb.net/?retryWrites=true&w=majority')


const db = mongoose.connection

db.once('open', (err) => {
    console.log('Db connected')
})

module.exports = db
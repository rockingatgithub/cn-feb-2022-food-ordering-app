const mongoose = require('mongoose')

mongoose.connect('')


const db = mongoose.connection

db.once('open', (err) => {
    console.log('Db connected')
})

module.exports = db
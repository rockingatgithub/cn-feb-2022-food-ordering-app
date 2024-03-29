const express = require('express')
const cors = require('cors')
const multer  = require('multer')
// const EventEmitter = require('events').EventEmitter
const passport = require('./config/passportJWT')
const db = require('./config/mongoose')
const PORT=8000
const app = express()
// const eventObj = new EventEmitter()
const http = require('http');
const server = http.createServer(app);
const upload = multer({ dest: './public/data/uploads/' })


app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

passport.initialize()

// app.use((req, res, next) => { console.log('the url requested is!', req.url); next()  })

app.use('/', require('./routes'))

app.post('/upload', upload.single('avatar'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file, req.body)
  })


// eventObj.on('my-event', function (msg) {
//     console.log('event triggered!', msg)
// })
// eventObj.emit('my-event', 'Hey there!')

const socketIO = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit('msg-from-backend', 'Hey there, happy connection!')

    socket.on('msg', (msg) => {
        
        socketIO.emit('msg-from-backend', msg)
    })

});



server.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }
    console.log('Server started!')
})
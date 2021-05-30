const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./user-utils')
 
const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        credentials: true
    }
});

const router = require('./routes/index')

app.use(cors());
app.use(router);


io.on('connection', (socket) => {
    console.log('socket established')

    socket.on('join', ({ name, room }, cb ) => {
        console.log(socket.id, name, room)
        // console.log(addUser(socket.id, name, room))
        const { error, user } = addUser(socket.id, name, room)
        
        if(error){
            return cb(error)
        }
        socket.emit('message',  { user: 'admin', text: `${user.name}, welcome to room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`})
        socket.join(user.room)
        cb(error, user)
    })

    socket.on('sendMessage', (message, cb ) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message})
        cb()
    })



    socket.on('disconnect', () => {
        console.log('disconnected socket')
    })
})




server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
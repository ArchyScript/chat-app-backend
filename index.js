const express = require('express');
const cors = require('cors');
require('dotenv/config');
const { createServer } = require('http')
const { Server: SocketIoServer } = require('socket.io')

const app = express()
// app.use(cors({
//     origin: [process.env.ORIGIN], methods: ['GET', "POST", 'PUT', 'PATCH', "DELETE"], credentials: true
// })) 

// API port
const PORT = process.env.PORT || 5000



// listen to port
const server = createServer(app)

const io = new SocketIoServer(server, {
    cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"],
        credentials: true
    },
    // pingTimeout: 60000,
    // pingInterval: 25000,

});


io.on('connection', (socket) => { 
    console.log('socket', socket.id)
})

server.listen(PORT, () => {
    console.log(`server litening on port: ${PORT}`)
})

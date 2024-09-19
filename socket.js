const { Server: SocketIoServer } = require('socket.io')

const setupSocket = (server) => {

    const io = new SocketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],         // Allowed HTTP methods
            credentials: true                 // Include credentials like cookies
        },
        pingTimeout: 60000,                    // Timeout for inactive connections (in ms)
        pingInterval: 25000,                   // Interval for sending pings to clients (in ms)

    });

    const userSocketMap = new Map()

    const connectSocket = (socket) => {
        const userId = socket.handshake.query.userId
        console.log('userId::', userId)
        console.log('socket::', socket)
        console.log('socket::', socket)

        if (userId) {
            userSocketMap.set(userId, socket.id)
        } else {
            console.log('User if not provided during connection')
        }
    }

    const disconnectSocket = (socket) => {
        console.log("Client disconnected")
        console.log('User Entries', userSocketMap.entries())

        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId)
                break;
            }
        }
    }

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId
        console.log('userId::', userId)
        console.log('socket::', socket)
        console.log('socket::', socket)

        if (userId) {
            userSocketMap.set(userId, socket.id)
        } else {
            console.log('User if not provided during connection')
        }



        io.on('disconnect', () => disconnectSocket(socket))
    })



}

module.exports = { setupSocket }
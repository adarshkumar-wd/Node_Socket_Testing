import express from "express";
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on('test', (message) => {
        console.log(`Message form ${socket.id}: ${message}`);
        socket.emit('test', `Hello from server to ${socket.id}`);
    })
})

server.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});
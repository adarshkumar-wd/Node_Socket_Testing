import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on('test', (message) => {
        console.log(`Message form ${socket.id}: ${message}`);
        socket.emit('test', `Hello from server to ${socket.id}`);
    })

    socket.on("driver::online", (driverName) => {
        console.log(`Driver Online: ${driverName}`);
        socket.emit("driver::online", driverName)
    })
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});
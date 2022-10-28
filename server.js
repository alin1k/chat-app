import express from 'express';
import {Server} from 'socket.io';

const app = express();
const server = app.listen(3000);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket)=>{
    io.emit('user connect', {msg: "user#" + socket.id +" connected", users: io.engine.clientsCount});

    socket.on('chat message', (message)=>{
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        io.emit('user disconnect', {msg: "user#" + socket.id +" disconnected", users: io.engine.clientsCount});
    });
})

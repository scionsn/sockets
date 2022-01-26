const express = require('express');
const socket = require('socket.io');
const app = express();
//static content in the public folder
app.use(express.static('public'));

const port = 5000 || process.env.port;
const server = app.listen(port, () => {
    console.log(`listening on ${port}`)
})
//socket.io work
const io = socket(server);

io.on('connection', (sockets) => {
    console.log(`connection made with id: ${sockets.id}`)
    // when the chat event occurs , it emits the data to the connected sockets.
    sockets.on('chat', (data) => {
        console.log(data);
        io.sockets.emit('chat', data);


    })
    // when handling the typing event we only want to broadcast the data to the other client and not to the client that sent the data.
    sockets.on('typing', (data) => {
        console.log(data);
        sockets.broadcast.emit('typing', data);
    })

})
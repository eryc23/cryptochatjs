const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(express.json());
app.use(express.static('views/static'));


io.on("connection", (socket) => {
    socket.on('chat', msg => {
        socket.broadcast.emit('chatServer', msg);
    })
});

app.get('/', (req, res) => {
    res.render('./home');
})

httpServer.listen(3000);
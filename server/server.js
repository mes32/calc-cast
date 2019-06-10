const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configure body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup server-side routers
const calculationRouter = require('./routes/calculation.router');
app.use('/api/calculation', calculationRouter);

// Serve the static site files
app.use(express.static('build'));


//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {
    console.log("New client connected");

    //Here we listen on a new namespace called "incoming data"
    socket.on("incoming data", (data) => {
        //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
        socket.broadcast.emit("outgoing data", { num: data });
    });

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


// Start the server listening on PORT = 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
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

let tempID = 0;
const expressionList = [];

//Setting up a socket with the namespace 'connection' for new sockets
io.on('connect', socket => {
    console.log('New client connected');

    socket.emit('list expressions', { expressionList: expressionList });

    socket.on('submit expression', expr => {
        console.log(expr);

        tempID += 1;
        if (expr.operator === 'ADD') {
            expr = { ...expr, id: tempID, value: Number(expr.arg1) + Number(expr.arg2) };
        } else if (expr.operator === 'SUB') {
            expr = { ...expr, id: tempID, value: Number(expr.arg1) - Number(expr.arg2) };
        } else if (expr.operator === 'MUL') {
            expr = { ...expr, id: tempID, value: Number(expr.arg1) * Number(expr.arg2) };
        } else if (expr.operator === 'DIV') {
            expr = { ...expr, id: tempID, value: Number(expr.arg1) / Number(expr.arg2) };
        }

        expressionList.push(expr);
        socket.emit('list expressions', { expressionList: expressionList });
    });

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// Serve the static site files
app.use(express.static('build'));

// Start the server listening on PORT = 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
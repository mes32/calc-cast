const express = require('express');
const ServerSocket = require('./classes/ServerSocket');

const app = express();

// Serve the static site files from build directory
app.use(express.static('build'));

// Start the server listening on PORT = 5000
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

new ServerSocket(server);
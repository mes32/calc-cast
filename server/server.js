const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configure body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup server-side routers
const calculationRouter = require('./routes/calculation.router');
app.use('/api/calculation', calculationRouter);

// Serve the static site files
app.use(express.static('build'));

// Start the server listening on PORT = 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
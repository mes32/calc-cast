const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Route GET /api/calculation
// Returns a list all saved calculations in reverse chronological order
router.get('/', (req, res) => {
    res.sendStatus(200);
});

// Route POST /api/calculation
// Evaluates and logs a new calculation sent to the server
router.post('/', (req, res) => {
    res.sendStatus(201);
});

module.exports = router;
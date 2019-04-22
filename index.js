// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json()); // *** add this for POST

server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n');
    
});
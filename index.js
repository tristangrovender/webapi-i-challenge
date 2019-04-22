// // implement your API here
// const express = require('express');

// const db = require('./data/db.js');

// const server = express();

// server.use(express.json()); // *** add this for POST


// server.get('api/users', (req, res) => {
//     db
//     .find()
//     .then(users => {
//         res.status(200).json(users)
//     })
//     .catch(err => {
//         // handle error
//         res.status(500).json({ error: "The users information could not be retrieved." });
//     });
// });

// server.listen(5000, () => {
//     console.log('\n*** API running on port 5k ***\n');
    
// });







// implement your API here
const express = require('express')

//importing db
const db = require('./data/db.js')

//Server
const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Is the API Connected?')
})

//Get all users
server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users)
    }).catch(error => {
        res.status(500).json({ message: "The users information could not be retrieved."})
    })
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio)
    return res.status(400).json ({ errorMessage: "Please provide name and bio for the user." })

    db
    .insert(user) 
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    })
})

server.listen(5000, () => {
        console.log('\n*** API running on port 5k ***\n');
})
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

//POST create a user
server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio)
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })

    db
        .insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
            });
        })
})

//GET all users
server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users)
    }).catch(error => {
        res.status(500).json({
            message: "The users information could not be retrieved."
        })
    })
})

//GET Returns user object with specified id
server.get("/api/users/:id", (req, res) => {
    const {
        id
    } = req.params;

    db.findById(id)
        .then(user => {
            if (!user)
                return res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });

            return res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({
                error: "The user information could not be retrieved."
            });
        });
});

//Delete removes the user with the specified id and returns the deleted user
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(user => {
            if (!user)
                return res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });

            return res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" });
        });
});

//PUT Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.


server.put('/api/users/:id', (req, res) => {
    const updateId = req.params.id
    const userToUpdate = req.body

     if ( !userToUpdate.name || !userToUpdate.bio ) {
        res.status(400).json("Must Provide Name and Bio")
    }

     db
        .update(updateId, userToUpdate)
        .then(updated => {
            if ( updated ) {
                res.status(200).json(updated)
            } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })}
        })
        .catch(err => {
            res.status(500).json({ error: err, message: `The user information could not be modified.` })
        })
})


server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n');
})
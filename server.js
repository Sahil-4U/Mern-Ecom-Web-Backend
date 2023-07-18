// Packages Import
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();



// file imports
const connectionDb = require('./config/Mongodb');






// rest objects
const app = express();


// database connection
connectionDb();

// Middlewares
// body parser
app.use(express.json());


// rest api's
app.get('/', (req, res) => {
    res.send(`<center><h3>Welcome to my site</h3></center>`)
});



// Port value
const PORT = process.env.PORT || 8080;

// server listed
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`.white.underline.bold);
})

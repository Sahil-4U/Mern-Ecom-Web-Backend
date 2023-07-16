// Packages Import
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();






// rest objects
const app = express();



// rest api's
app.get('/', (req, res) => {
    res.send({
        message: 'this is our home page'
    })
});



// Port value
const PORT = process.env.PORT || 8080;

// server listed
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`.white.underline.bold);
})

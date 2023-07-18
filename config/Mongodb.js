const mongoose = require('mongoose');
const colors = require('colors');

const connectionDb = () => {
    try {
        const conn = mongoose.connect(process.env.URI);
        console.log('mongodb is connected now'.bgYellow.white);
    } catch (error) {
        console.log('Error in Mongodb'.bgRed.white);
    }
}



module.exports = connectionDb;
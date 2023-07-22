import express from 'express';
import color from 'colors';
import dotenv from 'dotenv';
import databaseHandler from './config/database.js';
import authRoutes from './routes/authRoutes.js';





// env config
dotenv.config();


// mongodb controller
databaseHandler();


// rest Object
const app = express();


// routing
app.use('/auth', authRoutes);

// middlewares
app.use(express.json());

// rest api
app.get('/', (req, res) => {
    return res.send(`<center><h1>WELCOME</h1></center>`)
});


// server creation
app.listen(process.env.PORT || 8080, () => {
    console.log(`http://localhost:${process.env.PORT}/`.white.underline);
})
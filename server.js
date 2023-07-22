import express from 'express';
import color from 'colors';
import dotenv from 'dotenv';
import databaseHandler from './config/database.js';
import router from './routes/authRoutes.js';





// env config
dotenv.config();


// mongodb controller
databaseHandler();

// routing
app.use(router)

// rest Object
const app = express();

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
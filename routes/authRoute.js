const express = require('express');
import { registerController } from '../controllers/authController';



//rest Objects
const routes = express.Router();


// routing
routes.post('/register', registerController, (req, res) => {

})
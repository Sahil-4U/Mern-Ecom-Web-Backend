import express from "express";
import { loginController, registerController } from '../controller/authController.js';




// router Object
const router = express.Router();

// requests
router.post('/register', registerController);
router.post('/login', loginController);

// export
export default router;
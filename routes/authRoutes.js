import express from "express";
import { loginController, registerController } from '../controller/authController.js';




// router Object
const router = express.Router();

// requests
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/user-auth', (req, res) => {
    return res.status(200).send("OK");
})

// export
export default router;
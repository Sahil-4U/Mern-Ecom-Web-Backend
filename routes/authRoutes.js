import express from "express";
import { forgetController, loginController, registerController } from '../controller/authController.js';
import { isAdmin, requireSingIn } from "../middlewares/authMiddleware.js";




// router Object
const router = express.Router();

// requests
// api call for register user
router.post('/register', registerController);

// api call for login user
router.post('/login', loginController);


// api call for forget password
router.post('/forget-password', forgetController);

// api call for user authentication
router.get('/user-auth', requireSingIn, (req, res) => {
    return res.status(200).send({
        ok: true
    });
})


// api call for admin
router.get('/admin-auth', requireSingIn, isAdmin, (req, res) => {
    return res.status(200).send({
        ok: true
    });
})

// export
export default router;
import express from "express";
import { registerControllerFn } from "../controller/authController.js";



// router Object
const router = express.Router();

// requests
router.post('/register', registerControllerFn, () => { });

// export
export default router;
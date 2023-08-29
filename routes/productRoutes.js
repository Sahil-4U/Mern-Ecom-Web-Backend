import express from 'express';
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware.js';
import { createProductController } from '../controller/productController.js';

const router = express.Router();


router.post('/create-product', requireSingIn, isAdmin, createProductController);


export default router;
import express from 'express';
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware.js';
import { createProductController, getproductsController } from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router();


router.post('/create-product', requireSingIn, isAdmin, formidable(), createProductController);

router.get('/get-product', getproductsController);


export default router;
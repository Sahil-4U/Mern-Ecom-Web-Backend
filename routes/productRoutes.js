import express from 'express';
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteproductController, getproductsController, getsingleproductController, photoController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// create product route
router.post('/create-product', requireSingIn, isAdmin, formidable(), createProductController);

// update product route
router.put('/update-product/:pid', requireSingIn, isAdmin, formidable(), updateProductController);

// get all product route
router.get('/get-product', getproductsController);

// get single product route
router.get('/get-product/:slug', getsingleproductController);


// photo of  a product
router.get('/product-photo/:pid', photoController);

// delete product
router.delete('/delete-product/:pid', deleteproductController);


export default router;
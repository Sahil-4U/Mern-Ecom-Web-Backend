import express from 'express';
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware.js';
import { categoryController, updateCategoryController } from '../controller/categoryController.js';

const route = express.Router();


route.post('/create-category', requireSingIn, isAdmin, categoryController);
route.put('/update-category/:id', requireSingIn, isAdmin, updateCategoryController);


export default route;
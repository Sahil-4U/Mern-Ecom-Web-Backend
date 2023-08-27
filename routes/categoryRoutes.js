import express from 'express';
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware.js';
import { allCategoryController, categoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js';

const route = express.Router();


route.post('/create-category', requireSingIn, isAdmin, categoryController);
route.put('/update-category/:id', requireSingIn, isAdmin, updateCategoryController);
route.get('/all-category', allCategoryController);
route.get('/single-category/:slug', singleCategoryController);


export default route;
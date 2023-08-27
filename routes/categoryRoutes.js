import express from 'express';
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware.js';
import { categoryController } from '../controller/categoryController.js';

const route = express.Router();

console.log("category-controller", categoryController);
route.post('/create-category', requireSingIn, isAdmin, categoryController);


export default route;
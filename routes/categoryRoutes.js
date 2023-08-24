import express from 'express';
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware';
import { categoryController } from '../controller/categoryController';

const routes = express.Router();


routes.post('create-category', requireSingIn, isAdmin, categoryController);


export default routes;
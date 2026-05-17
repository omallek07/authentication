import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '~/globals/middlewares/auth.middleware';

const userRoute = express.Router();

// userRoute.use(authMiddleware.verifyUser); // Authentication

userRoute.get('/', asyncWrapper(userController.getAllUsers));

export default userRoute;

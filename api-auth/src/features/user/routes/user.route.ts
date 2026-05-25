import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '~/globals/middlewares/auth.middleware';

const userRoute = express.Router();

userRoute.use(authMiddleware.verifyUser); // Authentication

userRoute.get('/', authMiddleware.verifyPermission, asyncWrapper(userController.getAllUsers));

userRoute.get('/:userId', authMiddleware.verifyPermission, asyncWrapper(userController.getUser));

export default userRoute;

import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { roleController } from '../controllers/role.controllers';
import { authMiddleware } from '~/globals/middlewares/auth.middleware';

const roleRoute = express.Router();

roleRoute.use(authMiddleware.verifyUser); // Authentication

roleRoute.get('/', authMiddleware.verifyPermission, asyncWrapper(roleController.getAll));

roleRoute.get('/by', asyncWrapper(roleController.getPermissions));

roleRoute.get('/:roleId', authMiddleware.verifyPermission, asyncWrapper(roleController.getOne));

roleRoute.post('/seed-data', authMiddleware.verifyPermission, asyncWrapper(roleController.seedData));

roleRoute.post('/add-role/:userId', authMiddleware.verifyPermission, asyncWrapper(roleController.addRoleToUser));

export default roleRoute;

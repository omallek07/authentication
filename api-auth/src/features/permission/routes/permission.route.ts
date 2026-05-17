import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { permissionController } from '../controllers/permission.controller';
import { authMiddleware } from '~/globals/middlewares/auth.middleware';

const permissionRoute = express.Router();

permissionRoute.use(authMiddleware.verifyUser); // Authentication

permissionRoute.get('/', authMiddleware.verifyPermission, asyncWrapper(permissionController.getAll));

permissionRoute.put(
  '/:permissionId',
  authMiddleware.verifyPermission,
  asyncWrapper(permissionController.updatePermission)
);

permissionRoute.post(
  '/add-permissions-to-role/:roleId',
  authMiddleware.verifyPermission,
  asyncWrapper(permissionController.addPermissionsToRole)
);

permissionRoute.post('/seed-data', authMiddleware.verifyPermission, asyncWrapper(permissionController.seedData));

export default permissionRoute;

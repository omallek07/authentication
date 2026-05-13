import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { permissionController } from '../controllers/permission.controller';

const permissionRoute = express.Router();

permissionRoute.get('/', asyncWrapper(permissionController.getAll));
permissionRoute.put('/:permissionId', asyncWrapper(permissionController.updatePermission));
permissionRoute.post('/add-permissions-to-role/:roleId', asyncWrapper(permissionController.addPermissionsToRole));
permissionRoute.post('/seed-data', asyncWrapper(permissionController.seedData));

export default permissionRoute;

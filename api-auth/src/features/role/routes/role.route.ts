import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { roleController } from '../controllers/role.controllers';

const roleRoute = express.Router();

roleRoute.get('/', asyncWrapper(roleController.getAll));
roleRoute.get('/:roleId', asyncWrapper(roleController.getOne));
roleRoute.post('/seed-data', asyncWrapper(roleController.seedData));
roleRoute.post('/add-role/:userId', asyncWrapper(roleController.addRoleToUser));

export default roleRoute;

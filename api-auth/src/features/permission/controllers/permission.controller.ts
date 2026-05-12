import { Request, Response } from 'express';
import HTTP_STATUS from '~/globals/constants/http.constant';
import { permissionService } from '../services/permission.service';

export class PermissionController {
  public async seedData(req: Request, res: Response) {
    await permissionService.seedData();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Permission data seeded successfully'
    });
  }
  public async getAll(req: Request, res: Response) {
    const permissions = await permissionService.getAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'All permissions retrieved successfully',
      data: permissions
    });
  }
}

export const permissionController: PermissionController = new PermissionController();

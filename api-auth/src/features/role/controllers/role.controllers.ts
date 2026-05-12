import { Request, Response } from 'express';
import HTTP_STATUS from '~/globals/constants/http.constant';
import { roleService } from '../services/role.service';

export class RoleController {
  public async seedData(req: Request, res: Response) {
    await roleService.seedData();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Role data seeded successfully'
    });
  }
}

export const roleController: RoleController = new RoleController();

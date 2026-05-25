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

  public async getAll(req: Request, res: Response) {
    const includePermissions = req.query['include-permissions'];

    let returnAllPermissions = false;
    if (typeof includePermissions === 'string' && includePermissions.toLowerCase() === 'true') {
      returnAllPermissions = true;
    }

    const roles = await roleService.getAll(returnAllPermissions);

    return res.status(HTTP_STATUS.OK).json({
      message: 'All roles retrieved successfully',
      data: roles
    });
  }

  public async getOne(req: Request, res: Response) {
    const role = await roleService.getOne(req.params.roleId);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Role retrieved successfully',
      data: role
    });
  }

  public async addRoleToUser(req: Request, res: Response) {
    await roleService.addRoleToUser(req.body, req.params.userId);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Role added to user successfully'
    });
  }
}

export const roleController: RoleController = new RoleController();

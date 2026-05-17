import { Request, Response } from 'express';
import { userService } from '../services/user.service';

import HTTP_STATUS from '~/globals/constants/http.constant';

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'All users retrieved successfully',
      data: users
    });
  }
}

export const userController: UserController = new UserController();

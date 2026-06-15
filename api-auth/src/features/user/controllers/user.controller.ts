import { Request, Response } from 'express';
import { userService } from '../services/user.service';

import HTTP_STATUS from '~/globals/constants/http.constant';

class UserController {
  public async getUser(req: Request, res: Response) {
    const user = await userService.getUser(req.params.userId);

    return res.status(HTTP_STATUS.OK).json({
      message: 'User retrieved successfully',
      data: user
    });
  }

  public async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'All users retrieved successfully',
      data: users
    });
  }

  public async getTwoFactorAuthQR(req: Request, res: Response) {
    const data = await userService.getTwoFactorAuthQR(req.currentUser);
    return res.status(HTTP_STATUS.OK).json({
      message: 'Two-factor authentication QR code retrieved successfully',
      data
    });
  }
}

export const userController: UserController = new UserController();

import { NextFunction, Request, Response } from 'express';
import { ForbiddenException, NotFoundException, UnAuthorizedException } from '../cores/error.core';
import { jwtProvider } from '../providers/jwt.provider';
import JWT from 'jsonwebtoken';
import { RoleModel } from '~/features/role/models/role.model';
import { UserModel } from '~/features/user/models/user.model';
class AuthMiddleware {
  public async verifyUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!req.headers.authorization || !token) {
      return next(new UnAuthorizedException('NO_TOKEN'));
    }

    try {
      const decodedUser = await jwtProvider.verifyJWT(token);
      req.currentUser = {
        _id: decodedUser._id,
        name: decodedUser.name,
        email: decodedUser.email,
        roles: decodedUser.roles
      };
      next();
    } catch (error) {
      // 1) Token expired
      if (error instanceof JWT.TokenExpiredError) {
        return next(new UnAuthorizedException('TOKEN_EXPIRED'));
      }
      // 2) Token invalid (modified token)
      if (error instanceof JWT.JsonWebTokenError) {
        return next(new ForbiddenException('TOKEN_INVALID'));
      }

      return next(new UnAuthorizedException('Please login again!'));
    }
  }

  public async verifyPermission(req: Request, res: Response, next: NextFunction) {
    // Access Token => JWT => stateless
    // 1) Leave that for FE => setnewRole
    // 2) BE => req.currentUser => find the new information in database

    const user = await UserModel.findById(req.currentUser._id).populate('roles');

    if (!user) {
      return next(new NotFoundException('User does not exist'));
    }

    const userRoles = user.roles?.map((r) => r.name) || [];

    const roles = await RoleModel.find({
      name: {
        $in: userRoles
      }
    }).populate('permissions');

    const allPermissions = roles.flatMap((role) => role.permissions);

    const method = req.method;
    const path = `${req.baseUrl}${req.route.path}`.replace('/api/v1/', '');

    const hasPermission = allPermissions.some((perm) => perm.method === method && perm.path === path);

    if (!hasPermission) {
      return next(new ForbiddenException('You do not have permission to access this resource'));
    }

    return next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();

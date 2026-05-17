import { UserModel } from '../models/user.model';

class UserService {
  public async getAll() {
    const users = await UserModel.find()
      .select('-password -__v -resetPasswordToken -resetPasswordExpires -resetPasswordExpired')
      .populate({
        path: 'roles',
        select: '-permissions -__v'
      });

    return users;
  }
}

export const userService: UserService = new UserService();

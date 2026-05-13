import { IPermission, PermissionModel } from '~/features/permission/models/permission.model';
import { IRole, RoleModel } from '../models/role.model';
import { NotFoundException } from '~/globals/cores/error.core';
import { UserModel } from '~/features/user/models/user.model';

type Role = 'ADMIN' | 'MANAGER' | 'TEACHER' | 'STUDENT';

const addSeededPermissions = (role: Role, permissions: IPermission[]) => {
  const permissionMapper = (permissions: IPermission[], allowedPermissions: string[]) =>
    permissions.filter((permission) => allowedPermissions.includes(permission.name));

  const allowedPermissions = {
    ADMIN: ['VIEW_DASHBOARD'],
    MANAGER: ['ADD_CLASS', 'DELETE_CLASS'],
    TEACHER: ['EDIT_CLASS'],
    STUDENT: ['VIEW_CLASS']
  };

  if (allowedPermissions[role]) {
    return permissionMapper(permissions, allowedPermissions[role]);
  }
  return [];
};

class RoleService {
  public async seedData() {
    const roleCollections = await RoleModel.estimatedDocumentCount({});

    // Clear database
    if (Number(roleCollections) > 0) {
      await RoleModel.deleteMany({});
    }

    const allPermissions = await PermissionModel.find();

    const r1 = new RoleModel({
      name: 'admin',
      permissions: addSeededPermissions('ADMIN', allPermissions)
    });
    const r2 = new RoleModel({
      name: 'manager',
      permissions: addSeededPermissions('MANAGER', allPermissions)
    });
    const r3 = new RoleModel({
      name: 'teacher',
      permissions: addSeededPermissions('TEACHER', allPermissions)
    });
    const r4 = new RoleModel({
      name: 'student',
      permissions: addSeededPermissions('STUDENT', allPermissions)
    });

    await RoleModel.bulkSave([r1, r2, r3, r4]);
  }

  public async getAll(): Promise<IRole[]> {
    const roles = await RoleModel.find().select('-permissions -__v');
    return roles;
  }

  public async getOne(roleId: string): Promise<IRole> {
    const role = await RoleModel.findById(roleId).populate('permissions');

    if (!role) {
      throw new NotFoundException('Role does not exist');
    }

    return role;
  }

  public async addRoleToUser(requestBody: any, userId: string) {
    const { roles } = requestBody;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // Clear previous role
    user.roles = [];
    await user.save();

    // Add role to user
    for (const roleName of roles) {
      const role = await RoleModel.findOne({ name: roleName });
      if (!role) {
        throw new NotFoundException(`Role ${roleName} does not exist`);
      }
      user.roles?.push(role);
    }

    await user.save();
  }
}

export const roleService: RoleService = new RoleService();

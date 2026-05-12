import { IPermission, PermissionModel } from '~/features/permission/models/permission.model';
import { RoleModel } from '../models/role.model';

type Role = 'ADMIN' | 'MANAGER' | 'TEACHER' | 'STUDENT';

const addSeededPermissions = (role: Role, permissions: IPermission[]) => {
  const permissionMapper = (permissions: IPermission[], allowedPermissions: string[]) =>
    permissions.filter((permission) => allowedPermissions.includes(permission.name));

  const allowedPermissions = {
    ADMIN: ['VIEW_DASHBOARD', 'VIEW_PROFILE', 'ADD_CLASS', 'DELETE_CLASS', 'EDIT_CLASS'],
    MANAGER: ['VIEW_PROFILE', 'ADD_CLASS', 'DELETE_CLASS', 'EDIT_CLASS'],
    TEACHER: ['VIEW_PROFILE', 'ADD_CLASS', 'EDIT_CLASS'],
    STUDENT: ['VIEW_PROFILE']
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
}

export const roleService: RoleService = new RoleService();

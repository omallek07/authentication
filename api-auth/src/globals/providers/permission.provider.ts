import { PermissionModel } from '~/features/permission/models/permission.model';
import { mapUrlToPermission } from '../utils/map-url-to-permission';
import { RoleModel } from '~/features/role/models/role.model';
import { NotFoundException } from '../cores/error.core';

const ignoredPaths = ['auth/sign-in', 'auth/sign-up', 'auth/refresh-token', 'roles/by'];
export class PermissionProvider {
  public async initPermissions(routes: IRoutePayload[]) {
    await PermissionModel.deleteMany({});

    for (const route of routes) {
      if (ignoredPaths.some((path) => path === route.path)) {
        continue;
      }

      const permissionName = mapUrlToPermission(route);
      // Here you can save the permissionName to your database or in-memory store
      await new PermissionModel({ name: permissionName, method: route.method, path: route.path }).save();
    }
  }
  public async addAllPermsToAdmin() {
    const permissions = await PermissionModel.find();
    const adminRole = await RoleModel.findOne({
      name: 'admin'
    });

    if (!adminRole) {
      throw new NotFoundException('No admin role found');
    }

    // Clean up past permissions
    adminRole.permissions = [];

    adminRole?.permissions.push(...permissions);
    await adminRole?.save();
    console.log('Add all permissions to admin successfully');
  }
}
export const permissionProvider: PermissionProvider = new PermissionProvider();

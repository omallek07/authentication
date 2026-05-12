import { PermissionModel } from '~/features/permission/models/permission.model';
import { mapUrlToPermission } from '../utils/map-url-to-permission';

export class PermissionProvider {
  public async initPermissions(routes: IRoutePayload[]) {
    await PermissionModel.deleteMany({});

    for (const route of routes) {
      const permissionName = mapUrlToPermission(route);
      // Here you can save the permissionName to your database or in-memory store
      await new PermissionModel({ name: permissionName, method: route.method, path: route.path }).save();
    }
  }
}
export const permissionProvider: PermissionProvider = new PermissionProvider();

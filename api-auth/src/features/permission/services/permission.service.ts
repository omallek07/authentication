import { PermissionModel } from '../models/permission.model';

class PermissionService {
  public async seedData() {
    const p1 = new PermissionModel({
      name: 'VIEW_DASHBOARD',
      description: 'Allow user to view dashboard'
    });
    const p2 = new PermissionModel({
      name: 'VIEW_PROFILE',
      description: 'Allow user to view profile'
    });
    const p3 = new PermissionModel({
      name: 'ADD_CLASS',
      description: 'Allow user to add class'
    });
    const p4 = new PermissionModel({
      name: 'DELETE_CLASS',
      description: 'Allow user to delete class'
    });
    const p5 = new PermissionModel({
      name: 'EDIT_CLASS',
      description: 'Allow user to edit class'
    });

    await PermissionModel.bulkSave([p1, p2, p3, p4, p5]);
  }
}

export const permissionService: PermissionService = new PermissionService();

import { NotFoundException } from '~/globals/cores/error.core';
import { PermissionModel, IPermission } from '../models/permission.model';
import { RoleModel } from '~/features/role/models/role.model';

class PermissionService {
  public async seedData() {
    const permissionCollections = await PermissionModel.estimatedDocumentCount({});

    // Clear database
    if (Number(permissionCollections) > 0) {
      await PermissionModel.deleteMany({});
    }

    const p1 = new PermissionModel({
      name: 'VIEW_DASHBOARD',
      description: 'Allow user to view dashboard'
    });
    const p2 = new PermissionModel({
      name: 'VIEW_CLASS',
      description: 'Allow user to view class'
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

  public async getAll(): Promise<IPermission[]> {
    const permissions = await PermissionModel.find();
    return permissions;
  }

  public async updatePermission(
    permissionId: string,
    updateData: {
      name?: string;
      description?: string;
    }
  ): Promise<IPermission> {
    const permission = await PermissionModel.findById(permissionId);

    if (!permission) {
      throw new NotFoundException('Permission does not exist');
    }

    if (updateData.name) {
      permission.name = updateData.name;
    }
    if (updateData.description) {
      permission.description = updateData.description;
    }

    await permission.save();
    return permission;
  }

  public async addPermissionsToRole(permissionIds: string[], roleId: string): Promise<void> {
    const role = await RoleModel.findById(roleId).populate('permissions');
    if (!role) {
      throw new NotFoundException('Role does not exist');
    }

    role.permissions = []; // Clear previous permissions
    await role.save();

    for (const permissionId of permissionIds) {
      const permission = await PermissionModel.findById(permissionId);

      if (!permission) {
        throw new NotFoundException(`Permission with ID ${permissionId} does not exist`);
      }

      role.permissions.push(permission);
    }

    await role.save();
  }
}

export const permissionService: PermissionService = new PermissionService();

import axiosInstance from '.';

export const permissionsApi = {
  getAll() {
    return axiosInstance.get<unknown, IPermissionsResponse>('/permissions');
  },
  addPermissionsToRole(roleId: string, permissions: string[]) {
    return axiosInstance.post<unknown, unknown>(
      `/permissions/add-permissions-to-role/${roleId}`,
      permissions,
    );
  },
  updatePermission(
    permissionId: string,
    data: {
      name: string;
    },
  ) {
    return axiosInstance.put<unknown, unknown>(
      `/permissions/${permissionId}`,
      data,
    );
  },
};

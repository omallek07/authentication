import axiosInstance from '.';

export const rolesApi = {
  getAll(includePermissions: boolean) {
    return axiosInstance.get<unknown, IRolesResponse>(
      `/roles?include-permissions=${includePermissions}`,
    );
  },
  getRole(roleId: string) {
    return axiosInstance.get<unknown, IRoleResponse>(`/roles/${roleId}`);
  },
  getPermissionsByRoleNames(roleNames: string) {
    console.log('roleNames', roleNames);
    return axiosInstance.get<
      unknown,
      {
        data: string[];
      }
    >(`/roles/by?roleNames=${roleNames}`);
  },
};

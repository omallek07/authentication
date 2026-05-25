import axiosInstance from '.';

export const rolesApi = {
  getAll() {
    return axiosInstance.get<unknown, IRolesResponse>('/roles');
  },
  getRole(roleId: string) {
    return axiosInstance.get<unknown, IRoleResponse>(`/roles/${roleId}`);
  },
};

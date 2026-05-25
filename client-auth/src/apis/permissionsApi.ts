import axiosInstance from '.';

export const permissionsApi = {
  getAll() {
    return axiosInstance.get<unknown, IPermissionsResponse>('/permissions');
  },
};

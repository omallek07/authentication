import axiosInstance from '.';

export const userApi = {
  getAll() {
    return axiosInstance.get<unknown, IUsersResponse>('/users');
  },
};

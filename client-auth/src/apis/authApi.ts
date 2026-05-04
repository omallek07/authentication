import axiosInstance from '.';

export const authApi = {
  signIn(payload: IUserPayload) {
    return axiosInstance.post<unknown, ISignInResponse>(
      '/auth/sign-in',
      payload,
    );
  },
  access() {
    return axiosInstance.get('/auth/protected');
  },
};

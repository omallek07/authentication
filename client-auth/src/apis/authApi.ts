import axiosInstance from '.';

interface ISignInResponse {
  data: {
    accessToken: string;
    user: IUser;
  };
}

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

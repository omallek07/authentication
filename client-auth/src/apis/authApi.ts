import axiosInstance from '.';

export const authApi = {
  signIn(payload: IUserSignInPayload) {
    return axiosInstance.post<unknown, ISignInResponse>(
      '/auth/sign-in',
      payload,
    );
  },
  signUp(payload: IUserSignUpPayload) {
    return axiosInstance.post<unknown, ISignInResponse>(
      '/auth/sign-up',
      payload,
    );
  },
  access() {
    return axiosInstance.get('/auth/protected');
  },
  refreshToken(payload: IRefreshTokenPayload) {
    return axiosInstance.post<unknown, IRefreshTokenResponse>(
      '/auth/refresh-token',
      payload,
    );
  },
};

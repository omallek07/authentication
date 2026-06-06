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
  refreshToken() {
    return axiosInstance.post<unknown, IRefreshTokenResponse>(
      '/auth/refresh-token',
    );
  },
  logout() {
    return axiosInstance.post('/auth/logout');
  },
  resetPassword(payload: IResetPasswordPayload) {
    return axiosInstance.post('/auth/reset-password', payload);
  },
  forgotPassword(payload: { email: string }) {
    return axiosInstance.post('/auth/forgot-password', payload);
  },
  changeProfile(payload: { name: string }) {
    return axiosInstance.put<unknown, IUpdateUserProfileResponse>(
      '/auth/update-profile',
      payload,
    );
  },
};

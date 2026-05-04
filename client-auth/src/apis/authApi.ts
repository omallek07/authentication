import axiosInstance from '.';

export const authApi = {
  signIn({ email, password }: { email: string; password: string }) {
    return axiosInstance.post('/auth/sign-in', {
      email,
      password,
    });
  },
  access() {
    return axiosInstance.get('/auth/protected');
  },
};

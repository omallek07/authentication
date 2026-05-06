import axios from 'axios';
import { toast } from 'react-toastify';
import { router } from '../main';
import { useUserStore } from '../stores';
import { authApi } from './authApi';

const API_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;
const baseUrl = `${API_URL}/${API_VERSION}`;

const whiteList = ['/sign-in', '/sign-up'];

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const user = localStorage.getItem('user');

    if (user && !whiteList.includes(location.pathname)) {
      const parsedUser = JSON.parse(user);
      const accessToken = parsedUser?.state?.accessToken ?? '';
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    const message = error?.response?.data?.message;
    const originalRequest = error.config;

    if (message === 'TOKEN_EXPIRED') {
      const refreshToken = useUserStore.getState().refreshToken;
      if (!refreshToken) {
        router.navigate('/sign-in');
        useUserStore.getState().resetUser();
        return Promise.reject(error);
      }

      const resRT = await authApi.refreshToken({
        refreshToken,
      });
      const newAccessToken = resRT.data.accessToken;

      // Update user store with new accessToken
      const user = useUserStore.getState().user;
      const setUser = useUserStore.getState().setUser;

      setUser({
        user,
        refreshToken,
        isAuthenticated: true,
        accessToken: newAccessToken,
      });

      // Retry (send previous failed request again)
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    }

    if (message === 'TOKEN_INVALID' || message === 'NO_TOKEN') {
      router.navigate('/sign-in');
      useUserStore.getState().resetUser();
      return Promise.reject(error);
    }

    toast.error(error?.response?.data?.message);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosInstance;

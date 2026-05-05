import axios from 'axios';
import { toast } from 'react-toastify';
import { router } from '../main';
import { useUserStore } from '../stores';

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

    if (!whiteList.includes(location.pathname)) {
      const auth = await JSON.parse(localStorage.getItem('access') ?? '');

      console.log('auth', auth);

      const accessToken = auth?.state?.access?.accessToken ?? '';

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
  function (error) {
    if (error.status === 401) {
      router.navigate('/sign-in');
      useUserStore.getState().resetUser();
    }
    toast.error(error?.response.data?.message);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosInstance;

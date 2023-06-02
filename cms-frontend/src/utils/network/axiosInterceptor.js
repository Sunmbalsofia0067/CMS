import { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

const onRequest = (config) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const cookies = new Cookies();
  if (typeof cookies.get('authorization') !== 'undefined') {
    config.headers = {
      ...config.headers,
      ...{
        Authorization: `Bearer ${cookies.get('authorization')}`,
        client: cookies.get('client'),
        accesToken: cookies.get('access-token'),
        uid: cookies.get('uid'),
      },
    };
  }

  return config;
};

const onResponse = (config) => {
  console.log(' axiosInstance.interceptors.response');
  // const {
  //   status,
  //   headers: { expiry },
  // } = config;
  // console.log(status, expiry);
  return config;
};

export function setUpInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, (error) => {
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use(onResponse, (error) => {
    // Handle response error
    console.log(error);
    console.log(window);
  });

  return axiosInstance;
}

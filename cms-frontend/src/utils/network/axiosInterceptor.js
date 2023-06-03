import { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

const onRequest = (config) => {
  const cookies = new Cookies();
  if (typeof cookies.get('authorization') !== 'undefined') {
    config.headers = {
      ...config.headers,
      ...{
        Authorization: `Bearer ${cookies.get('authorization')}`,
      },
    };
  }

  return config;
};

// const onResponse = (config) => {
//   console.log(' axiosInstance.interceptors.response');
//   // const {
//   //   status,
//   //   headers: { expiry },
//   // } = config;
//   // console.log(status, expiry);
//   return config;
// };

export function setUpInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, (error) => {
    return Promise.reject(error);
  });
  // axiosInstance.interceptors.response.use(onResponse, (error) => {
  //   // Handle response error
  //   console.log(error);
  //   return Promise.reject(error);
  // });

  return axiosInstance;
}

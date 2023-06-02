import axios, { AxiosRequestHeaders } from 'axios';
import { setUpInterceptor } from './network/axiosInterceptor';

class Network {
  axios = setUpInterceptor(axios);

  async get({ path, headers, options }) {
    const response = await axios.get(path, {
      headers,
      ...options,
    });

    return response;
  }

  async post(path, options, headers) {
    const response = await axios.post(path, {
      headers,
      ...options,
    });

    return response;
  }

  async patch(path, options, headers) {
    const response = await axios.patch(path, {
      headers,
      ...options,
    });

    return response;
  }
}

export default new Network();

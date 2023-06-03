import axios, { AxiosRequestHeaders } from 'axios';
import { setUpInterceptor } from './network/axiosInterceptor';

const baseURL = 'http://localhost:8080/api'

class Network {
  axios = setUpInterceptor(axios);

  async get({ path, headers, options }) {
    const response = await axios.get(`${baseURL}/${path}`, {
      headers,
      ...options,
    });

    return response;
  }

  async post({path, options, headers}) {
    const response = await axios.post(`${baseURL}/${path}`, {
      headers,
      ...options,
    });

    return response;
  }

  async patch({path, options, headers}) {
    const response = await axios.patch(`${baseURL}/${path}`, {
      headers,
      ...options,
    });

    return response;
  }

  async delete({path, options, headers}) {
    const response = await axios.delete(`${baseURL}/${path}`, {
      headers,
      ...options,
    });

    return response;
  }
}

export default new Network();

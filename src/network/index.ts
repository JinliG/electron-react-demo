import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: 'http://localhost:3001/',
});

axiosInstance.interceptors.response.use(
  (response) => {
    const { status } = response;
    if (status !== 200) {
      alert('服务出错');
    }
    // do something
    return response;
  },
  (error) => Promise.reject(error)
);

export function postRequest(
  url: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<any> {
  return axiosInstance.post(encodeURI(url), data, {
    // headers: {
    //   ...options?.headers,
    // },
    ...options,
  });
}

export function getRequest(url: string, data?: any): Promise<any> {
  return axiosInstance.get(encodeURI(url), data);
}

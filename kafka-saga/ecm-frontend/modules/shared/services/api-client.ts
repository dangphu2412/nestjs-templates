import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BrowserStorage } from './browser-storage';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8080';

if (!API_URL) {
  throw new Error('Missing API_ENDPOINT');
}
axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 10000;
axios.interceptors.request.use(config => {
  if (config.headers) {
    config.headers.authorization =
      `Bearer ${BrowserStorage.get('accessToken')}` ?? '';
  }
  return config;
});

axios.interceptors.response.use(async response => {
  // TODO: Do something if rejected
  return response;
});

export type ClientRequestConfig<D> = AxiosRequestConfig<D>;

export const ApiClient = {
  async get<T = any, D = any>(
    url: string,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.get<T, AxiosResponse<T>, D>(url, config);
    return response.data;
  },
  async post<T = any, D = any>(
    url: string,
    body?: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.post<T, AxiosResponse<T>, D>(
      url,
      body,
      config
    );
    return response.data;
  },
  async put<T = any, D = any>(
    url: string,
    body: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.put<T, AxiosResponse<T>, D>(url, body, config);
    return response.data;
  },
  async patch<T = any, D = any>(
    url: string,
    body?: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.patch<T, AxiosResponse<T>, D>(
      url,
      body,
      config
    );
    return response.data;
  },
  async delete<T = any, D = any>(
    url: string,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.delete<T, AxiosResponse<T>, D>(url, config);
    return response.data;
  }
};

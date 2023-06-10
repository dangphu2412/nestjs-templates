import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { TokenManager } from '@/modules/shared/services/token-manager';
import { ClientErrorCode } from '@/modules/error-handling/client-code';
import { ClientError } from '@/modules/error-handling/useErrorHandler';
import { BrowserStorage } from './browser-storage';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8080';

export type ClientRequestConfig<D> = AxiosRequestConfig<D>;

export class ApiClientImpl {
  private readonly apiCaller: AxiosInstance;

  constructor(baseURL: string) {
    this.apiCaller = axios.create({
      baseURL,
      timeout: 50000
    });

    this.apiCaller.interceptors.request.use(this.createRequestInterceptor());
    this.apiCaller.interceptors.response.use(
      res => res,
      this.createErrorResponseInterceptor()
    );
  }

  private createRequestInterceptor = () => {
    return (config: AxiosRequestConfig) => {
      if (config.headers) {
        config.headers.authorization =
          `Bearer ${BrowserStorage.get('accessToken')}` ?? '';
      }

      return config;
    };
  };

  private createErrorResponseInterceptor = () => {
    return async (error: AxiosError) => {
      const isUnauthorized =
        (error.response?.data as ClientError)?.errorCode ===
        ClientErrorCode.UNAUTHORIZED;

      if (isUnauthorized) {
        await TokenManager.renew();
        return axios.request(error.config);
      }

      return Promise.reject(error);
    };
  };

  async get<T = any, D = any>(
    url: string,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await this.apiCaller.get<T, AxiosResponse<T>, D>(
      url,
      config
    );

    return response.data;
  }
  async post<T = any, D = any>(
    url: string,
    body?: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await this.apiCaller.post<T, AxiosResponse<T>, D>(
      url,
      body,
      config
    );

    return response.data;
  }
  async put<T = any, D = any>(
    url: string,
    body: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await this.apiCaller.put<T, AxiosResponse<T>, D>(
      url,
      body,
      config
    );

    return response.data;
  }
  async patch<T = any, D = any>(
    url: string,
    body?: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await this.apiCaller.patch<T, AxiosResponse<T>, D>(
      url,
      body,
      config
    );

    return response.data;
  }
  async delete<T = any, D = any>(
    url: string,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await this.apiCaller.delete<T, AxiosResponse<T>, D>(
      url,
      config
    );

    return response.data;
  }
}

export const ApiClient = new ApiClientImpl(API_URL);

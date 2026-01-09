import { AxiosError } from "axios";
import { axiosClient } from "./axios-client";
import { AuthService } from "./auth.service";
import HTTP_CONFIG from "./http.config";

const RETRY_STATUS = [408, 429, 500, 502, 503, 504];

export const setupRetryInterceptor = () => {
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config: any = error.config;
      const status = error.response?.status;

      if (!config) {
        return Promise.reject(error);
      }

      if (status === 401 || status === 403) {
        AuthService.logout();
        return Promise.reject(error);
      }

      const isNetworkError = !error.response;

      if (!isNetworkError && !RETRY_STATUS.includes(status!)) {
        return Promise.reject(error);
      }

      const maxRetry = HTTP_CONFIG.retry.times;
      const retryDelay = HTTP_CONFIG.retry.delay;

      if (!maxRetry || maxRetry <= 0) {
        return Promise.reject(error);
      }
      console.log("Retry count: ", config.__retryCount);
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount >= maxRetry) {
        return Promise.reject(error);
      }

      config.__retryCount += 1;

      await new Promise((resolve) => setTimeout(resolve, retryDelay));

      return axiosClient(config);
    }
  );
};

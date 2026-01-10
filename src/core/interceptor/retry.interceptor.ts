import { AxiosError } from "axios";
import { axiosClient } from "./axios-client";
import { AuthService } from "./auth.service";
import HTTP_CONFIG from "./http.config";
import { handleError } from "./helpers";
import { toastError } from "../custom-toast";
import ROUTES_PATH from "../routes";
import { TokenService } from "./token.service";
import { ERROR_CODE } from "../constants/error-code.constant";

const RETRY_STATUS = [408, 429, 500, 502, 503, 504];

export const setupRetryInterceptor = () => {
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config: any = error.config;
      const status = error.response?.status;

      if (!config) {
        return handleCustomError(error);
      }

      if (status === 401 && !config.__isRetryAfterRefresh) {
        try {
          const refreshToken = TokenService.getRefreshToken();
          if (refreshToken) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${refreshToken}`;
            config.__isRetryAfterRefresh = true;

            return axiosClient(config);
          } else {
            toastError(ERROR_CODE.ERR_SESSION_EXPIRED);
            AuthService.logout();
            return;
          }
        } catch (err) {
          toastError(ERROR_CODE.ERR_SESSION_EXPIRED);
          AuthService.logout();
          return Promise.reject(err);
        }
      }

      if (status === 403) {
        toastError(ERROR_CODE.ERR_FORBIDDEN_ACCESS);
        window.location.href = ROUTES_PATH.home.index;
        return;
      }

      const isNetworkError = !error.response;

      if (!isNetworkError && !RETRY_STATUS.includes(status!)) {
        return handleCustomError(error);
      }

      const maxRetry = HTTP_CONFIG.retry.times;
      const retryDelay = HTTP_CONFIG.retry.delay;

      if (!maxRetry || maxRetry <= 0) {
        return handleCustomError(error);
      }
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount >= maxRetry) {
        return handleCustomError(error);
      }

      config.__retryCount += 1;

      await new Promise((resolve) => setTimeout(resolve, retryDelay));

      return axiosClient(config);
    }
  );
};

const handleCustomError = (error: AxiosError<unknown, any>): any => {
  return Promise.reject(handleError(error));
};

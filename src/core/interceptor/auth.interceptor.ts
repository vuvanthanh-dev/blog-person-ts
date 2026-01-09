import { axiosClient } from "./axios-client";
import { TokenService } from "./token.service";

export const setupAuthInterceptor = () => {
  axiosClient.interceptors.request.use((config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

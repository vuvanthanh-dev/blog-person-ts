import axios from "axios";
import HTTP_CONFIG from "./http.config";

/**
 * Cấu hình Axios Client
 *
 * withCredentials:
 * - Hiện tại để `false` vì đang dùng token lưu ở localStorage
 * - Khi chuyển sang xác thực bằng httpOnly cookie thì đổi thành `true`
 */
export const axiosClient = axios.create({
  baseURL: HTTP_CONFIG.baseURL,
  timeout: HTTP_CONFIG.axiosTimeout,
  withCredentials: false,
});

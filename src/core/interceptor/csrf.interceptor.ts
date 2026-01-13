import { axiosClient } from "./axios-client";

/**
 * Interceptor bảo vệ CSRF
 *
 * Tự động thêm CSRF token vào các request thay đổi dữ liệu
 * (POST, PUT, PATCH, DELETE)
 *
 * Ưu tiên lấy token từ thẻ meta, nếu không có thì fallback sang cookie
 */
export const setupCsrfInterceptor = () => {
  axiosClient.interceptors.request.use((config) => {
    // Chỉ áp dụng cho các method thay đổi trạng thái
    const methodsRequiringCsrf = ["post", "put", "patch", "delete"];
    const method = config.method?.toLowerCase();

    if (method && methodsRequiringCsrf.includes(method)) {
      // Lấy CSRF token từ meta tag (ưu tiên)
      const metaToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

      if (metaToken) {
        config.headers["X-CSRF-Token"] = metaToken;
        return config;
      }

      // Fallback: lấy CSRF token từ cookie
      const cookieToken = getCsrfTokenFromCookie();
      if (cookieToken) {
        config.headers["X-CSRF-Token"] = cookieToken;
      }
    }

    return config;
  });
};

/**
 * Lấy CSRF token từ cookie
 * Hỗ trợ csrf_token hoặc XSRF-TOKEN
 */
const getCsrfTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "csrf_token" || name === "XSRF-TOKEN") {
      return decodeURIComponent(value);
    }
  }

  return null;
};

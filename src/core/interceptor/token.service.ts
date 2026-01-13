import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/core/constants/token.constant";

/**
 * Service quản lý access token & refresh token
 *
 * Lưu ý bảo mật:
 * Hiện tại token được lưu trong localStorage → có rủi ro XSS.
 *
 * Khuyến nghị cho production:
 * - Chuyển sang dùng httpOnly cookie
 * - Token không truy cập được bằng JavaScript
 * - Trình duyệt tự động gửi cookie theo request
 *
 * Khi backend hỗ trợ httpOnly cookie:
 * - Bật withCredentials: true trong axios
 * - Không cần inject Authorization header
 * - Có thể loại bỏ TokenService này
 */
export const TokenService = {
  getAccessToken: (): string | null =>
    localStorage.getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: (): string | null =>
    localStorage.getItem(REFRESH_TOKEN_KEY),

  set: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/core/constants/token.constant";

/**
 * Token Service - Manages authentication tokens
 *
 * ⚠️ SECURITY WARNING: Current Implementation Uses localStorage
 * ================================================================
 * This implementation stores tokens in localStorage, which is vulnerable to XSS attacks.
 * If an attacker can inject JavaScript into your page, they can steal tokens using:
 * `localStorage.getItem('access_token')`
 *
 * 🔒 RECOMMENDED: Migrate to httpOnly Cookies
 * ================================================================
 * For production applications, implement the following:
 *
 * Backend Changes:
 * 1. Set tokens in httpOnly cookies instead of sending in response body:
 *    ```
 *    Set-Cookie: access_token=...; HttpOnly; Secure; SameSite=Strict; Path=/
 *    Set-Cookie: refresh_token=...; HttpOnly; Secure; SameSite=Strict; Path=/
 *    ```
 *
 * Frontend Changes:
 * 1. Enable credentials in axios config (already set in axios-client.ts):
 *    ```
 *    withCredentials: true
 *    ```
 * 2. Remove Authorization header injection (browser handles it automatically)
 * 3. Remove this token service (tokens managed by browser)
 *
 * Benefits:
 * - Tokens cannot be accessed via JavaScript (XSS protection)
 * - Automatically sent with requests (no manual injection needed)
 * - Secure flag ensures HTTPS-only transmission
 * - SameSite prevents CSRF attacks
 *
 * Note: Until backend implements httpOnly cookies, this localStorage
 * approach is used for compatibility.
 */
export const TokenService = {
  getAccessToken: (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),

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

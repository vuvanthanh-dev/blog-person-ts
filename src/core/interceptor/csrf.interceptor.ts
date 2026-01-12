import { axiosClient } from "./axios-client";

/**
 * CSRF Protection Interceptor
 * Automatically adds CSRF token to POST, PUT, PATCH, DELETE requests
 *
 * Setup:
 * 1. Backend must set CSRF token in cookie or meta tag when rendering HTML
 * 2. For cookie approach: Backend sets cookie named 'csrf_token'
 * 3. For meta tag approach: Backend renders <meta name="csrf-token" content="...">
 *
 * Note: This interceptor checks meta tag first, then falls back to cookie
 */
export const setupCsrfInterceptor = () => {
  axiosClient.interceptors.request.use((config) => {
    // Only add CSRF token for state-changing requests
    const methodsRequiringCsrf = ["post", "put", "patch", "delete"];
    const method = config.method?.toLowerCase();

    if (method && methodsRequiringCsrf.includes(method)) {
      // Method 1: Get CSRF token from meta tag (preferred)
      const metaToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

      if (metaToken) {
        config.headers["X-CSRF-Token"] = metaToken;
        return config;
      }

      // Method 2: Get CSRF token from cookie (fallback)
      const cookieToken = getCsrfTokenFromCookie();
      if (cookieToken) {
        config.headers["X-CSRF-Token"] = cookieToken;
      }
    }

    return config;
  });
};

/**
 * Extract CSRF token from cookies
 * Looks for cookie named 'csrf_token' or 'XSRF-TOKEN'
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

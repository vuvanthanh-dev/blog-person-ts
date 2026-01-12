import axios from "axios";
import HTTP_CONFIG from "./http.config";

/**
 * Axios Client Configuration
 *
 * withCredentials: Set to false currently for localStorage token approach
 * ⚠️ TODO: Change to true when migrating to httpOnly cookie authentication
 *
 * When backend implements httpOnly cookies:
 * 1. Set withCredentials: true (to send cookies automatically)
 * 2. Backend must set CORS header: Access-Control-Allow-Credentials: true
 * 3. Backend must set specific origin in: Access-Control-Allow-Origin (cannot use *)
 */
export const axiosClient = axios.create({
  baseURL: HTTP_CONFIG.baseURL,
  timeout: HTTP_CONFIG.axiosTimeout,
  withCredentials: false, // TODO: Change to true for httpOnly cookie auth
});

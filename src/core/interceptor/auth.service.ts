import ROUTES_PATH from "../routes";
import { TokenService } from "./token.service";

/**
 * Auth Service
 *
 * Note: When calling logout from components, also dispatch the logout action:
 * ```
 * import { logout } from '@/modules/auth/slice.auth';
 * dispatch(logout());
 * AuthService.logout();
 * ```
 */
export const AuthService = {
  logout: () => {
    TokenService.clear();
    // Clear Redux state is handled by redux-persist purge or manual dispatch
    // Redirect to login page (will clear persisted state on next app load)
    window.location.href = ROUTES_PATH.auth.login;
  },
};

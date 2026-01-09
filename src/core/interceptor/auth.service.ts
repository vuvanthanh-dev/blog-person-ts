import ROUTES_PATH from "../routes";
import { TokenService } from "./token.service";

export const AuthService = {
  logout: () => {
    TokenService.clear();
    window.location.href = ROUTES_PATH.auth.login;
  },
};

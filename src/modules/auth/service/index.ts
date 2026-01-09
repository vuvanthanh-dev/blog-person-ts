import type { Login, LoginResponse } from "../types";
import http from "@/core/interceptor";
import ENDPOINT from "./endpoint";

const AuthService = {
  login: (data: Login) =>
    http.call<LoginResponse>({
      url: ENDPOINT.LOGIN,
      method: "POST",
      data,
    }),
};

export default AuthService;

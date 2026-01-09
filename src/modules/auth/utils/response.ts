import type { Login } from "../types";

export const LoginResponse = (data: Login): Login => {
  return {
    username: data.username,
    password: data.password,
  };
};

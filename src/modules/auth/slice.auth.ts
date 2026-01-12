import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Login } from "./types";
import AuthService from "./service";
import { TokenService } from "@/core/interceptor/token.service";
import { toastSuccess, toastError } from "@/core/custom-toast";
import { SUCCESS_CODE } from "@/core/constants/success-code.constants";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: Login) => {
    try {
      const { data } = await AuthService.login(payload);
      TokenService.set(data.data.accessToken, data.data.refreshToken);
      toastSuccess(SUCCESS_CODE.AUTH_LOGIN);
      return {
        isAuthenticated: true,
        roles: data.data.roles || [], // Extract roles from response, default to empty array
        user: {
          id: data.data.id,
          username: data.data.username,
          email: data.data.email,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        },
      };
    } catch (error: any) {
      toastError(error?.message);
      return {
        isAuthenticated: false,
        roles: [],
        user: null,
      };
    }
  }
);

const initialState = {
  isAuthenticated: false,
  roles: [] as string[], // Store user roles
  user: null as any, // Store user info
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.roles = [];
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.roles = action.payload.roles;
      state.user = action.payload.user;
    });
  },
});

export const { logout } = auth.actions;

export default auth.reducer;

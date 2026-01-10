import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Login } from "./types";
import AuthService from "./service";
import { TokenService } from "@/core/interceptor/token.service";
import { toastSuccess, toastError } from "@/core/custom-toast";
import { SUCCESS_CODE } from "@/core/constants/success-code";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: Login) => {
    try {
      const { data } = await AuthService.login(payload);
      TokenService.set(data.accessToken, data.refreshToken);
      toastSuccess(SUCCESS_CODE.AUTH_LOGIN);
      return true;
    } catch (error: any) {
      toastError(error?.message);
      return false;
    }
  }
);

const initialState = {
  isAuthenticated: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
    });
  },
});

export default auth.reducer;

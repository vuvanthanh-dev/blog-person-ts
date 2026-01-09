import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Login } from "./types";
import AuthService from "./service";
import { TokenService } from "@/core/interceptor/token.service";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: Login) => {
    try {
      const { data } = await AuthService.login(payload);
      TokenService.set(data.accessToken, data.refreshToken);
      return true;
    } catch (error) {
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

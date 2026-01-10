import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "./service";
import type { PostPayload } from "./types";
import { toastError } from "@/core/custom-toast";
import type { PostListResponse } from "./types";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (payload: PostPayload) => {
    try {
      const { data } = await CategoryService.getPosts(payload);
      return data.data;
    } catch (error: any) {
      toastError(error?.message);
      return {} as PostListResponse;
    }
  }
);

const initialState = {
  postsTable: {} as PostListResponse,
};

const post = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.postsTable = action.payload;
    });
  },
});

export default post.reducer;

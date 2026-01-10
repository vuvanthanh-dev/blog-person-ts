import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "./service";
import { toastError } from "@/core/custom-toast";
import type {
  DetailPostResponse,
  PostListResponse,
} from "./types/response.type";
import type { SearchPostForm } from "./types/form.type";
import type {
  CreatePostPayload,
  UpdatePostPayload,
} from "./types/payload.type";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (payload: SearchPostForm) => {
    try {
      const { data } = await CategoryService.getPosts(payload);
      return data.data;
    } catch (error: any) {
      toastError(error?.message);
      return {} as PostListResponse;
    }
  }
);

export const getPostBySlug = createAsyncThunk(
  "post/getPostBySlug",
  async (slug: string) => {
    try {
      const { data } = await CategoryService.getPostBySlug(slug);
      return data.data;
    } catch (error: any) {
      toastError(error?.message);
      return {} as DetailPostResponse;
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (payload: CreatePostPayload) => {
    try {
      await CategoryService.createPost(payload);
      return true;
    } catch (error: any) {
      toastError(error?.message);
      return false;
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (payload: UpdatePostPayload) => {
    try {
      await CategoryService.updatePost(payload);
      return true;
    } catch (error: any) {
      toastError(error?.message);
      return false;
    }
  }
);

const initialState = {
  posts: {} as PostListResponse,
  postDetail: {} as DetailPostResponse,
  isCreate: false,
  isUpdate: false,
};

const post = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getPostBySlug.fulfilled, (state, action) => {
      state.postDetail = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isCreate = action.payload;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isUpdate = action.payload;
    });
  },
});

export default post.reducer;

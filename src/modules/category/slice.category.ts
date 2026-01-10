import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "./service";
import type { CategoryPayload } from "./types";
import type { CategoryListResponse, CategoryResponse } from "./types";
import { toastError } from "@/core/custom-toast";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (payload: CategoryPayload) => {
    try {
      const { data } = await CategoryService.getCategories(payload);
      return data.data;
    } catch (error: any) {
      toastError(error?.message);
      return {} as CategoryListResponse;
    }
  }
);

export const getCategoryBySlug = createAsyncThunk(
  "category/getCategoryBySlug",
  async (payload: string) => {
    try {
      const { data } = await CategoryService.getCategoryBySlug(payload);
      return data.data;
    } catch (error: any) {
      toastError(error?.message);
      return {} as CategoryResponse;
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (payload: string) => {
    try {
      await CategoryService.createCategory(payload);
      return true;
    } catch (error: any) {
      toastError(error?.message);
      return false;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (payload: string) => {
    try {
      await CategoryService.updateCategory(payload);
      return true;
    } catch (error: any) {
      toastError(error?.message);
      return false;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (payload: string) => {
    try {
      await CategoryService.deleteCategory(payload);
      return true;
    } catch (error: any) {
      toastError(error?.message);
      return false;
    }
  }
);

const initialState = {
  categories: {} as CategoryListResponse,
  detail: {} as CategoryResponse,
  isCreate: false,
  isUpdate: false,
  isDelete: false,
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategoryBySlug.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isCreate = action.payload;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isUpdate = action.payload;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isDelete = action.payload;
    });
  },
});

export default category.reducer;

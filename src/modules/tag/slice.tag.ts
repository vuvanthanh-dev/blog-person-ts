import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastError } from "@/core/custom-toast";
import type { TagListResponse } from "./types/response.type";
import type { SearchTagForm } from "./types/form.type";
import TagService from "./service";

export const getTags = createAsyncThunk(
  "tag/getTags",
  async (payload: SearchTagForm) => {
    try {
      const { data } = await TagService.getTags(payload);
      return data.data;
    } catch (error: any) {
      toastError(error?.message);
      return {} as TagListResponse;
    }
  }
);

const initialState = {
  tags: {} as TagListResponse,
};

const tag = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  },
});

export default tag.reducer;

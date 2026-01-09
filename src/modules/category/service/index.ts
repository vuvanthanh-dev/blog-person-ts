import http from "@/core/interceptor";
import ENDPOINT from "./endpoint";
import type { CategoryListResponse, CategoryPayload } from "../types";

export const CategoryService = {
  getCategories: (params: CategoryPayload) =>
    http.call<CategoryListResponse>({
      url: ENDPOINT.GET_CATEGORIES,
      method: "GET",
      params,
    }),

  getCategoryBySlug: (slug: string) =>
    http.call<CategoryListResponse>({
      url: `${ENDPOINT.GET_CATEGORIES}/${slug}`,
      method: "GET",
    }),

  createCategory: (data: CategoryPayload) =>
    http.call<CategoryListResponse>({
      url: ENDPOINT.CREATE_CATEGORY,
      method: "POST",
      data,
    }),

  updateCategory: (slug: string, data: CategoryPayload) =>
    http.call<CategoryListResponse>({
      url: `${ENDPOINT.UPDATE_CATEGORY}/${slug}`,
      method: "PUT",
      data,
    }),

  deleteCategory: (slug: string) =>
    http.call<CategoryListResponse>({
      url: `${ENDPOINT.DELETE_CATEGORY}/${slug}`,
      method: "DELETE",
    }),
};

export default CategoryService;

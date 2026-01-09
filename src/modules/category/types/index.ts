import type { PaginationResponse } from "@/core/types/pagination.type";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type CategoryPayload = {
  name?: string;
  slug?: string;
  pageIndex?: number;
  pageSize?: number;
};

export type CategoryResponse = Category;

export type CategoryListResponse = PaginationResponse<Category>;

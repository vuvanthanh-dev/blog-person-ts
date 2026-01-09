import type { PaginationResponse } from "../../../core/types/pagination.type";
import type { Category } from "../types";

export const categoryDetailResponse = (data: Category): Category => {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
  };
};

export const categoryListResponse = (
  data: PaginationResponse<Category>
): PaginationResponse<Category> => {
  return {
    items: data.items,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    currentPage: data.currentPage,
    pageSize: data.pageSize,
  };
};

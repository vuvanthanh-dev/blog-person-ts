import type { PaginationResponse } from "@/core/types/pagination.type";

export interface TablePostResponse {
  title: string;
  slug: string;
  author: string;
  categories: string[];
  tags: string[];
}

export type PostListResponse = PaginationResponse<TablePostResponse>;

export interface DetailPostResponse {
  title: string;
  slug: string;
  content: string;
  author: string;
  categories: string[];
  tags: string[];
}

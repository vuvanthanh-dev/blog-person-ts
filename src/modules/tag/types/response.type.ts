import type { PaginationResponse } from "@/core/types/pagination.type";

export interface TableTagResponse {
  name: string;
  slug: string;
}

export type TagListResponse = PaginationResponse<TableTagResponse>;

export interface DetailTagResponse {
  name: string;
  slug: string;
}

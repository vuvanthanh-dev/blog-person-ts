import type { PaginationResponse } from "@/core/types/pagination.type";

export interface Post {
  title: string;
  content: string;
  slug: string;
  author: string;
  categories: string[];
  tags: string[];
}

export interface PostPayload {
  title: string;
  slug: string;
  pageIndex: number;
  pageSize: number;
}

export type PostResponse = Post;

export type PostListResponse = PaginationResponse<Post>;

import http from "@/core/interceptor";
import ENDPOINT from "./endpoint";
import type { SearchPostForm } from "../types/form.type";
import type {
  DetailPostResponse,
  PostListResponse,
} from "../types/response.type";
import type { CreatePostPayload } from "../types/payload.type";
import type { UpdatePostPayload } from "../types/payload.type";

const PostService = {
  getPosts: (params: SearchPostForm) =>
    http.call<PostListResponse>({
      url: ENDPOINT.GET_POSTS,
      method: "GET",
      params,
    }),

  getPostBySlug: (slug: string) =>
    http.call<DetailPostResponse>({
      url: `${ENDPOINT.GET_POST_BY_SLUG}/${slug}`,
      method: "GET",
    }),

  createPost: (payload: CreatePostPayload) =>
    http.call<Boolean>({
      url: ENDPOINT.CREATE_POST,
      method: "POST",
      data: payload,
    }),

  updatePost: (payload: UpdatePostPayload) =>
    http.call<Boolean>({
      url: ENDPOINT.UPDATE_POST,
      method: "POST",
      data: payload,
    }),
};

export default PostService;

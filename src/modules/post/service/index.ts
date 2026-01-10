import http from "@/core/interceptor";
import ENDPOINT from "./endpoint";
import type { PostPayload } from "../types";
import type { PostListResponse } from "../types";

export const PostService = {
  getPosts: (params: PostPayload) =>
    http.call<PostListResponse>({
      url: ENDPOINT.GET_POSTS,
      method: "GET",
      params,
    }),
};

export default PostService;

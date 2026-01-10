import http from "@/core/interceptor";
import ENDPOINT from "./endpoint";
import type { SearchTagForm } from "../types/form.type";
import type { TagListResponse } from "../types/response.type";

const TagService = {
  getTags: (params: SearchTagForm) =>
    http.call<TagListResponse>({
      url: ENDPOINT.GET_TAGS,
      method: "GET",
      params,
    }),
  getTagById: () => {},
  createTag: () => {},
  updateTag: () => {},
  deleteTag: () => {},
};

export default TagService;

import type {
  CreatePostForm,
  UpdatePostForm,
} from "@/modules/post/types/form.type";
import type {
  CreatePostPayload,
  UpdatePostPayload,
} from "@/modules/post/types/payload.type";

export const createPostPayload = (
  payload: CreatePostForm
): CreatePostPayload => {
  return {
    title: payload.title,
    content: payload.content,
    author: payload.author,
    categories: payload.categories.map((item) => item.slug),
    tags: payload.tags.map((item) => item.slug),
  };
};

export const updatePostPayload = (
  payload: UpdatePostForm
): UpdatePostPayload => {
  return {
    title: payload.title,
    content: payload.content,
    author: payload.author,
    categories: payload.categories.map((item) => item.slug),
    tags: payload.tags.map((item) => item.slug),
  };
};

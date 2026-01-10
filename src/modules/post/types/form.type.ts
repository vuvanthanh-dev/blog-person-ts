import type { TagOption } from "@/modules/tag/types/form.type";
import type { Category } from "@/modules/category/types";

export interface SearchPostForm {
  title: string;
  slug: string;
}

export interface CreatePostForm {
  title: string;
  content: string;
  author: string;
  categories: Category[];
  tags: TagOption[];
}

export interface UpdatePostForm {
  title: string;
  content: string;
  slug: string;
  author: string;
  categories: Category[];
  tags: TagOption[];
}

export interface DetailPostForm {
  title: string;
  content: string;
  slug: string;
  author: string;
  categories: Category[];
  tags: TagOption[];
}

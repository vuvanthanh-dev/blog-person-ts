import type { Tag } from "@/modules/tag/types";
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
  tags: Tag[];
}

export interface UpdatePostForm {
  title: string;
  content: string;
  slug: string;
  author: string;
  categories: Category[];
  tags: Tag[];
}

export interface DetailPostForm {
  title: string;
  content: string;
  slug: string;
  author: string;
  categories: Category[];
  tags: Tag[];
}

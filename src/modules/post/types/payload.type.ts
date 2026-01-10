export interface CreatePostPayload {
  title: string;
  content: string;
  author: string;
  categories: string[];
  tags: string[];
}

export interface UpdatePostPayload {
  title: string;
  content: string;
  author: string;
  categories: string[];
  tags: string[];
}

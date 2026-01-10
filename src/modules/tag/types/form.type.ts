export interface TagOption {
  name: string;
  slug: string;
}

export interface SearchTagForm {
  name?: string;
  slug?: string;
  pageIndex?: number;
  pageSize?: number;
}

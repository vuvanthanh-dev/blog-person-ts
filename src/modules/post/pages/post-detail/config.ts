import type { IBaseFormConfig } from "@/core/types/config-form.type";
import { TEXT, BUTTON, EDITOR, SELECT } from "@/core/constants/form-constants";
import type { DetailPostForm } from "@/modules/post/types/form.type";

export const formConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "title",
      label: "Tên bài viết",
      required: false,
      disabled: true,
      size: 12,
      validation: {},
    },
    {
      type: TEXT,
      name: "slug",
      label: "Slug",
      required: false,
      disabled: true,
      size: 12,
      validation: {},
    },
    {
      type: EDITOR,
      name: "content",
      label: "Nội dung",
      required: false,
      disabled: true,
      size: 12,
      validation: {},
    },
    {
      type: SELECT,
      name: "categories",
      label: "Danh mục",
      option: "categoryOptions",
      required: false,
      size: 12,
      validation: {},
      isMulti: true,
      disabled: true,
      placeholder: "",
    },
    {
      type: SELECT,
      name: "tags",
      label: "Tag",
      option: "tagOptions",
      required: false,
      size: 12,
      validation: {},
      isMulti: true,
      disabled: true,
      placeholder: "",
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "Đóng",
          type: "submit",
          action: "submit",
        },
      ],
    },
  ],
};

export const initialValues: DetailPostForm = {
  title: "",
  content: "",
  categories: [],
  tags: [],
  slug: "",
  author: "",
};

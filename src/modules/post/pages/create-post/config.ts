import type { IBaseFormConfig } from "@/core/types/config-form.type";
import { TEXT, BUTTON, EDITOR, SELECT } from "@/core/constants/form.constant";
import type { CreatePostForm } from "@/modules/post/types/form.type";
import { styleBtnBorder } from "@/core/constants/style.constant";

export const formConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "title",
      label: "Tên bài viết",
      required: false,
      size: 12,
      validation: {},
    },
    {
      type: EDITOR,
      name: "content",
      label: "Nội dung",
      required: false,
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
      placeholder: "Chọn danh mục",
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
      placeholder: "Chọn tag",
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "Quay lại",
          type: "button",
          action: "back",
          style: styleBtnBorder,
        },
        {
          title: "Tạo mới",
          type: "submit",
          action: "submit",
        },
      ],
    },
  ],
};

export const initialValues: CreatePostForm = {
  title: "",
  content: "",
  categories: [],
  tags: [],
  author: "",
};

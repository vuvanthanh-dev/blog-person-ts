import type { IBaseFormConfig } from "@/core/types/config-form.type";
import { TEXT, BUTTON, EDITOR, SELECT } from "@/core/constants/form.constant";
import type { UpdatePostForm } from "@/modules/post/types/form.type";
import { styleBtnBorder } from "@/core/constants/style.constant";

export const formConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "title",
      label: "Tên bài viết",
      required: true,
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
      required: true,
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
          title: "Cập nhật",
          type: "submit",
          action: "submit",
        },
      ],
    },
  ],
};

export const initialValues: UpdatePostForm = {
  title: "",
  content: "",
  categories: [],
  tags: [],
  slug: "",
  author: "",
};

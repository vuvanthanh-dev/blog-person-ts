import type { IBaseFormConfig } from "@/core/types/config-form.type";
import { TEXT, BUTTON, EDITOR } from "@/core/constants/form-constants";

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
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "Tạo mới",
          type: "submit",
          action: "submit",
        },
      ],
    },
  ],
};

export const initialValues = {
  title: "",
  content: "",
};

import type { IBaseFormConfig } from "@/core/types/config-form.type";
import { TEXT, BUTTON } from "@/core/constants/form.constant";
import { PAGE_CURRENT, PAGE_SIZE } from "@/core/constants/table.constant";
import { styleBtnBorder } from "@/core/constants/style.constant";

export const formConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "title",
      label: "Tên bài viết",
      required: false,
      size: 3,
      validation: {},
    },
    {
      type: TEXT,
      name: "slug",
      label: "Slug",
      required: false,
      size: 3,
      validation: {},
    },
    {
      type: BUTTON,
      size: 6,
      childs: [
        {
          title: "Refresh",
          type: "button",
          action: "refresh",
          style: styleBtnBorder,
        },
        {
          title: "Tìm kiếm",
          type: "submit",
          action: "submit",
        },
      ],
    },
  ],
};

export const initialValues = {
  title: "",
  slug: "",
  pageIndex: PAGE_CURRENT,
  pageSize: PAGE_SIZE,
};

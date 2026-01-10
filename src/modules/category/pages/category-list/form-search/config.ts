import type { IBaseFormConfig } from "@/core/types/config-form.type";
import { TEXT, BUTTON } from "@/core/constants/form-constants";
import { PAGE_CURRENT, PAGE_SIZE } from "@/core/constants/table-constants";

export const formConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "name",
      label: "Tên danh mục",
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
          action: "handleRefresh",
          style: {
            background: "inherit",
            border: "1px solid #26c55b",
            color: "#26c55b",
          },
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
  name: "",
  slug: "",
  pageIndex: PAGE_CURRENT,
  pageSize: PAGE_SIZE,
};

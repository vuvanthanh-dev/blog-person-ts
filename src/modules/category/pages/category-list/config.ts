import type { BaseTableColumn } from "@/core/types/table.type";
import { STRING, BUTTON } from "@/core/constants/form-constants";

export const tableConfig: BaseTableColumn[] = [
  {
    label: "Tên danh mục",
    name: "name",
    type: STRING,
  },
  {
    label: "Slug",
    name: "slug",
    type: STRING,
  },
  {
    label: "Hành động",
    name: "ACTION_DETAIL",
    type: BUTTON,
    btnGroup: [
      {
        type: "button",
        title: "Chi tiết",
        action: "handleDetail",
        style: {
          background: "#ffa50099",
          border: "none",
          color: "#FFFFFF",
          fontWeight: 600,
        },
      },
    ],
  },
];

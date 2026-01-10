import type { BaseTableColumn } from "@/core/types/table.type";
import { STRING, BUTTON } from "@/core/constants/form-constants";

export const tableConfig: BaseTableColumn[] = [
  {
    label: "Tên bài viết",
    name: "title",
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
        action: "detail",
      },
      {
        type: "button",
        title: "Cập nhật",
        action: "update",
        style: {
          background: "inherit",
          border: "1px solid #26c55b",
          color: "#26c55b",
        },
      },
    ],
  },
];

export const btnGroup = [
  {
    type: "button",
    title: "Tạo mới",
    action: "create",
  },
];

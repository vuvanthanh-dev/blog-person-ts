import type { IBaseFormConfig } from "@/core/types/config-form.type";
import { TEXT, BUTTON } from "@/core/constants/form.constant";

export const loginConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "username",
      label: "Tài khoản",
      required: true,
      size: 12,
      validation: {
        required: {
          value: true,
          message: "Vui lòng nhập tài khoản",
        },
      },
    },
    {
      type: TEXT,
      name: "password",
      label: "Mật khẩu",
      required: true,
      isPassword: true,
      size: 12,
      validation: {
        required: {
          value: true,
          message: "Vui lòng nhập mật khẩu",
        },
      },
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "Đăng nhập",
          type: "submit",
          action: "submit",
        },
      ],
    },
  ],
};

export const initialValues = {
  username: "emilys",
  password: "emilyspass",
};

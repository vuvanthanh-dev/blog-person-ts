import type { ButtonProps } from "./button.type";

type IField = {
  name?: string;
  label?: string;
  type: string;
  validation?: {};
  placeholder?: string;
  disabled?: boolean;
  size: number;
  required?: boolean;
  option?: string;
  childs?: ButtonProps[];
  isMulti?: boolean;
  isPassword?: boolean;
};

export type IBaseFormConfig = {
  fields: IField[];
};

export interface BaseFormComponentProps {
  formConfig: IBaseFormConfig;
  onSubmit?: (data: any) => void;
  onChange?: (data: Record<string, any>) => void;
  handleBlur?: (data: any) => void;
  values?: Record<string, any>;
  options?: Record<string, any>;
  handlers?: Record<string, (e?: React.MouseEvent) => void>;
}

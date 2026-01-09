import type { ButtonProps } from "./button.type";
import {
  PAGE_CURRENT,
  PAGE_SIZE,
  TOTAL_PAGES,
  TOTAL_RECORDS,
} from "../constants/table-constants";

export interface BaseTableColumn {
  name: string;
  label: string;
  type: string;
  style?: Record<string, any>;
  styleCell?: Record<string, any>;
  colorCustom?: Record<string, any>;
  btnGroup?: ButtonProps[];
}

export interface BaseTableConfig {
  data: any[];
  pageCurrent: number;
  pageSize: number;
  totalPage: number;
  totalRecord: number;
}

export const BASE_TABLE_DEFAULT: BaseTableConfig = {
  data: [],
  pageCurrent: PAGE_CURRENT,
  pageSize: PAGE_SIZE,
  totalPage: TOTAL_PAGES,
  totalRecord: TOTAL_RECORDS,
};

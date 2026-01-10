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
  totalPages: number;
  totalRecords: number;
}

export const BASE_TABLE_DEFAULT: BaseTableConfig = {
  data: [],
  pageCurrent: PAGE_CURRENT,
  pageSize: PAGE_SIZE,
  totalPages: TOTAL_PAGES,
  totalRecords: TOTAL_RECORDS,
};

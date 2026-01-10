import React from "react";
import styles from "./_table.module.scss";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import type { RootState } from "@/app/config-store/store";
import type { ButtonProps } from "@/core/types/button.type";
import type { BaseTableColumn } from "@/core/types/table.type";
import ButtonComponent from "@/core/components/button";
import { STRING, BUTTON } from "@/core/constants/form-constants";
import clsx from "clsx";

interface BaseTableProps {
  tableConfig: BaseTableColumn[];
  btnGroup?: ButtonProps[];
  reducer: keyof RootState;
  state: string;
  handleCellAction?: (row: Record<string, any>, key?: string) => void;
  handlers?: Record<string, (e?: React.MouseEvent) => void>;
  btnGroupClassName?: string;
}

export const BaseTableComponent: React.FC<BaseTableProps> = (props) => {
  const {
    tableConfig,
    reducer,
    state,
    handleCellAction,
    btnGroup,
    handlers,
    btnGroupClassName,
  } = props;
  const dataTable = useSelector(
    (store: RootState) =>
      store[reducer][state as keyof (typeof store)[typeof reducer]]
  );
  const { items = [], totalRecords = 0 } = dataTable as {
    items?: any[];
    totalRecords?: number;
  };

  return (
    <React.Fragment>
      <div className={clsx(styles["table-btn-group"], btnGroupClassName)}>
        {btnGroup?.map((btn: ButtonProps, index: number) => {
          const onClickHandler = handlers?.[btn.action];
          return (
            <ButtonComponent
              key={`table-btn-group-${index}`}
              type={btn.type}
              disabled={btn.disabled}
              className="me-2"
              style={btn?.style || {}}
              onClick={() => {
                if (typeof onClickHandler === "function") {
                  onClickHandler();
                }
              }}
              title={btn.title}
              action={btn.action}
            />
          );
        })}
      </div>
      <div className={styles["total-records"]}>
        Tổng bản ghi: <span>{totalRecords}</span>
      </div>
      <Table bordered responsive className={styles["table-container"]}>
        <thead>
          <tr>
            {tableConfig.map((col: Record<string, any>, index: number) => (
              <th key={`head-${index}`} style={col?.style || {}}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((row: Record<string, any>, rowIndex: number) => (
            <tr key={`row-${rowIndex}`}>
              {tableConfig.map((col: Record<string, any>, colIndex: number) => {
                if (col.type === STRING) {
                  let styleCell = col?.styleCell || {};
                  if (col?.colorCustom) {
                    const color = col.colorCustom[row[col.name]] || "unset";
                    styleCell = { ...styleCell, color };
                  }
                  return (
                    <td
                      key={`cell-${rowIndex}-${colIndex}`}
                      style={styleCell}
                      className="align-middle"
                    >
                      {row[col.name]}
                    </td>
                  );
                }

                if (col.type === BUTTON) {
                  return (
                    <td
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={styles["btn-group"]}
                    >
                      {(col.btnGroup || []).map(
                        (btn: ButtonProps, btnIndex: number) => {
                          return (
                            <ButtonComponent
                              key={`cell-${rowIndex}-${colIndex}-btn-${col.name}-${btnIndex}`}
                              type={btn.type}
                              disabled={btn.disabled}
                              className="me-2"
                              style={btn?.style || {}}
                              action={btn.action}
                              onClick={() =>
                                handleCellAction?.(row, btn.action)
                              }
                              title={btn.title}
                            />
                          );
                        }
                      )}
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default BaseTableComponent;

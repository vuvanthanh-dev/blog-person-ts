import React from "react";
import FormSearchComponent from "@/modules/category/components/form-search";
import BaseTableComponent from "@/core/components/base-table";
import { tableConfig } from "./config";

interface CategoryListPageProps {}

const CategoryListPage: React.FC<CategoryListPageProps> = () => {
  const handleCellAction = (row: Record<string, any>) => {
    console.log(row);
  };

  return (
    <React.Fragment>
      <div className="base-background mb-10 base-title">Quản lý Danh mục</div>
      <FormSearchComponent />
      <div className="base-background mt-10">
        <BaseTableComponent
          tableConfig={tableConfig}
          reducer="category"
          state="list"
          handleCellAction={handleCellAction}
        />
      </div>
    </React.Fragment>
  );
};

export default CategoryListPage;

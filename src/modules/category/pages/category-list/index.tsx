import React from "react";
import BaseTableComponent from "@/core/components/base-table";
import FormSearchComponent from "./form-search";
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
          state="categories"
          handleCellAction={handleCellAction}
        />
      </div>
    </React.Fragment>
  );
};

export default CategoryListPage;

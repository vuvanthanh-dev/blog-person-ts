import React from "react";
import { useNavigate } from "react-router-dom";
import BaseTableComponent from "@/core/components/base-table";
import { tableConfig, btnGroup } from "./config";
import ROUTES_PATH from "@/core/routes";

interface FormTableComponentProps {}

const FormTableComponent: React.FC<FormTableComponentProps> = () => {
  const navigate = useNavigate();
  const handleCellAction = (row: Record<string, any>, action?: string) => {
    if (action === "detail") {
      navigate(ROUTES_PATH.post.detail.replace(":slug", row.slug));
    } else if (action === "update") {
      navigate(ROUTES_PATH.post.update.replace(":slug", row.slug));
    }
  };

  const handlers = {
    create: () => {
      navigate(ROUTES_PATH.post.create);
    },
  };

  return (
    <div className="base-background mt-10">
      <BaseTableComponent
        btnGroup={btnGroup}
        tableConfig={tableConfig}
        reducer="post"
        state="postsTable"
        handleCellAction={handleCellAction}
        handlers={handlers}
      />
    </div>
  );
};

export default FormTableComponent;

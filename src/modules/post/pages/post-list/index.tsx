import React from "react";
import TitlePageComponent from "@/core/components/title-page";
import FormSearchComponent from "./form-search";
import FormTableComponent from "./form-table";

const PostListPage = () => {
  return (
    <React.Fragment>
      <TitlePageComponent title="Quản lý Bài viết" />
      <FormSearchComponent />
      <FormTableComponent />
    </React.Fragment>
  );
};

export default PostListPage;

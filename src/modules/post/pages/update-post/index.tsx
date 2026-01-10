import React from "react";
import TitlePageComponent from "@/core/components/title-page";

interface UpdatePostPageProps {}

const UpdatePostPage: React.FC<UpdatePostPageProps> = () => {
  return (
    <React.Fragment>
      <TitlePageComponent title="Cập nhật Bài viết" />
    </React.Fragment>
  );
};

export default UpdatePostPage;

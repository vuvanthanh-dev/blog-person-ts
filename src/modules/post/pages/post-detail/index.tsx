import React from "react";
import TitlePageComponent from "@/core/components/title-page";

interface PostDetailPageProps {}

const PostDetailPage: React.FC<PostDetailPageProps> = () => {
  return (
    <React.Fragment>
      <TitlePageComponent title="Chi tiết Bài viết" />
    </React.Fragment>
  );
};

export default PostDetailPage;

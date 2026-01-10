import React from "react";
import TitlePageComponent from "@/core/components/title-page";
import BaseFormComponent from "@/core/components/base-form";
import { formConfig } from "./config";
interface CreatePostPageProps {}

const CreatePostPage: React.FC<CreatePostPageProps> = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onChange = (data: any) => {
    console.log(data);
  };

  const options = {
    category: [
      { value: "1", label: "Category 1" },
      { value: "2", label: "Category 2" },
    ],
  };

  const handlers = {
    onSubmit,
    onChange,
  };

  const handleBlur = (data: any) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <TitlePageComponent title="Tạo mới Bài viết" />
      <BaseFormComponent
        formConfig={formConfig}
        onSubmit={onSubmit}
        onChange={onChange}
        options={options}
        handlers={handlers}
        handleBlur={handleBlur}
      />
    </React.Fragment>
  );
};

export default CreatePostPage;

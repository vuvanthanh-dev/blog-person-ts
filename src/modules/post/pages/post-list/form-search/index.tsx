import { type FC, useState } from "react";

import BaseFormComponent from "@/core/components/base-form";
import { formConfig, initialValues } from "./config";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/config-store/store";
import type { PostPayload } from "@/modules/post/types";
import { getPosts } from "@/modules/post/slice.post";

interface FormSearchComponentProps {}

const FormSearchComponent: FC<FormSearchComponentProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState<PostPayload>(initialValues);

  const onChange = (data: Record<string, any>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  const handleSubmit = async (data: PostPayload) => {
    dispatch(getPosts(data));
  };

  return (
    <div className="base-background">
      <BaseFormComponent
        formConfig={formConfig}
        values={formValues}
        onChange={onChange}
        onSubmit={handleSubmit}
        handlers={{
          handleRefresh: () => {
            setFormValues(initialValues);
          },
        }}
      />
    </div>
  );
};

export default FormSearchComponent;

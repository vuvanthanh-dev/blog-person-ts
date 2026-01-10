import { type FC, useState } from "react";

import BaseFormComponent from "@/core/components/base-form";
import { formConfig, initialValues } from "./config";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/config-store/store";
import type { SearchPostForm } from "@/modules/post/types/form.type";
import { getPosts } from "@/modules/post/slice.post";

interface FormSearchComponentProps {}

const FormSearchComponent: FC<FormSearchComponentProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState<SearchPostForm>(initialValues);

  const onChange = (data: Record<string, any>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  const handleSubmit = async (data: SearchPostForm) => {
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
          refresh: () => {
            setFormValues(initialValues);
          },
        }}
      />
    </div>
  );
};

export default FormSearchComponent;

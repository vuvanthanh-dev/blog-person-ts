import { type FC, useState } from "react";

import BaseFormComponent from "@/core/components/base-form";
import { formConfig, initialValues } from "./config";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/config-store/store";
import type { CategoryPayload } from "../../types";
import { getCategories } from "../../slice.category";

interface FormSearchComponentProps {}

const FormSearchComponent: FC<FormSearchComponentProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState<CategoryPayload>(initialValues);

  const onChange = (data: Record<string, any>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  const handleSubmit = async (data: CategoryPayload) => {
    dispatch(getCategories(data));
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

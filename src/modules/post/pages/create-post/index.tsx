import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitlePageComponent from "@/core/components/title-page";
import BaseFormComponent from "@/core/components/base-form";
import type { AppDispatch, RootState } from "@/app/config-store/store";
import { getCategories } from "@/modules/category/slice.category";
import { formConfig, initialValues } from "./config";
import type { CreatePostForm } from "@/modules/post/types/form.type";
import { createPostPayload } from "@/modules/post/utils/payload.utils";
import { createPost } from "@/modules/post/slice.post";
import { getTags } from "@/modules/tag/slice.tag";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE_NO_LIMIT } from "@/core/constants/table.constant";

interface CreatePostPageProps {}

const CreatePostPage: React.FC<CreatePostPageProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector((state: RootState) => state.category);
  const { tags } = useSelector((state: RootState) => state.tag);

  const [formValues, setFormValues] = useState<CreatePostForm>(initialValues);

  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [tagOptions, setTagOptions] = useState<any>([]);

  useEffect(() => {
    dispatch(getCategories(PAGE_SIZE_NO_LIMIT));
    dispatch(getTags(PAGE_SIZE_NO_LIMIT));
  }, []);

  useEffect(() => {
    const categoriesTemp = (
      Array.isArray(categories.items) ? categories.items : []
    ).map((item: any) => ({
      value: item.slug,
      label: item.name,
    }));
    setCategoryOptions(categoriesTemp);
  }, [categories?.items]);

  useEffect(() => {
    const tagsTemp = (Array.isArray(tags.items) ? tags.items : []).map(
      (item: any) => ({
        value: item.slug,
        label: item.name,
      })
    );
    setTagOptions(tagsTemp);
  }, [tags?.items]);

  const onSubmit = (data: CreatePostForm) => {
    const payload = createPostPayload(data);
    dispatch(createPost(payload));
  };

  const onChange = (data: Record<string, any>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  return (
    <React.Fragment>
      <TitlePageComponent title="Tạo mới Bài viết" />
      <BaseFormComponent
        formConfig={formConfig}
        values={formValues}
        onSubmit={onSubmit}
        onChange={onChange}
        options={{
          categoryOptions,
          tagOptions,
        }}
        handlers={{
          back: () => navigate(-1),
        }}
      />
    </React.Fragment>
  );
};

export default CreatePostPage;

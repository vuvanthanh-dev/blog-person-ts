import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TitlePageComponent from "@/core/components/title-page";
import BaseFormComponent from "@/core/components/base-form";
import type { AppDispatch, RootState } from "@/app/config-store/store";
import { getCategories } from "@/modules/category/slice.category";
import { formConfig, initialValues } from "./config";
import type { UpdatePostForm } from "@/modules/post/types/form.type";
import { updatePost, getPostBySlug } from "@/modules/post/slice.post";
import { updatePostPayload } from "@/modules/post/utils/payload.utils";
import { getTags } from "@/modules/tag/slice.tag";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE_NO_LIMIT } from "@/core/constants/table.constant";

interface UpdatePostPageProps {}

const UpdatePostPage: React.FC<UpdatePostPageProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { slug = "" } = useParams();

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const tags = useSelector((state: RootState) => state.tag.tags);
  const postDetail = useSelector((state: RootState) => state.post.postDetail);

  const [formValues, setFormValues] = useState<UpdatePostForm>(initialValues);

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

  useEffect(() => {
    dispatch(getPostBySlug(slug));
  }, [slug]);

  useEffect(() => {
    if (postDetail) {
      setFormValues((prevValues) => ({
        ...prevValues,
        title: postDetail.title,
        content: postDetail.content,
        slug: postDetail.slug,
        author: postDetail.author,
        categories: categoryOptions.filter((item: any) =>
          postDetail.categories.includes(item.value)
        ),
        tags: tagOptions.filter((item: any) =>
          postDetail.tags.includes(item.value)
        ),
      }));
    }
  }, [postDetail, categoryOptions, tagOptions]);

  const onSubmit = (data: UpdatePostForm) => {
    const payload = updatePostPayload(data);
    dispatch(updatePost(payload));
  };

  const onChange = (data: Record<string, any>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  return (
    <React.Fragment>
      <TitlePageComponent title="Cập nhật Bài viết" />
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

export default UpdatePostPage;

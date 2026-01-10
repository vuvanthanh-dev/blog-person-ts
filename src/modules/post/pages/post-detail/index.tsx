import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TitlePageComponent from "@/core/components/title-page";
import BaseFormComponent from "@/core/components/base-form";
import type { AppDispatch, RootState } from "@/app/config-store/store";
import { getCategories } from "@/modules/category/slice.category";
import { formConfig, initialValues } from "./config";
import type { DetailPostForm } from "@/modules/post/types/form.type";
import { getPostBySlug } from "@/modules/post/slice.post";

interface PostDetailPageProps {}

const PostDetailPage: React.FC<PostDetailPageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { slug = "" } = useParams();

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const postDetail = useSelector((state: RootState) => state.post.postDetail);

  const [formValues, setFormValues] = useState<DetailPostForm>(initialValues);

  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [tagOptions, setTagOptions] = useState<any>([]);

  useEffect(() => {
    dispatch(getCategories({ pageIndex: 1, pageSize: 1000 }));
  }, []);

  useEffect(() => {
    const categoriesTemp = (
      Array.isArray(categories.items) ? categories.items : []
    ).map((item: any) => ({
      value: item.slug,
      label: item.name,
    }));
    setCategoryOptions(categoriesTemp);
    setTagOptions(categoriesTemp);
  }, [categories?.items]);

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

  const onSubmit = () => {
    navigate(-1);
  };

  const onChange = (data: Record<string, any>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  return (
    <React.Fragment>
      <TitlePageComponent title="Thông tin Bài viết" />
      <BaseFormComponent
        formConfig={formConfig}
        values={formValues}
        onSubmit={onSubmit}
        onChange={onChange}
        options={{
          categoryOptions,
          tagOptions,
        }}
      />
    </React.Fragment>
  );
};

export default PostDetailPage;

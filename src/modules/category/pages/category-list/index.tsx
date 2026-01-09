import { useEffect } from "react";
import CategoryService from "@/modules/category/service";
import type { CategoryPayload } from "../../types";

const CategoryListPage = () => {
  useEffect(() => {
    const params: CategoryPayload = {};
    CategoryService.getCategories(params).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <h1>Category List</h1>
    </div>
  );
};

export default CategoryListPage;

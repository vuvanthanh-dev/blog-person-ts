const ROUTES_PATH = {
  auth: {
    login: "/login",
  },
  home: {
    index: "/home",
  },
  category: {
    index: "/category",
    list: "/category/list",
    detail: "/category/detail/:id",
    create: "/category/create",
    update: "/category/update/:id",
  },
  post: {
    index: "/post",
    list: "/post/list",
    detail: "/post/detail/:id",
    create: "/post/create",
    update: "/post/update/:id",
  },
  tag: {
    index: "/tag",
    list: "/tag/list",
    detail: "/tag/detail/:id",
    create: "/tag/create",
    update: "/tag/update/:id",
  },
  notFound: {
    index: "/404",
  },
};

export default ROUTES_PATH;

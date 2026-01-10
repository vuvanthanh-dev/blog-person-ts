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
    detail: "/category/detail/:slug",
    create: "/category/create",
    update: "/category/update/:slug",
  },
  post: {
    index: "/post",
    list: "/post/list",
    detail: "/post/detail/:slug",
    create: "/post/create",
    update: "/post/update/:slug",
  },
  tag: {
    index: "/tag",
    list: "/tag/list",
    detail: "/tag/detail/:slug",
    create: "/tag/create",
    update: "/tag/update/:slug",
  },
  notFound: {
    index: "/404",
  },
};

export default ROUTES_PATH;

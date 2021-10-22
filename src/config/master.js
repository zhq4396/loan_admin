import { loginLayouts, adminLayouts } from "@/layouts";

export const masterRouterMap = [
  {
    component: loginLayouts,
    path: "*",
    redirect: "/404",
    children: [
      {
        path: "/404",
        component: () => import("@/views/element/404"),
      },
    ],
  },
  {
    path: "/",
    name: "log",
    redirect: "/login",
    component: loginLayouts,
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/login"),
      },
    ],
  },
  {
    path: "/",
    name: "/data",
    redirect: "/element",
    component: adminLayouts,
    children: [
      {
        path: "/element",
        name: "element",
        component: () => import("@/views/element/element"),
        meta: {
          pageTitle: "element",
          isGreyBg:true
        },
      },
      {
        path: "/elements",
        name: "elements",
        component: () => import("@/views/element/elements"),
        meta: {
          pageTitle: "elements",
        },
      },
      {
        path: "/elementd",
        name: "elementd",
        component: () => import("@/views/element/elementd"),
        meta: {
          pageTitle: "elementd",
        },
      },
    ],
  },
];

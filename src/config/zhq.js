import { loginLayouts, adminLayouts } from "@/layouts";

export const zhqRouterMap = [
  {
    path: "/zhq",
    redirect: "/staffAdmin",
    component: adminLayouts,
    children: [
      {
        path: "/staffAdmin",
        name: "staffAdmin",
        component: () => import("@/views/systemRun/staffAdmin"),
        meta: {
          pageTitle: "人员管理",
        },
      },
      {
        path: "/roleAdmin",
        name: "roleAdmin",
        component: () => import("@/views/systemRun/roleAdmin"),
        meta: {
          pageTitle: "角色管理",
        },
      },
      {
        path: "/loanRun",
        name: "loanRun",
        component: () => import("@/views/loanRun/loanRun"),
        meta: {
          pageTitle: "贷种管理",
        },
      },
      {
        path: "/addRole",
        name: "addRole",
        component: () => import("@/views/systemRun/addRole"),
        meta: {
          pageTitle: "添加角色",
        },
      },
    ],
  },
];

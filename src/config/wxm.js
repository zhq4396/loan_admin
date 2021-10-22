import { loginLayouts, adminLayouts } from "@/layouts";

export const wxmRouterMap = [{
    path: "/wxm",
    redirect: "/shopParameter",

    component: adminLayouts,
    children: [{
            path: "/shopParameter",
            name: "shopParameter",
            component: () =>
                import ("@/views/parameterSee/shopParameter"),
            meta: {
                pageTitle: "消费信贷台账",
            },
        },
        {
            path: "/shopDetail",
            name: "shopDetail",
            component: () =>
                import ("@/views/parameterSee/shopDetail"),
            meta: {
                pageTitle: "消费信贷明细",
            },
        },
        {
            path: "/pettyParameter",
            name: "pettyParameter",
            component: () =>
                import ("@/views/parameterSee/pettyParameter"),
            meta: {
                pageTitle: "小额信贷台账",
            },
        },
        {
            path: "/pettyDetail",
            name: "pettyDetail",
            component: () =>
                import ("@/views/parameterSee/pettyDetail"),
            meta: {
                pageTitle: "小额信贷明细",
            },
        },
        {
            path: "/houses",
            name: "houses",
            component: () =>
                import ("@/views/houses/houses"),
            meta: {
                pageTitle: "楼盘管理",
            },
        }
    ],
}, ];
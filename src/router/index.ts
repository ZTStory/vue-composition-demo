import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Index",
        component: () => import(/* webpackChunkName: "Index" */ "@/pages/index.vue"),
        meta: {
            index: 1,
        },
    },
    {
        path: "/input",
        name: "Input",
        component: () => import(/* webpackChunkName: "Index" */ "@/pages/input.vue"),
        meta: {
            index: 1,
        },
    },
    {
        path: "/select",
        name: "Select",
        component: () => import(/* webpackChunkName: "Index" */ "@/pages/select.vue"),
        meta: {
            index: 1,
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

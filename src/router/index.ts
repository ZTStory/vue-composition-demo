import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/pages/home.vue"),
        meta: {
            depth: 0,
        },
    },
    {
        path: "/animationIndex",
        name: "AnimationIndex",
        component: () => import("@/pages/animation/index.vue"),
        meta: {
            depth: 1,
        },
    },
    {
        path: "/keepAliveIndex",
        name: "KeepAliveIndex",
        component: () => import("@/pages/keep-alive-clear/index.vue"),
        meta: {
            depth: 1,
        },
    },
    {
        path: "/keepAliveInput",
        name: "KeepAliveInput",
        component: () => import("@/pages/keep-alive-clear/input.vue"),
        meta: {
            depth: 2,
        },
    },
    {
        path: "/keepAliveSelect",
        name: "KeepAliveSelect",
        component: () => import("@/pages/keep-alive-clear/select.vue"),
        meta: {
            depth: 3,
        },
    },
    {
        path: "/lastPositionIndex",
        name: "LastPositionIndex",
        component: () => import("@/pages/use-last-position/index.vue"),
        meta: {
            depth: 1,
        },
    },
    {
        path: "/lastPositionNext",
        name: "LastPositionNext",
        component: () => import("@/pages/use-last-position/next.vue"),
        meta: {
            depth: 2,
        },
    },
    {
        path: "/pagingIndex",
        name: "PagingIndex",
        component: () => import("@/pages/use-paging/index.vue"),
        meta: {
            depth: 1,
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

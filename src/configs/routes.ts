import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";


const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
//匹配错误路由
    {
        path: '/:pathMatch(.*)*',
        component:()=>import('@/pages/404.vue')
    }
];

export default routes;

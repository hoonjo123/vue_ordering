import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from '@/components/HomeComponent.vue';

import LoginComponent from '@/views/LoginComponent.vue';

/*export default인 경우 {}필요없고, 여러 요소가 있을 경우에는 {}필요하다. */
import { memberRoutes } from "./memberRouter.js";
import { orderRoutes } from "./orderRouter.js";

const routes = [
    {
        /** url 경로 지정 */
        path: '/',
        /** 라우터의 이름 */
        name: 'HOME',
        component: HomeComponent, 
    },
    {
        path: '/login',
        name: 'LOGIN',
        component: LoginComponent,
    },
    ...memberRoutes,
    /*...은 스프레드 연산자로 불리고, 주로 배열요소를 다른 배열요소에 합할 때 사용한다. */
    ...orderRoutes
];

const router = createRouter({
    /**vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공한다.
     * 1)createWebHistory, createHashHistory
    */
    history: createWebHistory(),
    routes
});

export default router;
import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from '@/components/HomeComponent.vue';
import MemberList from '@/views/MemberList.vue';
import LoginComponent from '@/views/LoginComponent.vue';
const routes = [
    {
        /** url 경로 지정 */
        path: '/',
        /** 라우터의 이름 */
        name: 'HOME',
        component: HomeComponent, 
    },
    {
        path: '/members',
        name: 'MemberList',
        component: MemberList, 
    },
    {
        path: '/login',
        name: 'LOGIN',
        component: LoginComponent,
    }
];

const router = createRouter({
    /**vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공한다.
     * 1)createWebHistory, createHashHistory
    */
    history: createWebHistory(),
    routes
});

export default router;
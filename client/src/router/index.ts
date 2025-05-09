import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewSession from '@/views/admin/NewSession.vue';
import ActiveStage from '@/views/ActiveStage.vue';
import AdminHome from '../views/admin/AdminHome.vue';
import SessionDetail from '@/views/admin/SessionDetail.vue';
import UserResults from '@/views/user/UserResults.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/active-stage',
            name: 'activestage',
            component: ActiveStage,
        },
        {
            path: '/admin',
            name: 'admin-home',
            component: AdminHome,
        },
        {
            path: '/admin/new-session',
            name: 'new-session',
            component: NewSession,
        },
        {
            path: '/admin/sessions/:id',
            name: 'sessions',
            component: SessionDetail,
        },
        {
            path: '/users/:username',
            name: 'user',
            component: UserResults,
        },
    ],
});

export default router;

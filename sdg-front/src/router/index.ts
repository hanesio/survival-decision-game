import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewSession from '@/views/admin/NewSession.vue'
import ActiveStage from '@/views/ActiveStage.vue'
import AdminHome from '../views/admin/AdminHome.vue'
import AboutView from '../views/AboutView.vue'
import SessionDetail from '@/views/admin/SessionDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => AboutView,
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
  ],
})

export default router

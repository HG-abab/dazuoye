import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Overview.vue'),
    meta: { title: '总览页' }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/Details.vue'),
    meta: { title: '详情页' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/eng-dev'),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 校园后勤管理系统` : '校园后勤管理系统'
  next()
})

export default router
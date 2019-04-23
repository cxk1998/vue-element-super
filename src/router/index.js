/**
 * router配置
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Layout = () => import( '@/views/index')

const router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/error', component: () => import('@/views/error'),
      children: [
        {path: '403', component: () => import('@/views/error/403')},
        {path: '404', component: () => import( '@/views/error/404')},
      ]
    },
    {path: '/login', component: () => import('@/views/login')},
    {path: '/home', component: Layout,
      children: [
        {path: '', component: () => import('@/views/home'),}
      ]
    },
    {path: '/sysmgr', component: Layout,
      children: [
        {path: 'user', component: () => import('@/views/sysmgr/user'),},
        {path: 'role', component: () => import('@/views/sysmgr/role'),}
      ]
    },
    {path: '/monitor', component: Layout,
      children: [
        {path: 'login-log', component: () => import('@/views/monitor/login-log'),},
      ]
    },
    {path: '*', redirect: '/error/404'},
  ]
})

export default router

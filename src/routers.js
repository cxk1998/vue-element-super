import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {path: '/', component: resolve => require(['./pages/login'], resolve)},
    {path: '/index', component: resolve => require(['./pages/index'], resolve),
      children: [
        //系统管理
        { path: "/system_mgr/userMgr", component: resolve => require(['./pages/system_mgr/userMgr'], resolve)},
        { path: "/system_mgr/dptMgr", component: resolve => require(['./pages/system_mgr/dptMgr'], resolve)},
        { path: "/system_mgr/roleMgr", component: resolve => require(['./pages/system_mgr/roleMgr'], resolve)},
        { path: "/system_mgr/menuMgr", component: resolve => require(['./pages/system_mgr/menuMgr'], resolve)},
        //系统监控
        { path: "/system_monitor/logOper", component: resolve => require(['./pages/system_monitor/logOper'], resolve)},
        { path: "/system_monitor/logLogin", component: resolve => require(['./pages/system_monitor/logLogin'], resolve)},
      ]
    },
    {path: '/404', component: resolve => require(['./pages/404'], resolve)},
    {path: '/401', component: resolve => require(['./pages/401'], resolve)},

  ]
})

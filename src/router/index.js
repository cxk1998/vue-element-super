import Vue from 'vue'
import Router from 'vue-router'
//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Cookies from "js-cookie";
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
    {path: '*', redirect: '/error/404'},
  ]
})
// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
//路由拦截
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  let userToken=Cookies.get("userToken");
  if(to.path==="/login"){
    next();
  }else if(to.matched.length>0){
    if(userToken===undefined || userToken===null || userToken===""){
      next({path: '/login', query: {redirect: to.fullPath}});// 将跳转的路由path作为参数，登录成功后跳转到该路由
    }else{
      if(Object.keys(from.query).length === 0){//判断路由来源是否有query，处理不是目的跳转的情况
        next()
      }else{
        let redirect = from.query.redirect//如果来源路由有query
        if(to.path === redirect){//这行是解决next无限循环的问题
          next()
        }else{
          next({path:redirect})//跳转到目的路由
        }
      }
    }
  }else{
    next({path: '/error/404'})
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router

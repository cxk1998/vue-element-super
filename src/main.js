// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routers'
import ElementUI from 'element-ui';
import VueContextMenu from 'vue-contextmenu'
import {VTable,VPagination} from 'vue-easytable'
import base from './utils/base'
import global_ from './utils/Global'//引用文件
import {getStore} from "./utils/sessionStorage"

// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-contextmenu/style/css/font-awesome.min.css'
import 'vue-easytable/libs/themes-base/index.css'
import '../static/css/resetUi.css';
/* 引入第三方插件 */
Vue.use(ElementUI);
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(VueContextMenu)
Vue.use(base)
Vue.prototype.GLOBAL = global_//将全局变量挂载到Vue实例上面
Vue.config.productionTip = false

//路由拦截
router.beforeEach((to, from, next) => {
  let userToken=getStore("userToken");
  if(to.path=="/"){
    next();
  }else if(to.matched.length>0){
    if(userToken===undefined || userToken===null || userToken===""){
      next({path: '/'})
    }else{
      next();
    }
  }else{
    next({path: '/404'})
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/**
 * axios请求封装
 */

import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import {Message} from 'element-ui'
import Cookies from 'js-cookie'

let requestList = [];
const saveTime = 1000;
/**
请求超时时间
 */
const service = axios.create({
  baseURL: process.env.API_ROOT, // node环境的不同，对应不同的baseURL
  timeout: 30*1000,
});

/**
request拦截器
 */
service.interceptors.request.use(
  config => {
    //定义取消请求函数
    let cancel = undefined;
    config.cancelToken = new axios.CancelToken(function executor(c) {
      cancel = c;
    });
    //放置重复请求
    let nowTime = new Date().getTime();
    requestList = requestList.filter((item) => {
      return (item.setTime + saveTime) > nowTime;
    });
    let sessionUrl = requestList.filter((item) => {
      return item.url === config.url;
    });
    if (sessionUrl.length > 0) {
      console.info(config.url + '请求重复 中断请求!');
      cancel(url)
      return;
    }
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    let token = Cookies.get("userToken");
    if (token) {
      config.headers.Authorization = token;
      return config;
    } else if (config.url === "/api/user/login") {
      return config;
    } else {
      ///取消请求
      cancel();
      ///跳转到登录页面
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      });
    }
  },
  error => {
    return Promise.reject(error);
  }
);
/**
response拦截器
 */
service.interceptors.response.use(
  response => {
    let result=response.data;
    return Promise.resolve(result);
  },
  error => {
    if(error.response){
      let status=error.response.status;
      let result=error.response.data;
      switch(status){
        case 400:
          Message({type:'error',message:result.msg});
          break;
        case 401:
          Message({type:'error',message:"请先登录"});
          router.replace({path: '/login', query: {redirect: router.currentRoute.fullPath}});
          break;
        case 403:
          router.push('/error/403');
          break;
        case 404:
          router.push('/error/404');
          break;
        case 405:
          Message({type:'error',message:"服务器内部错误，请与管理员联系或稍后重试"});
          break;
        case 500:
          Message({type:'error',message:"服务器内部错误，请与管理员联系或稍后重试"});
          break;
        default:
          Message({type:'error',message:"服务器未知错误，请与管理员联系或稍后重试"});
      }
      return Promise.reject(null);
    }else{
      Message({type:'error',message:"未知错误，请与管理员联系或稍后重试"});
      return Promise.reject(null);
    }
  });

/**
封装请求方式
 */
const request = {
  addTtoParams:function (params) {
    if(!params){
      params={};
    }
    params.t=(new Date()).getTime()
    return params;
  },
  get: function (url, params) {
    return service.get(url, {params: this.addTtoParams(params)});
  },
  post: function (url, params) {
    return service.post(url, qs.stringify(this.addTtoParams(params)));
  },
  login: function (url, params) {
    return service.post(url, this.addTtoParams(params));
  },
  delete: function (url, params) {
    return service.delete(url, {params: this.addTtoParams(params)});
  },
  put: function (url, params) {
    return axios.put(url, qs.stringify(this.addTtoParams(params)));
  },
  uploadFilePost: function (url, params) {
    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    };
    return axios.post(url, this.addTtoParams(params), config);
  },
}
export default request

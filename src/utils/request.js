/**
 * axios请求封装
 */

import axios from 'axios'
import router from '@/router'
import {Message} from 'element-ui'
import Cookies from 'js-cookie'

let requestList = [];
const saveTime = 1000;
/**
 请求超时时间
 */
const service = axios.create({
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
    let login_token = Cookies.get("login_token");
    if (login_token) {
      config.headers.Authorization = login_token;
      return config;
    } else {
      Cookies.set("return_url",process.env.FRONT_ROOT+router.currentRoute.fullPath,{ domain: process.env.COOKIE_DOMAIN });
      window.location.href = process.env.LOGIN_ROOT;
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
          Message({type:'error',message:result.msg});
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
      return Promise.reject(error.response);
    }else{
      Message({type:'error',message:"未知错误，请与管理员联系或稍后重试"});
      return Promise.reject(null);
    }
  });

/***
 * axios封装，支持多个api扩展
 */
class Request{

  constructor(){

  }

  /***
   * 在url后面加上时间参数，防止url缓存
   * @param params
   * @returns {*}
   * @private
   */
  _addTtoParams (params) {
    if(params === null || params ===undefined){
      params={};
    }
    if(typeof({}) !== 'object'){
      throw 'Params mast be object';
    }
    params.t=(new Date()).getTime()
    return params;
  }

  /***
   * axios config
   */
  _getConfig(){
    let config = {};
    config.baseURL = process.env.API_ROOT;
    return config;
  }

  /***
   * get 请求开启缓存
   * @param url
   * @param params
   */
  getForCache(url, params){
    let config = this._getConfig;
    config["params"] = params;
    return service.get(url, config);
  }

  /***
   * 普通get请求，不缓存
   * @param url
   * @param params
   */
  get(url, params) {
    let config = this._getConfig;
    config["params"] = this._addTtoParams(params);
    return service.get(url, config);
  }
  /**
   * 如果提交带文件，则需要配置
   * config.headers["Content-Type"] = 'multipart/form-data';
   * @param url
   * @param params
   * @returns {AxiosPromise<any>}
   */
  post(url, params) {
    let config = this._getConfig;
    let data = this._addTtoParams(params);
    return service.post(url, data, config);
  }

  /***
   * 修改请求
   * @param url
   * @param params
   * @returns {AxiosPromise<any>}
   */
  put(url, params) {
    let config = this._getConfig;
    let data = this._addTtoParams(params);
    return axios.put(url,data, config);
  }

  /***
   * 删除方法
   * @param url
   * @param params
   * @returns {AxiosPromise}
   */
  delete(url, params) {
    let config = this._getConfig;
    config["params"] = this._addTtoParams(params);
    return service.delete(url, config);
  }
}

class DnsRequest extends Request{
  constructor() {
    super()
  }
}

/***
 * 生成request实例
 */
const request = new Request();
const dnsRequest = new DnsRequest();

export {
  request,
  dnsRequest,
}

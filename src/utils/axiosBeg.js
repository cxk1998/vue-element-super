import axios from 'axios'
import router from './../routers'
import {getStore} from "./sessionStorage"
import qs from 'qs'
import {Message} from 'element-ui'

// 请求方式
export const axiosBeg = {
  /*toString: function (data) {
    return JSON.toString(data);
  },*/
  serverUrl:process.env.API_ROOT,
  get :function (url,dataSource){
    /* 每次请求带上token */
    axios.defaults.headers['Authorization'] = getStore("userToken");
    return axios.get(this.serverUrl+url, {params: dataSource}).then(response => this._httpResponse(response)).catch(err=>this._httpError(err));
  },
  post : function (url, dataSource){
    /* 每次请求带上token */
    axios.defaults.headers['Authorization'] = getStore("userToken");
    return axios.post(this.serverUrl+url, qs.stringify(dataSource)).then(response => this._httpResponse(response)).catch(err=>this._httpError(err));
  },
  delete : function(url, dataSource){
    /* 每次请求带上token */
    axios.defaults.headers['Authorization'] = getStore("userToken");
    return axios.delete(this.serverUrl+url,{params:dataSource}).then(response => this._httpResponse(response)).catch(err=>this._httpError(err));
  },
  put : function(url, dataSource){
    /* 每次请求带上token */
    axios.defaults.headers['Authorization'] = getStore("userToken");
    return axios.put(this.serverUrl+url,qs.stringify(dataSource)).then(response => this._httpResponse(response)).catch(err=>this._httpError(err));
  },
  uploadFilePost: function (url, dataSource) {
    /* 每次请求带上token */
    dataSource.token = axios.defaults.headers['Authorization'] = getStore("userToken");
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };
    return axios.post(this.serverUrl+url,dataSource, config).then(response => this._httpResponse(response)).catch(err=>this._httpError(err));
  },
  _httpError:function(err){
    console.log(err)
    Message.error(err);
  },
  _httpResponse:function(response){
    let data=response.data;
    let code=data.code;
    if(code==200){
      return response.data;
    }else if(code==401){
      Message.error(response.data.msg);
    }else{
      Message.error(response.data.msg);
    }
  },
}

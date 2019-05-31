import {request} from "../utils/request"
import {isEmpty} from "../utils/common"
/***
 * 登录方法
 * @param params like {user_name:'admin',password:'123456'}
 * @returns {Promise<*>}
 */
export async function login(params){
  let data = await request.get('../../static/data/user.json',params);
  for(let user of data){
    if(user.user_name === params.user_name){
      return {token: "test",user: user};
    }
  }
  return {};
}

/***
 * 退出登录
 * @returns {Promise<*>}
 */
export async function logout(){
  let data = await 1;
  return data;
}

/***
 * 分页查询
 * @param params like {current_page: 1,page_size: 10,user_name:''}
 * @returns {Promise<*>}
 */
export async function getPageUser(params){
  let start_index = (params.current_page - 1) * params.page_size;
  let end_index = (params.current_page) * params.page_size;
  let data = await request.get('../../static/data/user.json',params);
  let users = data.filter((user,index) => {
    let real_index = index+1;
    if(real_index > start_index && real_index <= end_index){
      if(isEmpty(params.user_name)){
        return user;
      }else if(user.user_name === params.user_name){
        return user;
      }
    }
  });
  let total_row = data.length;
  let total_page = 1;
  if(total_row !== 0){
    total_page =  Math.round(total_row / params.page_size);
  }
  return {current_page: params.current_page,page_size: params.page_size,total_page:total_page,total_row: total_row ,data:users};
}

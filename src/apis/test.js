import {request} from "../utils/request"
import {isEmpty} from "../utils/common";

/***
 * 分页查询
 * @param params like {current_page: 1,page_size: 10}
 * @returns {Promise<*>}
 */
export async function getPageTest(params){
  let start_index = (params.current_page - 1) * params.page_size;
  let end_index = (params.current_page) * params.page_size;
  let data = await request.get('../../static/data/test.json',params);
  let tests = data.filter((test,index) => {
    let real_index = index+1;
    if(real_index > start_index && real_index <= end_index){
      if(isEmpty(params.test_name)){
        return test;
      }else if(test.test_name === params.test_name){
        return test;
      }
    }
  });
  let total_row = data.length;
  let total_page = 1;
  if(total_row !== 0){
    total_page =  Math.round(total_row / params.page_size);
  }
  return {current_page: params.current_page,page_size: params.page_size,total_page:total_page,total_row: total_row ,data:tests};
}

/***
 * 添加
 * @param params
 * @returns {Promise<void>}
 */
export async function addTest(params){
  let data = await '请自行实现';
}

/***
 * 编辑
 * @param params
 * @returns {Promise<void>}
 */
export async function editTest(params){
  let data = await '请自行实现';
}

/***
 * 删除
 * @param id
 * @returns {Promise<void>}
 */
export async function delTest(id){
  let data = await '请自行实现';
}


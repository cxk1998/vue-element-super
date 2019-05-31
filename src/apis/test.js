import {request} from "../utils/request"

/***
 * 分页查询
 * @param params like {current_page: 1,page_size: 10}
 * @returns {Promise<*>}
 */
export async function getPageTest(params){
  let start_index = (params.current_page - 1) * params.page_size;
  let end_index = (params.current_page) * params.page_size;
  let data = await request.get('../../static/data/test.json',params);
  let tests = data.filter(test => {
    if(test.id > start_index && test.id <= end_index){
      return test;
    }
  });
  let total_row = data.length;
  let total_page = 1;
  if(total_row !== 0){
    total_page =  Math.round(total_row / params.page_size);
  }
  return {current_page: params.current_page,page_size: params.page_size,total_page:total_page,total_row: total_row ,data:tests};
}

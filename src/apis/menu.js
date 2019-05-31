import {request} from "../utils/request"
export async function getMenu(params){
  return await request.get('../../static/data/menu.json',params);
}

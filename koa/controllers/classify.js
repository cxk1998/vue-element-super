const query = require('../db/');
const {PAGECOUNT} = require('../config/');


const classify = {
  //  创建分类 管理员
  createClass:function ({classType,createTime}){
    return query(`INSERT INTO classify(classType,createTime) VALUES('${classType}','${createTime}')`);
  },
  // 删除分类 管理员
  removeClass:function (classId){
    return query(`DELETE FROM classify WHERE classId = '${classId}'`);
  },
  // 编辑分类 管理员
  updateClass:function ({classId,classType}){
    return query(`UPDATE classify SET classType = '${classType}' WHERE classId = ${classId}`);
  },
  // 查询所有分类
  findAllClass:function (){
    return query(`SELECT * FROM classify`);
  },
};
module.exports=classify;

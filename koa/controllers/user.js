const query = require('../db/');
const {PAGECOUNT} = require('../config/');


const admin = {
  // 创建用户 管理员
  createUser:async function (username,password){
    let add = await query(`INSERT INTO user(username,password) VALUES('${username}','${password}')`);
    console.info(add)
    return add;
  },
  // 获取用户 管理员
  getUserByName: async function (username){
    let user = await query(`SELECT * FROM user WHERE username = '${username}'`);
    return user;
  },
};
module.exports=admin;

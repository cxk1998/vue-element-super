require('dotenv').load();
require('dotenv').config();

const Router = require('koa-router');
const router = new Router();
const db = require('../db');
const {User,Role,Menu} = require('../models/sysmgr');
let sha1 = require('sha1'); //加密
const Sequelize = require('sequelize')
router
  .post('/getUserMenu',async(ctx,next)=> {
    await User.findOne({
      attributes: ['username',Sequelize.col('roles.name')],
      include: [{
        model: Role,
        through: {
          attributes: [],
        },
        include:[{
          model: Menu
        }]
      }],
      where: {username: ctx.state.username},
    }).then(user => {
      console.info(JSON.stringify(user))
      if (user) {
        // 用户名存在通过验证
        ctx.response.status = 200;
        ctx.response.body = {user: user,msg: '请求成功'};
      } else {
        // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册
        ctx.response.status = 400;
        ctx.response.body = {msg: '用户名或密码错误'};
      }
    }).catch(err => {
      // 查找数据库发生错误，或者一些
      console.log(err);
      ctx.response.status = 400;
      ctx.response.body = {msg: '登录失败，请于管理员联系或稍后重试'};
    });
  });
module.exports = router;

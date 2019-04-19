require('dotenv').load();
require('dotenv').config();

const Router = require('koa-router');
const router = new Router();
const user = require('../controllers/user');

const createToken = require('../utils/createToken');

let sha1 = require('sha1'); //加密

router
  .post('/login',async(ctx)=> {
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);
    await user.getUserByName(username)
      .then(data => {
        let user = data[0];
        if (user && (password === user.password)) {
          // 用户名存在通过验证
          ctx.response.status = 200;
          ctx.response.body = {user: user,token: createToken(username),msg: '请求成功'};

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
  })
  .post('/add',async(ctx,next)=> {
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);
    await user.createUser(username,password)
      .then(() => {
        ctx.body = {
          code: 200,
          token: createToken(username)
        };
      })
      .catch(err => {
        // 服务器发生错误（用户名可能重复）
        ctx.body = {
          code: -200,
          message: '数据库错误'
        };
      })
  })
  .get('/test',async(ctx,next)=> {
    ctx.body = {
      code: 200,
      message: '数据库错误'
    };
  });

module.exports = router;

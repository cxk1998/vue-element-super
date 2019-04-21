const Router = require('koa-router');
const router = new Router();

const user = require('./user');
const menu = require('./menu');

module.exports = function (app){
  	//路由表
	app.use(router.routes()).use(router.allowedMethods());

	router.use('/api/user',user.routes(),user.allowedMethods());
  router.use('/api/menu',menu.routes(),menu.allowedMethods());
};

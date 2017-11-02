/**
 * Created by liuxiaomin on 2017/7/20.
 */
const path = require('path');
global.BASE_PATH = __dirname;

const koa = require('koa');
const views = require('koa-views');
const bodyparser = require('koa-bodyparser');
const render = require('koa-ejs');
//const ejs = require('ejs');

//日志相关
const Debug = require('./libs/log');
const logger = require('./libs/logger');

const errorHandle = require('./src/middleware/error');
const config = require('./config');
const response_formatter = require('./libs/response_formatter');

const app = new koa();
Debug.start();

const router = require('koa-router')();
const viewRouter = require('./src/routers/index');

// 加载模板引擎
//locals设置全局参数
//locals设置全局参数
render(app, {
    root: path.join(__dirname, '/src/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false,
});

//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(response_formatter('^/api'));

//中间件
app.use(bodyparser(/*{jsonLimit:'10mb'}*/));
app.use(errorHandle());

//日志
app.use(logger());


//路由中间件
viewRouter(router);
app.use(router.routes(), router.allowedMethods());


app.listen(config.port);
console.log('liuxiaomin Website start by ', config.port);

// app.use(views(__dirname + '/src/views', {
//     //map: {html: 'ejs'}
//      extension: 'ejs'
// }));
/**
 * Created by liuxiaomin on 2017/7/20.
 */
const  Home = require("../controller/home");

module.exports = function (router) {
    router.get(/^\/lxmwebsite(\/|$)/,Home.getControl);
    // router.get('/api/home/list',Home.getTest);
    router.get('/api/articles/typelist',Home.getArticleList);


};
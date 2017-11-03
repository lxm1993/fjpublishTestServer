/**
 * Created by liuxiaomin on 2017/7/20.
 */
const  Home = require("../controller/home");

module.exports = function (router) {
    router.get('/fuwu/lwtwebsite',Home.getControl);
    router.get(/^\/fuwu\/lwtwebsite(\/|$)/, Home.getControl);
    // router.get('/api/home/list',Home.getTest);


};
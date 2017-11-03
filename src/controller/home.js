/**
 * Created by liuxiaomin on 2017/7/20.
 */
const version = require('../../public/version.json');
exports.getControl = async function (ctx, next) {
    try{
        await ctx.render('home/index',{
            title:'刘晓敏个人主页',
            version:version
        });
    }catch (err){
        this.throw('找不到页面44', 404);
    }
};
exports.getArticleList = async function (ctx, next) {
    let type = ctx.query.type,
        list =null;
    if(type == '诗词'){
        list = ['123','567']
    }else if(type == '美术') {
        list = ['美术','美术']
    }else if(type == '其他') {
        list = ['其他','其他']
    }else if(type == '技术') {
        list = ['技术','技术']
    }
    try {
        console.log(ctx.query);
        ctx.body = {
            list:list
        }
    } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }

};
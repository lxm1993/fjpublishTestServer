/**
 * Created by liuxiaomin on 2017/7/20.
 */
const version = require('../../config/version.json');
exports.getControl = async function (ctx, next) {
    console.log('aaaaaaa');
    try{
        await ctx.render('home/index',{
            title:'云门店管理系统',
            version:version
        });
    }catch (err){
        this.throw('找不到页面44', 404);
    }
};

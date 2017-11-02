/**
 * Created by liuxiaomin on 2017/7/20.
 */
exports.getControl = async function (ctx, next) {
    try{
        await ctx.render('home',{
            title:'刘晓敏个人主页'
        });
    }catch (err){
        this.throw('找不到页面44', 404);
    }
};


module.exports = {
    //显示错误
    displayError : function(status) {
        switch (status) {
            case 404:
                return render('error/404.html', {
                    code: '404'
                });
            default:
                return render('error/error.html', {
                    code: status
                });
                break;
        }
    },
    _400Action: function(){
        return this.displayError(400);
    },
    _403Action: function(){
        return this.displayError(403);
    },
    _404Action: function(){
        return this.displayError(404);
    },
    _500Action: function(){
        return this.displayError(500);
    },
    _503Action: function(){
        return this.displayError(503);
    }
}
/**
 * Created by liuxiaomin on 2017/7/20.
 */
"use strict";

//const errorCtrl = require(global.BASE_PATH+'/src/controller/error/error');

module.exports = function () {
    return  async function (ctx, next) {
        var error = null;
        try {
            console.info('Request:', {
                url: ctx.request.url,
                ip: ctx.request.headers['x-real-ip'],
            });

            await next();
        } catch (e) {
            error = e;
            ctx.status = e.status || 500;
        } finally {
            ctx.status = ctx.status === 405 ? 404 : ctx.status;
            if (ctx.status !== 200) {
                // 打印400及以上的错误日志
                if (ctx.status >= 400 || error) {
                    console.error(error || ctx.status, {
                        url: ctx.request.url,
                        ip: ctx.request.headers['x-real-ip'],
                    });
                }
                if (ctx.status === 404 || error) {
                    var mime = ctx.accepts(['json', 'html']);
                    if (mime === 'json') {
                        let message = ctx.status === 404 ? '抱歉，服务未找到' : '服务器异常，请稍后再试';
                        ctx.body =  {code: ctx.status, message: message};
                        ctx.status = 200;
                    } else {
                        if(ctx.status === 404) {
                            await ctx.render('error/404',{
                                title:'404'
                            });
                        } else {
                             await ctx.render('error/error',{
                                 title:'error'
                             });
                        }
                    }
                } else if (this.status === 403) {
                    await ctx.render('error/error',{
                        title:'error'
                    });
                }
            }
        }
    }
}
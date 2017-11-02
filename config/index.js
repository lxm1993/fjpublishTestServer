/**
 * Created by liuxiaomin on 2017/7/20.
 */
let fs = require('fs');
let path = require('path');
let config =  {
    port: 3002,
    encoding: 'utf-8',
    log_id: "lxmwebsite",
    log_name: "lxmwebsite_node.log",
    log_level: "info",//debug, error, info, all, warn, fatal
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let exites = fs.existsSync(path.join(global.BASE_PATH,'../conf/config.json'));
if(exites){
    process.env.NODE_ENV = "production";
    let data = fs.readFileSync(path.join(global.BASE_PATH, '../conf/config.json'),'utf-8');
    config = JSON.parse(data);
}else {
    process.env.NODE_ENV = 'development';
}


module.exports = config;

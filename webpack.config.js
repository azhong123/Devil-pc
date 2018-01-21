/*
* @Author: Admin
* @Date:   2018-01-11 20:49:42
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-21 13:16:23
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置 ，dev(开发环境)  / online(打包环境)
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return{
            template : './src/view/'+ name +'.html',
            filename : 'view/'+ name +'.html',
            title    : title,
            inject   : true,
            hash     : true,
            chunks   : ['common', name]
    };
};

var config = {
    //页面入口文件配置
    entry: {
        'common'              :  ['./src/page/common/index.js'],
        'index'               :  ['./src/page/index/index.js'],
        'user-login'          :  ['./src/page/user-login/index.js'],
        'user-register'       :  ['./src/page/user-register/index.js'],
        'user-pass-reset'     :  ['./src/page/user-pass-reset/index.js'],
        'user-center'         :  ['./src/page/user-center/index.js'],
        'user-center-update'  :  ['./src/page/user-center-update/index.js'],
        'user-pass-update'    :  ['./src/page/user-pass-update/index.js'],
        'result'              :  ['./src/page/result/index.js'],
    },
    //入口文件输出配置
    output: {
        path: './dist',
        //添加publicPaht 是为了更新加载项目文件 因为我项目使用..开始，会找不到具体文件下
        publicPath : '/dist/',
        filename: 'js/[name].js'
    },
    //jquery 引入
    externals :{
        'jquery' : 'window.jQuery'
    },
    module: {
    loaders: [
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader") },
            //图片的loader 限制图片的大小 100 保留文件的名字和后缀，不必改为hash值?limit=100&name=resource/[name].[ext]
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    }, 
    resolve : {
        alias :{
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        //独立通用模块 js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common', 
            filename : 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index' ,'首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login' ,'用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register' ,'用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset' ,'找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center' ,'个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update' ,'修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update' ,'修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/' );
}
module.exports = config;
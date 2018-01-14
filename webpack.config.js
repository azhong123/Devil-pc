/*
* @Author: Admin
* @Date:   2018-01-11 20:49:42
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-14 21:23:13
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置 ，dev(开发环境)  / online(打包环境)
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return{
            template : './src/view/'+ name +'.html',
            filename : 'view/'+ name +'.html',
            inject   : true,
            hash     : true,
            chunks   : ['common', name]
    };
};

var config = {
    //页面入口文件配置
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
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
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
        ]
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/' );
}
module.exports = config;
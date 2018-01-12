/*
* @Author: Admin
* @Date:   2018-01-11 20:49:42
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-11 23:10:36
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
        filename: 'js/[name].js'
    },
    //jquery 引入
    externals :{
        'jquery' : 'window.jQuery'
    },
    module: { 
        loaders: [
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract("style-loader","css-loader")
            },
      ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common', 
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
    ]
};

module.exports = config;
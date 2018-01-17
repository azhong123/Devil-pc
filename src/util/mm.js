/*
* @Author: Admin
* @Date:   2018-01-14 22:17:17
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-15 21:52:48
*/
'use strict'
var Hogan = require('hogan.js'); 
var conf  = {
    serverHost : ''
};
var _mm = {
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method || 'get',
            url         : param.url    || '',
            dataType    : param.data   || 'json',
            data       : param.data    || '',
            success  : function(res){
                //请求成功
                if(0 == res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要强制登录
                else if(10 == res.status){
                    _this.doLogin();
                }
                else if(1 == res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    : function(err){
                typeof param == 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(name){
        //happymmall.com/product/list.do?keyword=xxx&page=1 比如这样获取value值
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml : function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    errorTips : function(msg){
        alert(msg || '哪里不对了！');
    },
    //字段的验证，支持非空，手机，邮箱
    validate : function(value, type){
        var value = $.trim(value);
        //非空验证
        if('require' === type){
            return !!value;
        }
        //手机验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //返回主页
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;
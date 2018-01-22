/*
* @Author: Admin
* @Date:   2018-01-16 21:37:04
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-21 19:07:49
*/
require('./index.css');
var _mm    = require('util/mm.js');
// 通用页面头部
var header    = {
    init : function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        // keyword 存在 ，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮以后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 输入回车后 ，做搜索提交
        $('#search-input').keyup(function(e){
            // 13 是回车键 keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    searchSubmit :function(){
        var keyword = $('#search-input').val();
        if(keyword){
            window.location.href = './list.html?keyword=' +keyword;
        }
        // 如果 keyword 为空 ，直接返回首页
        else{
            _mm.goHome();
        }
    }
};

header.init();
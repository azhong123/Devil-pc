/*
* @Author: Admin
* @Date:   2018-01-16 20:53:16
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-16 21:07:40
*/

var _mm = require('util/mm.js');

var _user = {
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //登出
    logout : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _user;
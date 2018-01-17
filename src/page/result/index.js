/*
* @Author: Admin
* @Date:   2018-01-17 18:46:54
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-17 19:23:35
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type    = _mm.getUrlParam('type') || 'default',
       $element = $('.'+ type +'-success');
    //显示对应的提示元素
    $element.show();
})
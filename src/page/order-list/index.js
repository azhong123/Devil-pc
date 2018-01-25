/*
* @Author: Admin
* @Date:   2018-01-18 22:40:02
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-25 19:58:59
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var Pagination    = require('util/pagination/index.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');

/*page逻辑部分*/
var page = {
    data : {
        listParam : {
            pageNum  : 1,
            pageSize : 10
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        //初始化左侧的菜单
        navSide.init({
            name : 'order-list'
        });
    },
    // 加载订单例表
    loadOrderList : function(){

        var _this         = this,
            orderListHtml = '',
            $listCon      = $('.order-list-con');
         $listCon.html('<div class="loading"></div>');   
        _order.getOrderList(this.data.listParam, function(res){
            // 渲染html
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试！</p>');
        });

    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function(){
    page.init();
});

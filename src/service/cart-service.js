/*
* @Author: Admin
* @Date:   2018-01-16 20:53:16
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-23 20:54:54
*/

var _mm   = require('util/mm.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    getCartList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品
    selectProduct : function(productId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选择购物车商品
    unselectProduct : function(productId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 选择全部购物车商品
    selectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消选择全部商品
    unselectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },// 更新购物数量
    updateProduct : function(productInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteProduct : function(productIds,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    } 
}

module.exports = _cart;
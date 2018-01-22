/*
* @Author: Admin
* @Date:   2018-01-16 20:53:16
* @Last Modified by:   Admin
* @Last Modified time: 2018-01-22 22:11:32
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
    }
}

module.exports = _cart;
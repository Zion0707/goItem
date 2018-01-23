'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
 	const { router, controller } = app;
 	router.get('/',controller.home.index)
 	router.post('/api/hotList', controller.shop.hotList);
 	router.post('/api/goodsDetail', controller.shop.goodsDetail);
 	router.post('/api/addGoods', controller.shop.addGoods);
 	router.post('/api/updateGoods', controller.shop.updateGoods);
 	router.post('/api/delGoods', controller.shop.delGoods);
};

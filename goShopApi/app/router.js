'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
 	const { router, controller } = app;
 	router.post('/api/shopList', controller.shop.shopList);
 	router.post('/api/hotList', controller.shop.hotList);
 	router.post('/api/foodDetail', controller.shop.foodDetail);
};

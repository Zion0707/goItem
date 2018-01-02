'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
 	const { router, controller } = app;
 	router.post('/api/shopList', controller.shopList.shopList);
};

const Controller = require('egg').Controller;
class ShopController extends Controller{
	async shopList(){
		const ctx = this.ctx;
		const result = await ctx.service.shop.shopList();
		ctx.body = result;
	}

	async hotList(){
		const ctx = this.ctx;
		const req = ctx.request.body;
		const result = await ctx.service.shop.hotList(req);
		ctx.body = result;
	}
}
module.exports = ShopController; 
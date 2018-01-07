const Controller = require('egg').Controller;
class ShopController extends Controller{
	async hotList(){
		const ctx = this.ctx;
		const req = ctx.request.body;
		const result = await ctx.service.shop.hotList(req);
		ctx.body = result;
	}

	async foodDetail(){
		const ctx = this.ctx;
		const req = ctx.request.body;
		const result = await ctx.service.shop.foodDetail(req);
		ctx.body = result;
	}
}
module.exports = ShopController; 
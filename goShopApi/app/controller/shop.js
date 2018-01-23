/**
 * 以下api接口请求方式都是 POST , 那么编写方式是 ctx.request.body
 * 如果是 GET , 那么编写方式是 ctx.request.query 
**/ 
const Controller = require('egg').Controller;
class ShopController extends Controller{
	async hotList(){
		const ctx = this.ctx;
		const req = ctx.request.body;
		const result = await ctx.service.shop.hotList(req);
		ctx.body = result;
	}

	async goodsDetail(){
		const ctx = this.ctx;
		const req = ctx.request.body;
		const result = await ctx.service.shop.goodsDetail(req);
		ctx.body = result;
	}

	async addGoods(){
		const ctx = this.ctx;
		const req = ctx.request.body;
		const result = await ctx.service.shop.addGoods(req);
		ctx.body = result;
	}

	async updateGoods(){
		const ctx = this.ctx;
		const req = ctx.request.body;
		const result = await ctx.service.shop.updateGoods(req);
		ctx.body = result;
	}

	async delGoods(){
		const ctx = this.ctx;
		const req = ctx.request.body;
		const result = await ctx.service.shop.delGoods(req);
		ctx.body = result;
	}
}
module.exports = ShopController; 
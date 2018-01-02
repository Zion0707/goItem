const Controller = require('egg').Controller;
class ShopListController extends Controller{
	async shopList(){
		const ctx = this.ctx;
		//从server层拿到list的数据，返回给控制层
		const result = await ctx.service.shopList.shopList();
		ctx.body = result;
	}
}
module.exports = ShopListController; 
const Service = require('egg').Service;
class ShopListServer extends Service{
	//查询列表
	async shopList(){
		const res = await this.app.mysql.query('select * from shopList');
		return { 
			api:'shopList',
			code:0,
			msg:'success',
			list:res
		};
	}
}
module.exports = ShopListServer;
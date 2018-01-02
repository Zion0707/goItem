const Service = require('egg').Service;
class ShopListServer extends Service{
	async shopList(){
		//查所有车的数据
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
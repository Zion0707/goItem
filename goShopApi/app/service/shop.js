const Service = require('egg').Service;
class ShopServer extends Service{
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

	async hotList(req){
		const res = await this.app.mysql.query(`select * from shopList limit 0,${req.pageSize}`);
		return {
			api:'hotList',
			code:0,
			pageSize:req.pageSize,
			msg:'success',
			list:res
		}
	}

}
module.exports = ShopServer;
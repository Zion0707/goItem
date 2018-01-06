const Service = require('egg').Service;
class ShopServer extends Service{
	//查询列表
	async shopList( req ){
		var start = req.pageSize * (req.pageNo-1);
		var end = req.pageSize ;
		const res = await this.app.mysql.query(`select * from shopList limit ${ start },${ end }`);
		const count = await this.app.mysql.query(`select count(*) from shopList`);
		var pageCount= parseInt( new String(count[0]['count(*)'])[0] )
		return { 
			api: 'shopList',
			code: 0,
			pageNo: parseInt( req.pageNo ),
			pageSize: parseInt( req.pageSize ),
			pageCount: pageCount,
			msg: 'success',
			list: res
		};
	}

	async hotList( req ){
		var start = req.pageSize * (req.pageNo-1);
		var end = req.pageSize ;
		const res = await this.app.mysql.query(`select * from shopList limit ${ start },${ end }`);
		const count = await this.app.mysql.query(`select count(*) from shopList`);
		var pageCount= parseInt( new String(count[0]['count(*)'])[0] )
		return {
			api: 'hotList',
			code: 0,
			pageNo: parseInt( req.pageNo ),
			pageSize: parseInt( req.pageSize ),
			pageCount: pageCount,
			msg: 'success',
			list: res
		}
	}

	async foodDetail( req ){
		if ( isNaN( req.id ) ) {
			return {
				api:'foodDetail',
				code:-1,
				msg:'参数不符合要求！'
			}
		}
		const res = await this.app.mysql.query(`select * from shopList where id=${ req.id }`);
		return {
			api:'foodDetail',
			code:0,
			msg:'success',
			list:res[0]
		}
	}

}
module.exports = ShopServer;
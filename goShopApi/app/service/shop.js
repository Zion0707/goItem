const Service = require('egg').Service;
class ShopServer extends Service{

	/*** 热门菜单 api ***/
	async hotList( req ){
		var start = req.pageSize * (req.pageNo-1);
		var end = req.pageSize ;

		var count = await this.app.mysql.query(`select count(*) from shopList`);
		var pageCount= parseInt( new String(count[0]['count(*)'])[0] );

		var resObj = {
			api: 'hotList',
			code: 0,
			name: req.name || '' ,
			pageNo: parseInt( req.pageNo ),
			pageSize: parseInt( req.pageSize ),
			pageCount: pageCount,
			msg: 'success'
		}

		if ( req.name ) {
			const res = await this.app.mysql.query(`select * from shopList where name like "%${ req.name }%" limit ${ start },${ end }`);
			resObj.list = res;
			return resObj;
		}else{
			const res = await this.app.mysql.query(`select * from shopList limit ${ start },${ end }`);

			resObj.list = res;
			return resObj;
		}
		
	}





	/*** 商品详情 api ***/
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
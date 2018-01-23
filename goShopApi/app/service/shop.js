const Service = require('egg').Service;
class ShopServer extends Service{

	/*** 热门菜单 api ***/
	async hotList( req ){
		var start = req.pageSize * (req.pageNo-1);
		var end = req.pageSize ;

		var resObj = {
			api: 'hotList',
			code: 0,
			name: req.name || '' ,
			pageNo: parseInt( req.pageNo ),
			pageSize: parseInt( req.pageSize ),
			msg: 'success'
		}

		if ( req.name ) {
			const res = await this.app.mysql.query(`select sql_calc_found_rows * from shopList where name like "%${ req.name }%" order by id desc limit ${ start },${ end }`);
			const count = await this.app.mysql.query(`select found_rows()`);
			resObj.pageCount = count[0]['found_rows()']
			resObj.list = res;
			return resObj;
		}else{
			const res = await this.app.mysql.query(`select sql_calc_found_rows * from shopList order by id desc limit ${ start },${ end }`);
			const count = await this.app.mysql.query(`select found_rows()`);
			resObj.pageCount = count[0]['found_rows()']
			resObj.list = res;
			return resObj;
		}
		
	}


	/*** 商品详情 api ***/
	async goodsDetail( req ){
		if ( isNaN( req.id ) ) {
			return {
				api:'goodsDetail',
				code:-1,
				msg:'参数不符合要求！'
			}
		}
		const res = await this.app.mysql.query(`select * from shopList where id=${ req.id }`);
		return {
			api:'goodsDetail',
			code:0,
			msg:'success',
			goods:res[0]
		}
	}


	/*** 新增商品 api ***/
	async addGoods( req ){
		const res = await this.app.mysql.query(`insert into shopList(name,money,type,description) values ("${ req.name}",${ req.money },${ req.type },"${ req.description }")`);
		return {
			api:'addGoods',
			code:0,
			msg:'success'
		}
	}


	/*** 更新商品 api ***/
	async updateGoods( req ){
		const res = await this.app.mysql.query(`update shopList set name="${ req.name }",money=${ req.money },type=${ req.type },description="${ req.description }" where id="${ req.id }"`);
		return {
			api:'updateGoods',
			code:0,
			msg:'success'
		}
	}


	/*** 删除商品 api ***/
	async delGoods( req ){
		const res = await this.app.mysql.query(`delete from shopList where id="${ req.id }"`);
		return {
			api:'delGoods',
			code:0,
			msg:'success'
		}
	}

}


module.exports = ShopServer;
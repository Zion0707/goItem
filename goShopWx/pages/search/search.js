//引入外部功能函数
const utils = require('../../utils/util.js');

const app = getApp()
Page({
	data:{

	},
	onLoad(option){
		utils.request('/api/shopList',{},function(data){
			var data = data.data;
			console.log(data)
		})
	}
})
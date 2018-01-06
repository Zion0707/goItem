//引入外部功能函数
const utils = require('../../utils/util.js');

const app = getApp()
Page({
	data:{
		hotList:[]
	},
	onLoad(option){
		var _self = this;
		//全部食物
		utils.request('/api/shopList',{},function(data){
			var data = data.data;
			console.log(data)
		})

		//热门食物
		utils.request('/api/hotList',{
			pageSize:'8'
		},function(data){
			var data = data.data;
			if ( data.code == 0 ) {
				_self.setData({
					'hotList':data.list
				})
			}

		})
	},
	back(){
		wx.navigateBack();
	},
	showDetail(event){
		var data = event.currentTarget.dataset.json;
		wx.navigateTo({
			url:'../detail/detail?data='+data
		});
		
	}
})
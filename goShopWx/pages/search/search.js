//引入外部功能函数
const utils = require('../../utils/util.js');

const app = getApp()
Page({
	data:{
		hotList:[]
	},
	onLoad(option){
		var _self = this;

		//热门食物
		utils.request('/api/hotList',{
			pageNo:'1',
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
		var data = event.currentTarget.dataset.id;
		wx.navigateTo({
			url:'../detail/detail?data='+data
		});
		
	}
})
//引入外部功能函数
const utils = require('../../utils/util.js');

const app = getApp()
Page({
	data:{
		hotList:[]
	},
	onLoad(option){
		wx.setNavigationBarTitle({ title : '搜索商品' });

		var _self = this;
		//热门食物
		utils.request('/api/hotList',{
			pageNo:'1',
			pageSize:'8'
		},function(data){
			var { data } = data;
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
	//显示详情页
	showDetail(event){
		var id = event.currentTarget.dataset.id;
		wx.navigateTo({
			url:'../detail/detail?id='+id
		});
	}
})
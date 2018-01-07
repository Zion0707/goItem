const util = require('../../utils/util.js');
const app = getApp();

Page({
	data:{
		indicatorDots: true,
	    autoplay: false,
	    interval: 5000,
	    duration: 500,
	    imgUrls:[
	    	'../../images/public/food/food_1.jpg',
	    	'../../images/public/food/food_2.jpg',
	    ],

	    detailMsg:{}
	},
	onLoad(option){
		var _self = this;
		var id = option.data;

		//获取详情信息
		wx.showLoading({
			title:'加载中...',
			mask:true,
		});
		util.request('/api/foodDetail',{
			id: id
		},function(data){
			wx.hideLoading();
			
			var data = data.data;
			if ( data.code == 0 ) {
				_self.setData({
					detailMsg: data.list
				})
			}else{
				wx.showModal({
					title : '温馨提交',
					content : data.msg,
					showCancel : false,
					confirmColor:'#ff6700',
					success(){
						wx.navigateBack();
					}
				})
			}
		});

	},
	back(){
		wx.navigateBack();
	},
	onShareAppMessage: function () {
	    return {
	      title: this.detailMsg.name ,
	      path: '/detail/detail?id='+this.detailMsg.id
	    }
	}
})
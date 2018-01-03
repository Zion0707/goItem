const app = getApp()
Page({
	data:{

	},
	onLoad(option){
		//console.log(option)
		wx.request({
			url:'http://127.0.0.1:7001/api/shopList',
			method:'POST',
			success(data){
				console.log(data)
			}
		})

	}
})
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
    },
    //事件处理函数
    bindSearch() {
    	wx.navigateTo({
		  url: '../search/search'
		})
    },
    //初始状态
    onLoad() {

    }
})

//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
    },
    //事件处理函数
    bindSearch() {
    	wx.navigateTo({
		  url: '../search/search?id=1' //实际路径要写全
		})
    },
    //初始状态
    onLoad() {

    }
})

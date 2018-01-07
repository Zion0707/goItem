const util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
    data: {
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 500,
        imgUrls:[
            '../../images/public/banner/youhui1.jpg',
            '../../images/public/banner/youhui1.jpg',
        ],
        webViewUrl:'',
        scrollViewHeight:0,
        hotImg:'../../images/public/food/food_1.jpg',
        hotList:[],
    },
    //事件处理函数
    bindSearch() {
    	wx.navigateTo({
		  url: '../search/search'
		})
    },
    //webView (个人类型与海外类型的小程序暂不支持使用) 配置范例：http://blog.csdn.net/towtotow/article/details/78527273?fps=1&locationNum=7
    openWebView(){
        this.setData({
            webViewUrl:'https://m.mi.com/'
        })
        if ( this.webViewUrl ) {
            wx.miniProgram.navigateTo({
                url:'../index/index'
            })
        }
    },  
    showDetail(event){
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url : '../detail/detail?id='+ id
        })
    },

    //初始状态
    onLoad() {
        var _self = this;
        //获取系统信息
        wx.getSystemInfo({
            success(data){
                var { windowWidth , windowHeight } = data;
                _self.setData({
                    scrollViewHeight : windowHeight - 45
                })
            }
        });

        //列表数据
        util.request('/api/hotList',{
            pageNo:1,
            pageSize:1000
        },function(data){
            var { data } = data;
            if ( data.code == 0 ) {
                _self.setData({
                    hotList : data.list
                })
            }else{
                wx.showModal({
                    title : '提示',
                    content: data.msg,
                    showCancel : false
                })
            }
        })

    }
})

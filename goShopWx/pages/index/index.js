const util = require('../../util/util.js');
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
        pageNo:1,
        pageSize:6,  
        notMore:false,
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

    //列表数据
    getDataList(pageNo , pageSize ){
        var _self = this;
        //如果没有更多就不再请求了
        if ( !_self.data.notMore ) {
            wx.showLoading();
            util.request('/api/hotList',{
                pageNo: pageNo ,
                pageSize: pageSize
            },function(data){
                wx.hideLoading();
                var { data } = data;
                if ( data.code == 0 ) {
                    if ( data.list.length ) {
                        var newArr = _self.data.hotList.concat(data.list);
                        _self.setData({
                            hotList : newArr
                        });
                    }else{
                        _self.setData({
                            notMore : true
                        })
                    }
                }else{
                    wx.showModal({
                        title : '提示',
                        content: data.msg,
                        showCancel : false
                    })
                }
            })
        }
    },

    lower: function(e) {
        var { data } = this;
        this.getDataList( ++data.pageNo , data.pageSize );
    },

    //初始状态
    onLoad:function() {
        var _self = this;
        var { data } = this;

        //获取系统信息
        wx.getSystemInfo({
            success(data){
                var { windowWidth , windowHeight } = data;
                _self.setData({
                    scrollViewHeight : windowHeight - 45
                })
            }
        });

        this.getDataList( data.pageNo , data.pageSize );

    },
})

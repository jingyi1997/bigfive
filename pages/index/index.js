var api = require('../../utils/ajax.js')
//获取应用实例
const app = getApp()

Page({

  data: {
    imgUrl: "../../img/logo.png",
    testItems:[
      {
        id: "1",
        url: "../../img/logo.png",
        title: "五大性格量表测试"
      },
      {
        id: "2",
        url: "../../img/logo.png",
        title: "抑郁测试"
      },
      {
        id: "3",
        url: "../../img/logo.png",
        title: "孤独测试"
      },
      {
        id: "4",
        url: "../../img/logo.png",
        title: "幸福测试"
      }
         
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    
    
  },
  
  onLoad: function (options) {
    
    
    
    
  },
  //点击图片测试
  click_test: function (e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../test_page/test_page?testid=' + e.currentTarget.dataset.id 
      //url: '../testRes/testRes'
    })
  },
  getUserInfo: function (res) {
    if (app.globalData.hasUserInfo)
    {
      wx.showModal({
        title: '您已授权',
        content: '已获取到您的头像昵称',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#72B9C3',
      })
    }
    else{      
      var userInfo = res.detail.userInfo
      if(userInfo!=null){
        console.log(userInfo)
        app.globalData.nickName = userInfo.nickName
        app.globalData.imageUrl = userInfo.avatarUrl
        app.globalData.hasUserInfo = true
        console.log(app.globalData.nickName)
        console.log(app.globalData.imageUrl)
        wx.showModal({
          title: '授权成功',
          content: '已获取到您的头像昵称',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#72B9C3',
        })
      }
      else{
        wx.showModal({
          title: '授权失败',
          content: '未获取到您的头像昵称',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#72B9C3',
        })
      }
    }
  },
  
   
  
  onShow: function () {
    
  },
  
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bigfive:0,
    happy: 0,
    depression: 0,
    lonely: 0,
    load_done:false,
    hasRecord:false,
    image:null

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    
  },
  onShow:function()
  {
    var that = this
    wx.request({

      url: 'https://psychstat.cn/bigfive/queryRec.php',
      data: {
        user_id: app.globalData.open_id,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        console.log(res.data); //获取openid 

        if (res.data['hasRecord']) {

          that.setData({

            load_done: true,
            //percentage: res.data['percentage'],
            bigfive: res.data['bigfive'],
            happy: res.data['happy'],
            lonely: res.data['lonely'],
            depression: res.data['depression'],
            hasRecord: true,
          });
        }
        else {
          that.setData({
            load_done: true,
            hasRecord: false,
          });
        }
        //console.log(that.data.imageWidth);


      }
    })
    that.setData({
      image: app.globalData.imageUrl,
      
    });
    console.log(app.globalData.imageUrl);
  },
  bigfive: function () {
    wx.navigateTo({
      url: '../myInfo/myInfo'
    })
  },
  dep: function () {
    wx.navigateTo({
      url: '../showRes2/showRes2'
    })
  },
  lonely: function () {
    wx.navigateTo({
      url: '../showRes3/showRes3'
    })
  },
  happy: function () {
    wx.navigateTo({
      url: '../showRes4/showRes4'
    })
  }



})

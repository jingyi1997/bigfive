//index.js
//获取应用实例
var Charts = require('../../utils/wxcharts.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',


    answer: {},
    name: null,
    per: 0,
    score: 0,
    hiddenLoading: false,
    hasRecord: false,
    imageWidth: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this
    if (options.other_id != null) {
      console.log(options.other_id);
      app.globalData.other_id = options.other_id;
      console.log(app.globalData.other_id);
    }
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
        that.setData({
          imageWidth: res.windowWidth
        });
        console.log(that.data.imageWidth)
      }
    })

  },
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://psychstat.cn/bigfive/queryHappy.php',
      data: {
        user_id: app.globalData.other_id,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          hiddenLoading: true,
        });
        if (res.data.hasRecord) {

          that.setData({
            hasRecord: true,
            name: res.data.name,
            score: res.data.score,
            per: res.data.per,
          });
        }
      }
    });
  },


  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: false,
      hasRecord: false,
    })
  },





})

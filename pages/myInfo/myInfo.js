//index.js
//获取应用实例
var Charts = require('../../utils/wxcharts.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    
    image:null,
    answer: {},
    index:[12,12,12,12,12],
    myid:12,
    hiddenLoading:false,
    hasRecord:false,
    imageWidth:null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
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
  onShow:function(){
    var that = this
    wx.request({
      url: 'https://psychstat.cn/bigfive/test.php',
      data: {
        user_id: app.globalData.open_id,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          hiddenLoading: true,
        });
        if (res.data.hasRecord) {

          that.setData({
            hasRecord: true,
            index: res.data.my_index
          });
          console.log(that.data.index)

          let chart = new Charts({
            //TODO:设置饼状图相似度
            canvasId: 'radarRecords',
            type: 'radar',
            categories: ['外向性', '责任心', '想象力', '亲合力', '神经质'],
            series: [{
              name: '我自己',
              data: that.data.index
              //data: [5,4,3,2,1]
            }
            ],
            width: that.data.imageWidth,
            height: 290,
            extra: {
              radar: {
                max: 20
              }
            }
          });
        }
      }
    });
    that.setData({
      image:app.globalData.imageUrl
    })

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

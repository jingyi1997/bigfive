var api = require('../../utils/ajax.js')
var Charts = require('../../utils/wxcharts.js')
var api2 = require('../../utils/corr.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: [
      '21', '4', '1', '3', '1',
      '3', '3', '3', '4', '1', '2', '21', 'xjy'
    ],
    level: null,
    res: 0,
    score:0,
    imageWidth: null,
    load_done: false,
    percentage: 0.8,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.answerList)
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
    this.setData({
      answer: app.globalData.answerList,

    });
    //console.log(typeof Number(this.data.answer[1]))
    console.log(app.globalData.open_id);
    //TODO：存入数据库
    wx.request({
      url: 'https://psychstat.cn/bigfive/storeDep.php',
      data: {
        res: this.data.answer,
        answer_time: app.globalData.answerTime,
        user_id: app.globalData.open_id,
        other_id: app.globalData.other_id,
        

      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        console.log(res.data); //获取openid  

        that.setData({
          
          load_done: true,
          //percentage: res.data['percentage'],
          percentage: res.data['per'],
          score:res.data['score']
        });
        console.log(that.data.imageWidth);


      }
    })
    // 一轮测试完，清空答案列表
    app.globalData.answerList = {};
  },
  //分享给好友
  clickbtn: function () {


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '抑郁测试',
      path: '/pages/shareRes2/shareRes2?other_id=' + app.globalData.open_id 
    }
  }
})
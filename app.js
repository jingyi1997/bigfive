//app.js
const app = getApp()
App({
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res_user) {
        if (res_user.code) {
          //发起网络请求
          wx.request({
            url: 'https://psychstat.cn/bigfive/getOpenID.php',
            data: {
              code: res_user.code,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.openid) //获取openid  
              getApp().globalData.open_id = res.data.openid
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
      
    });
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              that.globalData.nickName = res.userInfo.nickName
              that.globalData.imageUrl = res.userInfo.avatarUrl
              that.globalData.hasUserInfo = true
              console.log(that.globalData.nickName)
              console.log(that.globalData.imageUrl)
            }
          })
        }
      }
    })
  },   
  
  globalData: {
  
    answerList: {},
    answerTime: {},
    open_id:'1234',
    other_id:'5678',
    nickName:null,
    imageUrl: null,
    hasUserInfo:false
  }
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    testInfo: [
      {
        id: "testInfo1",
        title: "五大性格量表测试",
        desc: "五大性格特质，又称大五性格模型或五因素模型，是现代心理学中描述最高级组织层次的五个方面的人格特质。这五大人格特质构成了人的主要性格。本测试共包含26道题目，完成需要5分钟左右时间。测试结果包括对您性格特点和适合职业的分析。如果您分析您的测试结果和您的朋友，他们就可以测试和你性格的默契程度。",
        url: '../mainTest/mainTest',
        url_intro: '../article/article'
      },
      {
        id: "testInfo2",
        title: "抑郁测试",
        desc: "这项测试总共有13道题目，完成大约需要2-3分钟，您可以测试您的抑郁程度，并且可以将测试结果分享给您的朋友。",
        url: '../mainTest2/mainTest2',
        url_intro: '../article/article'
      },
      {
        id: "testInfo3",
        title: "孤独测试",
        desc: "这项测试总共有14道题目，完成大约需要2-3分钟。您可以测试您的孤独程度，并且可以将测试结果分享给您的朋友。",
        url: '../mainTest3/mainTest3',
        url_intro: '../article/article'
      },
      {
        id: "testInfo1",
        title: "幸福测试",
        desc: "这项测试总共有8道题目，完成大约需要2-3分钟。您可以测试您的幸福程度，并且可以将测试结果分享给您的朋友。",
        url: '../mainTest4/mainTest4',
        url_intro: '../article/article'
      }
    ],
    testid:"0",
    test_title:"",
    test_desc:"",
    test_url:"",
    test_url_intro:""
  },
  onLoad: function (options) {
    if (options.other_id != null) {
      console.log(options.other_id);
      app.globalData.other_id = options.other_id;
      console.log(app.globalData.other_id);
    }
    if (options.testid == null)
    {
      this.setData({
        testid: 0
      })
    }
    else{
      this.setData({
        testid: options.testid - 1
      })
    }
    
    this.setData({
      
      test_title: this.data.testInfo[this.data.testid].title,
      test_desc: this.data.testInfo[this.data.testid].desc,
      test_url: this.data.testInfo[this.data.testid].url,
      test_url_intro: this.data.testInfo[this.data.testid].url_intro,
    });

  
    
  },
  onShow:function(options)
  {
    

  },
  
  getUserInfo: function (res) {
    if (!app.globalData.hasUserInfo)
    {
      var userInfo = res.detail.userInfo
      if (userInfo != null) {
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
    }
    wx.redirectTo({
      url: this.data.test_url
    })
  },
  clickbtn_intro: function () {
    wx.navigateTo({
      url: this.data.test_url_intro
    })
  }



})

//获取题目实例
var api = require('../../utils/ajax.js')
var api = require('../../utils/timestamp.js')
const app = getApp()

Page({
  data: {
    jsonPage: 1,
    questionId: null,
    val: "",
    name:null,
    start_time: 0,
    testitems: [
      {
        id: "0",
        ques: "您的微信好友数量"
      },
      {
        id: "1",
        ques: "总体上，我认为自己"
      },
      {
        id: "2",
        ques: "和我大多数同龄人相比，我认为自己"
      },
      {
        id: "3",
        ques: "下面这句话是否能描述你：我总是非常快乐。无论发生什么事情，我总能继续享受生活"
      },
      {
        id: "4",
        ques: "下面这句话是否能描述你：有的人不是很快乐，尽管他们并不抑郁，他们看起来也比实际上更不开心"
      },
      
      {
        id: "5",
        ques: "您的性别"
      },
      {
        id: "6",
        ques: "您的年龄"
      },
      {
        id: "7",
        ques: "您的名字或昵称"
      },

    ],
    current_question: 0,
    jsonData: {
    },
    aa: false,
    progress: 10 / 8,
    can_click: true,
    ansitems: [
      {
        ans: "2",
        value: "2"
      },
      {
        ans: "3",
        value: "3"
      },
      {
        ans: "4",
        value: "4"
      },
      {
        ans: "5",
        value: "5"
      },
      {
        ans: "6",
        value: "6"
      },
      
    ],
    headitems:[
      {
        head:"1 不是一个非常快乐的人",
        last:"7 是一个非常快乐的人"
      },
      {
        head: "1 更不快乐",
        last: "7 更快乐"
      },
      {
        head: "1 完全能够",
        last: "7 完全不能够"
      },
      {
        head: "1 完全能够",
        last: "7 完全不能够"
      },
    ],
    sexansitems: [
      {
        ans: "男",
        value: "1"
      },
      {
        ans: "女",
        value: "2"
      },
      {
        ans: "不想说",
        value: "3"
      },

    ],
    ageval: "0",
    agearray: [
      '5', '6', '7'
    ]
  },
  onLoad: function () {
    var temp = new Array();
    for (var i = 0; i < 90; i++) {
      temp[i] = (i + 5).toString();
    }
    this.setData(
      {
        agearray: temp,
        start_time: parseInt(Date.now()),
        name:app.globalData.nickName
      });

  },
  ageInput: function (e) {
    this.setData({
      ageval: e.detail.value,
      val: this.data.agearray[e.detail.value]
    });
    var temp = this.data.val;
  },
  userInput: function (e) {

    this.setData({
      val: e.detail.value
    });
  },
  userclickbtn: function (e) {
    var that = this;
    app.globalData.answerTime[that.data.current_question] = Date.now() - that.data.start_time;
    //console.log(app.globalData.answerTime[that.data.questionId]);
    if (that.data.can_click) {
      if (this.data.val.length == 0) {
        wx.showModal({
          title: '提示',
          content: '输入不能为空',
          showCancel: false,

        })
      }
      else {
        if ((e.target.dataset.id == that.data.testitems[that.data.testitems.length - 1].id - 1) && that.data.name != null) {
          that.setData({
            current_question: ++that.data.current_question,
            questionId: e.target.dataset.id,
          })
          console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
          app.globalData.answerList[that.data.questionId] = that.data.val;

          app.globalData.answerList['7'] = that.data.name;
          app.globalData.answerTime[that.data.current_question] = 0;

          console.log(app.globalData.answerTime);

          var res = app.globalData.answerList;
          console.log(res);
          wx.redirectTo({
            url: "../testRes4/testRes4"//结果页面中要再存入数据库
          })
        }
        if (e.target.dataset.id == that.data.testitems[that.data.testitems.length - 1].id) {
          that.setData({
            current_question: ++that.data.current_question,
            questionId: e.target.dataset.id,
          })
          console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
          app.globalData.answerList[that.data.questionId] = that.data.val;
          console.log(app.globalData.answerTime);
          var res = app.globalData.answerList;
          wx.redirectTo({
            url: "../testRes4/testRes4"//结果页面中要再存入数据库
          })
        } else {
          that.setData({
            current_question: ++that.data.current_question,
            questionId: e.target.dataset.id,
            start_time: Date.now(),
            aa: false,

            progress: that.data.progress + 100 / 8
          })

          console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
          app.globalData.answerList[that.data.questionId] = that.data.val;

          that.data.val = "";
        }
      }
      setTimeout(function () { that.data.can_click = true }, 200);
    }
  },
  checkboxChange: function (e) {
    var that = this;
    app.globalData.answerTime[that.data.current_question] = parseInt(Date.now()) - that.data.start_time;
    //console.log(app.globalData.answerTime[that.data.questionId]);
    if (that.data.can_click) {
      that.data.can_click = false;
      // that.data.testitems.length - 1      
      that.setData({
        current_question: ++that.data.current_question, val: e.detail.value, questionId: e.target.dataset.id, aa: false, progress: that.data.progress + 100 / 8,
        start_time: Date.now()
      })
      console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
      app.globalData.answerList[that.data.questionId] = that.data.val;
      if (that.data.questionId !== "5") {
        that.data.val = "";
      }
      else {
        that.data.val = "5";
      }
      setTimeout(function () {
        that.setData({
          aa: false,
          can_click: true,
        })
      }, 200);
    }
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
  }
});


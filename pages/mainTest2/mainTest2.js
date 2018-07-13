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
        ques: "做事时提不起劲或没有兴趣"
      },
      {
        id: "2",
        ques: "感到心情低落、沮丧或绝望"
      },
      {
        id: "3",
        ques: "入睡困难、睡不安或睡眠过多"
      },
      {
        id: "4",
        ques: "感觉疲倦或没有活力"
      },
      {
        id: "5",
        ques: "食欲不振或吃太多"
      },
      {
        id: "6",
        ques: "觉得自己很糟或觉得自己很失败，或让自己、家人失望"
      },
      {
        id: "7",
        ques: "对专注于做某件事情有困难，例如阅读报纸或看电视时"
      },
      {
        id: "8",
        ques: "行动或说话速度变得缓慢(或变得烦躁、坐立不安、动来动去等)"
      },
      {
        id: "9",
        ques: "有不如死掉或用某种方式伤害自己的念头"
      },
      {
        id: "10",
        ques: "您的性别"
      },
      {
        id: "11",
        ques: "您的年龄"
      },
      {
        id: "12",
        ques: "您的姓名或昵称"
      },

    ],
    current_question: 0,
    arr: [
      "A", "B", "C", "D"
    ],
    jsonData: {
    },
    aa: false,
    progress: 100 / 13,
    can_click: true,
    ansitems: [
      {
        ans: "完全没有",
        value: "0"
      },
      {
        ans: "有几天",
        value: "1"
      },
      {
        ans: "一半以上天数",
        value: "2"
      },
      {
        ans: "几乎每天",
        value: "3"
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

          app.globalData.answerList['12'] = that.data.name;
          app.globalData.answerTime[that.data.current_question] = 0;

          console.log(app.globalData.answerTime);

          var res = app.globalData.answerList;
          console.log(res);
          wx.redirectTo({
            url: "../testRes2/testRes2"//结果页面中要再存入数据库
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
            url: "../testRes2/testRes2"//结果页面中要再存入数据库
          })
        } else {
          that.setData({
            current_question: ++that.data.current_question,
            questionId: e.target.dataset.id,
            start_time: Date.now(),
            aa: false,

            progress: that.data.progress + 100 / 13
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
        current_question: ++that.data.current_question, val: e.detail.value, questionId: e.target.dataset.id, aa: false, progress: that.data.progress + 100 / 13,
        start_time: Date.now()
      })
      console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
      app.globalData.answerList[that.data.questionId] = that.data.val;
      if (that.data.questionId !== "10") {
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


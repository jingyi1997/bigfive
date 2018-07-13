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
        ques: "你独自做事会感到很不开心吗？"
      },
      {
        id: "2",
        ques: "你会感到无人可以倾诉吗？"
      },
      {
        id: "3",
        ques: "你会感到自己无法忍受如此孤独吗？"
      },
      {
        id: "4",
        ques: "你会感到没有人真的理解你吗？"
      },
      {
        id: "5",
        ques: "你会渴望别人联系你吗（如打电话或发短信）？"
      },
      {
        id: "6",
        ques: "你会感到孤独吗？"
      },
      {
        id: "7",
        ques: "你会感到难于主动与周围人交流吗？"
      },
      {
        id: "8",
        ques: "你会渴望有人陪伴吗？"
      },
      {
        id: "9",
        ques: "你会感到很难交朋友吗？"
      },
      {
        id: "10",
        ques: "你会感到被人孤立吗？"
      },
      {
        id: "11",
        ques: "您的性别"
      },
      {
        id: "12",
        ques: "您的年龄"
      },
      {
        id: "13",
        ques: "您的名字首字母"
      },

    ],
    current_question: 0,
    arr: [
      "A", "B", "C", "D"
    ],
    jsonData: {
    },
    aa: false,
    progress: 100 / 14,
    can_click: true,
    ansitems: [
      {
        ans: "从不",
        value: "0"
      },
      {
        ans: "很少",
        value: "1"
      },
      {
        ans: "有时",
        value: "2"
      },
      {
        ans: "经常",
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

          app.globalData.answerList['13'] = that.data.name;
          app.globalData.answerTime[that.data.current_question] = 0;

          console.log(app.globalData.answerTime);

          var res = app.globalData.answerList;
          console.log(res);
          wx.redirectTo({
            url: "../testRes3/testRes3"//结果页面中要再存入数据库
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
            url: "../testRes3/testRes3"//结果页面中要再存入数据库
          })
        } else {
          that.setData({
            current_question: ++that.data.current_question,
            questionId: e.target.dataset.id,
            start_time: Date.now(),
            aa: false,

            progress: that.data.progress + 100 / 14
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
      if (that.data.questionId !== "11") {
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


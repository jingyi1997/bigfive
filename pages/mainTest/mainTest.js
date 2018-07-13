//获取题目实例
var api = require('../../utils/ajax.js')
var api = require('../../utils/timestamp.js')
const app = getApp()

Page({
  data: {
    jsonPage:1,
    questionId:null,
    val:"",
    name:null,
    start_time:0,
    testitems:[
      {
        id:"0",
        ques: "您的微信好友数量"
      },
      {
        id:"1",
        ques:"我话不多"
      }, 
      {
        id: "2",
        ques:"我常常忘记把东西放回原处"
      }, 
      {
        id: "3",
        ques:"我很难理解抽象的概念"
      }, 
      {
        id: "4",
        ques:"我对别人遇到的麻烦或者困难不感兴趣"
      }, 
      {
        id: "5",
        ques:"我容易心烦" 
      },
      {
        id: "6",
        ques:"我躲在人群背后，不喜欢引人注目"
      }, 
      {
        id: "7",
        ques:"我平常的事马上就处理，不拖延"
      }, 
      {
        id: "8",
        ques:"我想象力不丰富"
      }, 
      {
        id: "9",
        ques:"我对其他人不怎么感兴趣"
      }, 
      {
        id: "10",
        ques:"我常常会情绪起伏不定"
      }, 
      {
        id: "11",
        ques:"我在聚会上和很多不同的人聊天"
      }, 
      {
        id: "12",
        ques:"我喜欢有条理"
      }, 
      {
        id: "13",
        ques:"我对抽象的概念不感兴趣"
      }, 
      {
        id: "14",
        ques:"我能体会他人的感受"
      }, 
      {
        id: "15",
        ques:"我大部分时间很放松"
      }, 
      {
        id: "16",
        ques:"我善于在聚会上调动气氛"
      }, 
      {
        id: "17",
        ques:"我常把事情搞得一团糟"
      }, 
      {
        id: "18",
        ques:"我有很好的想象力"
      }, 
      {
        id: "19",
        ques:"我能感受到他人的情绪变化"
      }, 
      {
        id: "20",
        ques:"我很少感到忧郁"
      },
      {
        id: "21",
        ques: "您对喝酒的态度"
      },
      {
        id: "22",
        ques: "您对吸烟的态度"
      },
      {
        id: "23",
        ques: "您的性别"
      },
      {
        id: "24",
        ques: "您有英文名字吗"
      },
      {
        id: "25",
        ques:"您的中文名字（姓 + 名）有几个字？"
      },
      {
        id: "26",
        ques: "您的年龄"
      }, 
      {
        id: "27",
        ques: "您的名字或昵称"
      },

    ],
    current_question:0,
    arr:[
      "A","B","C","D","E"
    ],
    jsonData:{
    },
    aa:false,
    progress:100/26,
    can_click:true,
    ansitems:[
      {
        ans:"非常反对",
        value :"1"
      },
      {
        ans: "反对",
        value : "2"
      },
      {
        ans: "既不反对也不同意",
        value: "3"
      },
      {
        ans: "同意",
        value: "4"
      },
      {
        ans: "非常同意",
        value : "5"
      }

    ],
    ansitems2: [
      {
        ans: "非常反对",
        value: "1"
      },
      {
        ans: "反对",
        value: "2"
      },
      {
        ans: "无所谓",
        value: "3"
      },
      {
        ans: "支持",
        value: "4"
      },
      {
        ans: "非常支持",
        value: "5"
      }

    ],
    sexansitems:[
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
    engansitems: [
      {
        ans: "有",
        value: "1"
      },
      {
        ans: "没有",
        value: "2"
      },
      {
        ans: "不想说",
        value: "3"
      },

    ],
    numansitems: [
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
        ans: "更多字",
        value: "6"
      }, 

    ],
    ageval:"0",
    agearray:[
      '5','6','7'
    ]
  },
  

 
  onLoad: function () {
    var temp=new Array();
    for(var i=0;i<90;i++)
    {
      temp[i]=(i+5).toString();
    }
    this.setData(
    {
      agearray:temp,
      start_time: parseInt(Date.now()),
      name:app.globalData.nickName
    });
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting["scope.userInfo"]==null) {
          console.log("res4")
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  onShow:function (){
    
  },
  ageInput:function(e) {
    this.setData({
      ageval: e.detail.value,
      val: this.data.agearray[e.detail.value]
    });
    var temp = this.data.val;
  },
  userInput:function(e) {
  
    this.setData({
      val: e.detail.value
    });
  },
  userclickbtn: function(e) {
    var that=this;
    app.globalData.answerTime[that.data.current_question] = Date.now()- that.data.start_time;
    //console.log(app.globalData.answerTime[that.data.questionId]);
    if(that.data.can_click)
    {
      if (this.data.val.length == 0) {
        wx.showModal({
          title: '提示',
          content: '输入不能为空',
          showCancel:false,
    
        })
      }
      else{
        if((e.target.dataset.id == that.data.testitems[that.data.testitems.length - 1].id - 1) &&that.data.name != null)
        {
          that.setData({
            current_question: ++that.data.current_question,
            questionId: e.target.dataset.id,
          })
          console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
          app.globalData.answerList[that.data.questionId] = that.data.val;

          app.globalData.answerList['27'] = that.data.name;
          app.globalData.answerTime[that.data.current_question] = 0;
          
          console.log(app.globalData.answerTime);

          var res = app.globalData.answerList;
          console.log(res);
          wx.redirectTo({
            url: "../testRes/testRes"//结果页面中要再存入数据库
          })
        }
        if (e.target.dataset.id == that.data.testitems[that.data.testitems.length - 1].id) 
        {
          that.setData({
            current_question: ++that.data.current_question,
            questionId: e.target.dataset.id,
          })
          console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
          app.globalData.answerList[that.data.questionId] = that.data.val;
          
          console.log(app.globalData.answerTime); 
          
          var res = app.globalData.answerList;
          wx.redirectTo({
            url: "../testRes/testRes"//结果页面中要再存入数据库
          })
        }else{
          that.setData({ current_question: ++that.data.current_question, 
          questionId: e.target.dataset.id, 
          start_time: Date.now(),
          aa: false, 
          
          progress: that.data.progress + 100 / 26 })
          
          console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
          app.globalData.answerList[that.data.questionId] = that.data.val;
          
          that.data.val = "";
            
        }
      }
      setTimeout(function () { that.data.can_click = true }, 200); 
    }
  },
  checkboxChange: function (e) {
    var that=this;
    
    app.globalData.answerTime[that.data.current_question] = parseInt(Date.now()) - that.data.start_time;
    //console.log(app.globalData.answerTime[that.data.questionId]);
    if(that.data.can_click)
    {
      that.data.can_click=false;
      // that.data.testitems.length - 1      
      that.setData({ current_question: ++that.data.current_question, val: e.detail.value, questionId: e.target.dataset.id, aa: false, progress: that.data.progress + 100/26,
      start_time : Date.now()
      })
      console.log("题号：" + that.data.questionId + "---答案：" + that.data.val)
      app.globalData.answerList[that.data.questionId] = that.data.val; 
      
      if (that.data.questionId !== "25") {
        that.data.val = "";
      } 
      else{
        that.data.val = "5";
      }  
      setTimeout(function () {
        that.setData({
          aa:false,
          can_click:true,
        })
      }, 400);  
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


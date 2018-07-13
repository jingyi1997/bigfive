
var api = require('../../utils/ajax.js')
var Charts = require('../../utils/wxcharts.js')
var api2 = require('../../utils/corr.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_image: false,
    level: null,
    res: 0,
    simi: 20,
    imageWidth: null,
    imageHeight: null,
    other_index: [12, 12, 12, 12, 12],
    my_index: [12, 12, 12, 12, 12],
    other_name: "吃瓜群众",
    load_done: false,
    shareImgPath: null,
    scale: 1.6,
    lastid:null,
    percentage: [0.5, 0.5, 0.5, 0.5, 0.5],
    test: ["外向性", "责任心", "想象力", "亲和力", "神经质"],
    qrcode_temp: null,
    radar_temp: null,
    share_temp: null,
    ans_des: [
      {
        desc1: "是一个热情且健谈的人，你喜欢与人交流合作，乐观且具有冒险精神。", desc2: "适合的职业有：高级经理，销售人员，广告和市场管理人员， 理财顾问，牙医等等。这些职业最近的收入和增长趋势如下（数据来自美国劳工统计局）。",

        pos: [
          {
            pos_name: "高级经理",
            income: "$103, 950",
            incr: "8%",
          },
          {
            pos_name: "理财顾问",
            income: "$90,530",
            incr: "14%",
          },
          {
            pos_name: "销售人员",
            income: "$117,960",
            incr: "7%",
          },
          {
            pos_name: "广告和市场管理人员",
            income: "$127,560",
            incr: "9%",
          },
          {
            pos_name: "牙医",
            income: "$159,770",
            incr: "17%",
          }
        ]

      },
      {
        desc1: "是一个尽职尽责的人，在工作和生活上，有条理性，且有较强的自制力。", desc2: "适合的职业有：活动策划人员，律师，公务员，销售经理，行政总裁等等。这些职业最近的收入和增长趋势如下（数据来自美国劳工统计局）。",

        pos: [
          {
            pos_name: "行政总裁",
            income: "$103, 950",
            incr: "8%",
          },
          {
            pos_name: "销售经理",
            income: "$117,960",
            incr: "14%",
          },
          {
            pos_name: "活动策划人员",
            income: "$47,350",
            incr: "7%",
          },
          {
            pos_name: "律师",
            income: "$118,160",
            incr: "9%",
          }
        ]

      },
      {
        desc1: "乐于接受新事物，好奇心让你对世界敞开心扉，充沛的创造力使你在生活中可以看到各种各样的可能性。", desc2: "适合的职业有：演员，导演，艺术家，广告从业者，人类学家和史学家等等。",
        pos: [
          {
            pos_name: "广告从业者",
            income: "$100,810",
            incr: "6%",
          },
          {
            pos_name: "人类学家和史学家",
            income: "$63,190",
            incr: "3%",
          },
          {
            pos_name: "演员",
            income: "	$18.70 (时薪)",
            incr: "12%",
          },
          {
            pos_name: "导演",
            income: "$89,820",
            incr: "7%",
          },
          {
            pos_name: "艺术家",
            income: "$50, 790",
            incr: "9%",
          }
        ]

      },
      {
        desc1: "是一个热心肠、有同理心的人，助人为乐是你的天性。无论是生活中，还是工作中，你都可以与他人保持和睦相处。各行各业都可能需要有亲和力的人。",
        desc2: " 适合的职业有：护理人员，人力资源管理人员，健康咨询师，基础教育从业者等等。",

        pos: [
          {
            pos_name: "护理人员",
            income: "$68,450",
            incr: "15%",
          },
          {
            pos_name: "健康咨询师",
            income: "$42,840",
            incr: "20%",
          },
          {
            pos_name: "酒店经理",
            income: "$51,840",
            incr: "6%",
          },
          {
            pos_name: "人力资源管理人员	",
            income: "$59,180",
            incr: "7%",
          },
          {
            pos_name: "基础教育从业者",
            income: "$55,800",
            incr: "7%",
          }
        ]

      },
      {
        desc1: "善于自我批评，自我意识较强，对外界有极强的感知力和敏感度。", desc2: "适合的职业有：营养学家，作家，图像设计师，图书管理员等等。",

        pos: [
          {
            pos_name: "图书管理员",
            income: "	$57,680",
            incr: "9%",
          },
          {
            pos_name: "作家",
            income: "$61,240",
            incr: "8%",
          },
          {
            pos_name: "营养学家",
            income: "$62,920",
            incr: "7%",
          },
          {
            pos_name: "图像设计师",
            income: "$47,640",
            incr: "5%",
          }
        ]

      }


    ],
    max_index: 0
  },
  draw_radar: function () {
    var that = this
    let chart = new Charts({
      //TODO:设置饼状图相似度
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['外向性', '责任心', '想象力', '亲合力', '神经质'],
      series: [
      {
        name: that.data.other_name,
        data: that.data.other_index
      },
      {
        name: that.data.last_name,
        data: that.data.last_index
      },
      ],
      width: that.data.imageWidth,
      height: 290,
      extra: {
        radar: {
          max: 20
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.answerList)
    var that = this
    if (options.other_id != null) {
      console.log(options.other_id);
      app.globalData.other_id = options.other_id;
      console.log(app.globalData.other_id);
    }
    if (options.lastid != null) {
      that.data.lastid = options.lastid;
    }
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
        that.setData({
          imageWidth: res.windowWidth,
          imageHeight: res.windowHeight
        });
        console.log(that.data.imageWidth)
      }
    })
    //console.log(typeof Number(this.data.answer[1]))
    wx.request({
      url: 'https://psychstat.cn/bigfive/queryBigfive.php',
      data: {
        other_id: app.globalData.other_id,
        lastid:that.data.lastid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      success: function (res) {

        console.log(res.data); //获取openid  

        that.setData({
          other_index: res.data['other_index'],
          other_name: res.data['other_name'],
          last_index: res.data['last_index'],
          last_name: res.data['last_name'],
          simi: res.data['simi'],
          load_done: true,
          //percentage: res.data['percentage'],
          percentage: res.data['per'],
          max_index: res.data['max_index'],
        });
        console.log(that.data.imageWidth);
        that.draw_radar();

      },
      fail: function (res) {
        wx.showModal({
          title: '失败',
          content: res.errMsg,
        })
      }

    })
    // 一轮测试完，清空答案列表
    app.globalData.answerList = {};
  },
  testSimi:function() {
    wx.redirectTo({
      url: "/pages/test_page/test_page?testid=1"
    })
  },
  //分享给好友
  backtoResult: function () {
    this.setData({
      share_image: false
    })
    this.draw_radar();
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
  clickbtn: function () {
    return {
      title: '专业的五大性格量表测试',
      path: '/pages/test_page/test_page?other_id=' + app.globalData.open_id + '&testid=1'
    }
  },

})
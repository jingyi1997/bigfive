var api = require('../../utils/ajax.js')
var Charts = require('../../utils/wxcharts.js')
var api2 = require('../../utils/corr.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer2:[
      '21', '3', '3', '3', '4', '1', '3', '1',
      '3', '3', '3', '4', '1', '3', '1',
      '3', '3', '3', '4', '1', '3', '1',
      '3', '2', '21', '3', '3', 'xjy'
    ],
    answer:null,
    share_image:false,
    level:null,
    res:0,
    simi:20,
    imageWidth:null,
    imageHeight: null,
    other_index:[12,12,12,12,12],
    my_index:[12,12,12,12,12],
    other_name: "吃瓜群众",
    load_done:  false,
    shareImgPath: null,
    scale:1.6,
    percentage: [0.5,0.5 ,0.5,0.5,0.5],
    test: ["外向性", "责任心", "想象力", "亲和力", "神经质"],
    qrcode_temp: null,
    radar_temp:null,
    share_temp:null,
    ans_des:[
      {
        desc:"测试表明你是一个热情且健谈的人，你喜欢与人交流合作，乐观且具有冒险精神。你适合的职业有：高级经理，销售人员，广告和市场管理人员， 理财顾问，牙医等等。这些职业最近的收入和增长趋势如下（数据来自美国劳工统计局）。",
   
        pos:[
          {
            pos_name:"高级经理",
            income: "$103, 950",
            incr:"8%",
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
        desc: "测试表明你是一个尽职尽责的人，在工作和生活上，有条理性，且有较强的自制力。 你适合的职业有：活动策划人员，律师，公务员，销售经理，行政总裁等等。这些职业最近的收入和增长趋势如下（数据来自美国劳工统计局）。",
     
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
        desc: "你乐于接受新事物，好奇心让你对世界敞开心扉，充沛的创造力使你在生活中可以看到各种各样的可能性。 你适合的职业有：演员，导演，艺术家，广告从业者，人类学家和史学家等等。",
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
        desc: "测试表明你是一个热心肠、有同理心的人，助人为乐是你的天性。无论是生活中，还是工作中，你都可以与他人保持和睦相处。各行各业都可能需要有亲和力的人。 你适合的职业有：护理人员，人力资源管理人员，健康咨询师，基础教育从业者等等。",

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
        desc: "测试表明你善于自我批评，自我意识较强，对外界有极强的感知力和敏感度。 你适合的职业有：营养学家，作家，图像设计师，图书管理员等等。",

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
    max_index:0
  },
  draw_radar:function(){
    var that = this
    let chart = new Charts({
      //TODO:设置饼状图相似度
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['外向性', '责任心', '想象力', '亲合力', '神经质'],
      series: [{
        name: that.data.answer[27],
        //data: [E_factor, C_factor, I_factor, A_factor, N_factor]
        data: that.data.my_index
      },
      {
        name: that.data.other_name,
        data: that.data.other_index
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
    var that=this
    if (options.other_id != null) {
      console.log(options.other_id);
      app.globalData.other_id = options.other_id;
      console.log(app.globalData.other_id);
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
    that.setData({
      answer: app.globalData.answerList
    }); 
    for(var i=0;i<28;i++)
    {
      if (that.data.answer[i]==null){
        that.data.answer[i] = that.data.answer2[i];
      }
    }
    this.data.my_index[0] = (5 - Number(this.data.answer[1])) + (5 - Number(this.data.answer[6])) + Number(this.data.answer[11]) + Number(this.data.answer[16]); //外向性
    this.data.my_index[1]  = (5 - Number(this.data.answer[2])) + Number(this.data.answer[7]) + Number(this.data.answer[12]) + Number((5 - this.data.answer[17])); //责任心
    this.data.my_index[2]  = (5 - Number(this.data.answer[3])) + (5 - Number(this.data.answer[8])) + (5 - Number(this.data.answer[13])) + Number(this.data.answer[18]); //想象力
    this.data.my_index[3]  = (5 - Number(this.data.answer[4])) + (5 - Number(this.data.answer[9])) + Number(this.data.answer[14]) + Number(this.data.answer[19]);  //亲合力
    this.data.my_index[4]  = Number(this.data.answer[5]) + Number(this.data.answer[10]) + (5 - Number(this.data.answer[15])) + (5 - Number(this.data.answer[20]));  //神经质
    
    
    
    var index = this.data.my_index;
    console.log(index);
    for (var i = 0; i < 5; i++) {
      for (var j = i+1; j < 5; j++) {
        if(index[i]>index[j])
        {
          that.setData({max_index : i});
        }
        else
        {
          that.setData({ max_index: j });
        }
      }
    }
    console.log(that.data.max_index)
    //TODO：存入数据库
    wx.request({
      url: 'https://psychstat.cn/bigfive/storeRes_temp.php',
      data: {
        res: this.data.answer,
        answer_time: app.globalData.answerTime,
        user_id: app.globalData.open_id,
        other_id: app.globalData.other_id,
        index: this.data.my_index,

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
          simi: res.data['simi'],
          other_name: res.data['other_name'],
          load_done:true,
          //percentage: res.data['percentage'],
          percentage: res.data['per'],
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
  //分享给好友
  drawImage: function () {
    //绘制canvas图片
    var that = this
    const ctx = wx.createCanvasContext('myCanvas')
    var qrPath = that.data.qrcode_temp
    
    var bgPath = "../../img/bg.png"
    var radarPath = that.data.radar_temp
    var windowWidth = that.data.imageWidth
    var windowHeight = that.data.imageHeight
    var scale = 1.6
    // var qrwidth = that.data.qrwidth
    // var qrheight = that.data.qrheight
    ctx.drawImage(bgPath, 0, 0, windowWidth, 1.2 * windowWidth)
    
    //绘制logo
    ctx.drawImage(radarPath, windowWidth * 0.35 / 2, 0.2 * windowWidth, windowWidth * 0.65, windowWidth *0.5)

    //绘制二维码
    ctx.drawImage(qrPath, 0.65 * windowWidth / 2, 0.75 * windowWidth, 0.35 * windowWidth, 0.35 * windowWidth)
    //绘制文字
    ctx.setStrokeStyle('black')
    ctx.stroke()
    ctx.setFontSize(0.042 * windowWidth)
    ctx.setTextAlign('center')
    ctx.fillText('五大性格测试', 0.5 * windowWidth, 0.1 * windowWidth)
    ctx.fillText( that.data.answer[27] + '和'+that.data.other_name+'的默契度是'+that.data.simi, 0.5 * windowWidth, 0.15 * windowWidth)
    ctx.fillText('长按扫码进入测试', 0.5 * windowWidth ,1.15* windowWidth)
    ctx.draw();
  
        
    //转换为图片

  },
  canvasToImage:function(){
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.imageWidth,
      height: that.data.imageWidth*1.2,
      destWidth: that.data.imageWidth*4 ,
      destHeight: that.data.imageWidth*1.2*4  ,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log('朋友圈分享图生成成功:' + res.tempFilePath)
        that.setData({
          share_image:true,
          share_temp:res.tempFilePath
        })
        /*
        wx.previewImage({
          current: res.tempFilePath, // 当前显示图片的http链接
          urls: [res.tempFilePath] // 需要预览的图片http链接列表
        })*/
      },
    })  
  },
  saveImage:function(){
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.share_temp,
      success(res) {
        wx.showModal({
          title: '存图成功',
          content: '图片成功保存到相册了',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      },
      fail(res) { 
        console.log(res)
        wx.getSetting({
          success(res)
          {
            if (!res.authSetting["scope.writePhotosAlbum"])
            {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.writePhotosAlbum"]) {
                    wx.saveImageToPhotosAlbum({
                      filePath: that.data.share_temp,
                      success(res) {
                        wx.showModal({
                          title: '存图成功',
                          content: '图片成功保存到相册了',
                          showCancel: false,
                          confirmText: '确定',
                          confirmColor: '#72B9C3',
                          success: function (res) {
                            if (res.confirm) {
                              console.log('用户点击确定');
                            }
                          }
                        })
                      }

                    })
                  }
                }
              })
            }
          }
        })
            
    }
   })      
  },
  backtoResult:function(){
    this.setData({
    share_image: false
    })
    this.draw_radar();
  },
  testAgain: function () {
    wx.redirectTo({
      url: "/pages/test_page/test_page?testid=1"
    })
  },
  
  shareMoments : function(){
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    wx.request({
      method: 'POST',
      url: 'https://psychstat.cn/bigfive/test_QRcode.php',
      data: {
        other_id: app.globalData.open_id,
        lastid: app.globalData.other_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-TOKEN': app.jwt
      },
      success(res) {
        console.log(res.data) // 
        wx.downloadFile({ // 调用wx.downloadFile接口将图片下载到小程序本地
          url: 'https://psychstat.cn/bigfive/' + res.data,
          success(res2) {
            console.log(res2.tempFilePath);
            that.setData({
              qrcode_temp: res2.tempFilePath
            });
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: that.data.imageWidth,
              height: 290,
              destWidth: that.data.imageWidth ,
              destHeight: 290 ,
              canvasId: 'radarCanvas',
              success: function (res) {
                that.setData({
                  radar_temp: res.tempFilePath
                });
                console.log(that.data.radar_temp);
                that.drawImage();

                setTimeout(function () {
                  that.canvasToImage()
                  wx.hideToast();
                }, 200)
              },
            });
            
          },

        })

      },
      fail: function (res) {
        wx.showModal({
          title: '失败',
          content: '接口调用失败',
        })
      }
    })

    
    
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
      path: '/pages/shareRes1/shareRes1?other_id=' + app.globalData.open_id + '&lastid=' + app.globalData.other_id
    }
  },
  onShareAppMessage: function () {
      return {
        title: '专业的五大性格量表测试',
        path: '/pages/shareRes1/shareRes1?other_id=' + app.globalData.open_id + '&lastid=' + app.globalData.other_id
    }
  }
})
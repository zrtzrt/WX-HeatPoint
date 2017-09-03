//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var d = new Date();
    d.setDate(d.getDate() + 30);
    this.globalData.endTime = d.toLocaleDateString();
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  showSorryModal: function () {
    wx.showModal({
      title: '',
      content: '很抱歉，该功能还未完工，敬请期待',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  globalData: {
    userInfo: null,
    typeName: ["展会信息", "演唱会", "音乐会", "话剧歌剧", "舞蹈芭蕾", "曲苑杂坛", "体育赛事", "会议论坛"],
    url: 'https://cloudforwork.cn/heatpoint/servlet/LocationServlet',
    toDoList: [],
    // toDoList: [{ 
    //   name:'getLocat',
    //   data:{
    //     action:0,
    //     type:1,
    //     startTime: new Date().toLocaleDateString(),
    //     endTime: 0
    //   }
    // }],
    startTime: new Date().toLocaleDateString(),
    endTime: 0
  }
})

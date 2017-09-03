// catalog.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  sendmsg: function (){
    app.showSorryModal()
  }, 
  navigation: function () {
    app.showSorryModal()
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name + "的" + app.globalData.typeName[options.type]
    })
    console.log(options)
    this.data.options = options
    options.action = 2
    options.start = app.globalData.startTime
    options.end = app.globalData.endTime

    var that = this
    wx.request({
      url: app.globalData.url,
      data: options,
      success: function (res) {
        that.setData({
          info: res.data.show
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
    app.globalData.toDoList.push({
      name: 'back',
      id: this.data.options.id
    })
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
  onShareAppMessage: function (res) {
    return {
      title: this.data.options.name + '有好多活动,大家一起来参加吧',
      path: '/pages/catalog/catalog?id=' + this.data.options.id + '&type=' + this.data.options.type + '&name=' + this.data.options.name,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
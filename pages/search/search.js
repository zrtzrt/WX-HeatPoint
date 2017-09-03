// search.js
var WxSearch = require('../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    start: app.globalData.startTime,
    end: app.globalData.endTime,
    isChecked: [],
    province: ["全国", "北京", "天津", "上海", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "内蒙古", "广西", "西藏", "宁夏", "新疆维吾尔自治区", "香港", "澳门"],
    provinceIndex: 0,
  },
  switchChangeAll: function (e) {
    for (var i = 0; i < 8; i++) {
      this.data.isChecked[i] = e.detail.value
      switchChange(e, i, this)
    }
    this.setData({
      isChecked: this.data.isChecked
    })
  },
  switchChange0: function (e) {
    switchChange(e, 0, this)
  },
  switchChange1: function (e) {
    switchChange(e, 1, this)
  },
  switchChange2: function (e) {
    switchChange(e, 2, this)
  },
  switchChange3: function (e) {
    switchChange(e, 3, this)
  },
  switchChange4: function (e) {
    switchChange(e, 4, this)
  },
  switchChange5: function (e) {
    switchChange(e, 5, this)
  },
  switchChange6: function (e) {
    switchChange(e, 6, this)
  },
  switchChange7: function (e) {
    switchChange(e, 7, this)
  },
  switchChange8: function (e) {
    app.showSorryModal()
    this.setData({
      'isChecked[8]': false
    })
  },
  switchChange9: function (e) {
    app.showSorryModal()
    this.setData({
      'isChecked[9]': false
    })
  },
  switchChange10: function (e) {
    app.showSorryModal()
    this.setData({
      'isChecked[10]': false
    })
  },
  switchChange11: function (e) {
    app.showSorryModal()
    this.setData({
      'isChecked[11]': false
    })
  },
  bindProvinceChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.province[e.detail.value])
    app.globalData.province = this.data.province[e.detail.value]
    this.setData({
      provinceIndex: e.detail.value
    })
  },
  bindStartChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    app.globalData.startTime = e.detail.value.replace('-', '/').replace('-', '/')
    this.setData({
      start: e.detail.value.replace('-', '/').replace('-', '/')
    })
  },
  bindEndChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    app.globalData.endTime = e.detail.value.replace('-', '/').replace('-', '/')
    this.setData({
      end: e.detail.value.replace('-', '/').replace('-', '/')
    })
  },
  clear: function (){
    for (var i = 0; i < this.data.isChecked.length; i++) {
      this.data.isChecked[i] = false
    }
    this.setData({
      isChecked: this.data.isChecked
    })
    app.globalData.toDoList.push({name:'clear'})
  },
  //初始化
  onLoad: function () {
    var that = this
    //初始化的时候渲染wxSearchdata 第二个为你的search高度
    WxSearch.init(that, 43, ['互联网', '电子', '机械', '食品', '游戏','儿童']);
    // WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    search(that)
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    this.data.keyWord = e.detail.value
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
    this.data.keyWord = e.target.dataset.key
    search(that)
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    if (this.data.isChecked.length == 0)
      for (var i = 0; i < 11; i++) {
        this.data.isChecked.push(false);
      }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function (res) {
    return {
      title: '大家一起来体验HeatPoint热点地图吧',
      path: '/pages/search/search',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  about: function(){
    wx.showModal({
      title: '关于我们',
      content: '作者：张仁童\n邮箱：519539110@qq.com\n\n比赛：第六届“中国软件杯”大学生软件设计大赛\n赛题：基于互联网大数据的事件智能抓取和画像',
      showCancel: false,
      confirmText: '知道了'
    })
  }
})

function switchChange(e, type, that) {
  that.data.isChecked[0] = e.detail.value
  if (e.detail.value) {
    if (app.globalData.province != undefined && app.globalData.province != '全国') {
      app.globalData.toDoList.push({
        name: 'getLocat',
        data: {
          action: 0,
          type: type,
          p: app.globalData.province,
          start: app.globalData.startTime,
          end: app.globalData.endTime
        }
      })
    } else {
      app.globalData.toDoList.push({
        name: 'getLocat',
        data: {
          action: 0,
          type: type,
          start: app.globalData.startTime,
          end: app.globalData.endTime
        }
      })
    }
    wx.switchTab({
      url: '/pages/index/index'
    })
  } else {
    app.globalData.toDoList.push({
      name: 'deleteLocat',
      type: type
    })
  }
}

function search(that){
  that.clear()
  app.globalData.toDoList.push({
    name: 'search',
    data: {
      action: 5,
      key: that.data.keyWord,
      start: app.globalData.startTime,
      end: app.globalData.endTime
    }
  })
  wx.switchTab({
    url: '/pages/index/index'
  })
}
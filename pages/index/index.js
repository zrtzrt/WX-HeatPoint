//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    center: {
      x: 104.114129,
      y: 37.550339,
      scale: 3
    },
    markers: [],
    polyline: [],
    info: [],
  },
  regionchange(e) {
    this.data.tap = -1
  },
  markertap(e) {
    var info
    for (var i = 0; i < this.data.info.length; i++) {
      if (this.data.info[i].id == e.markerId)
        info = this.data.info[i]
    }
    if (this.data.tap == e.markerId) {
      back(this, e.markerId)
    } else {
      this.data.tap = e.markerId
      this.setData({
        center: {
          x: info.x,
          y: info.y,
          scale: 13
        }
      })
    }
  },
  callouttap(e){
    var info
    for (var i = 0; i < this.data.info.length; i++) {
      if (this.data.info[i].id == e.markerId)
        info = this.data.info[i]
    }
    wx.navigateTo({
      url: '../catalog/catalog?id=' + e.markerId + '&type=' + info.type + '&name=' + info.name,
    })
  },
  onShow() {
    var that = this
    var isin = false
    console.log(app.globalData.toDoList.length)
    for (var i = 0; i < app.globalData.toDoList.length; i++) {
      console.log(app.globalData.toDoList[i].name)
      if (app.globalData.toDoList[i].name == 'getLocat') {
        (function (i) {
          setTimeout(function () {
            getLocat(i, that)
            //       					alert(i);
          }, i * 500);
        })(i);
        isin = true
      } else if (app.globalData.toDoList[i].name == 'deleteLocat') {
        deleteLocat(i, that)
      } else if (app.globalData.toDoList[i].name == 'back') {
        back(that, app.globalData.toDoList[i].id)
      } else if (app.globalData.toDoList[i].name == 'search') {
        search(app.globalData.toDoList[i].data,that)
      } else if (app.globalData.toDoList[i].name == 'clear') {
        this.setData({
          markers: []
        })
        this.setData({
          center: {
            x: 104.114129,
            y: 37.550339,
            scale: 3
          },
        })
      }
    }
    // if (this.data.markers.length > 1) {
    //   var points = []
    //   for (var i = 0; i < this.data.markers.length; i++) {
    //     points.push({
    //       latitude: this.data.markers[i].latitude,
    //       longitude:this.data.markers[i].longitude 
    //     })
    //   }
    //   this.mapCtx.includePoints({
    //     padding: [10],
    //     points: points
    //   })
    // }
  },
  onHide: function () {
    app.globalData.toDoList = []
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  onShareAppMessage: function (res) {
    return {
      title: '大家一起来体验HeatPoint热点地图吧',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
function getLocat(i, that) {
  wx.request({
    url: app.globalData.url,
    data: app.globalData.toDoList[i].data,
    success: function (res) {
      if (res.data.size != 0) {
        var len = that.data.info.length
        for (var j = 0; j < res.data.size; j++) {
          that.data.info[len + j] = res.data.location[j]
          res.data.location[j].type = app.globalData.toDoList[i].data.type;
        }
        showLocat(res.data.location, that);
      } else if (app.globalData.toDoList.length == 1) {
        none()
      }
    }
  })
}
function none() {
  wx.showModal({
    title: '',
    content: '很抱歉，没有找到你想要的内容',
    showCancel: false,
    confirmText: '知道了',
    success: function (res) {
      wx.switchTab({
        url: '/pages/search/search'
      })
    }
  })
}
function deleteLocat(index, that) {
  console.log(that.data.markers.length)
  var ico = setIcon(app.globalData.toDoList[index].type)
  for (var i = 0; i < that.data.markers.length; i++) {
    if (that.data.markers[i].iconPath == ico) {
      that.data.markers.splice(i, 1)
      i--
    }
  }
  that.setData({
    markers: that.data.markers
  })
  that.setData({
    center: {
      x: 104.114129,
      y: 37.550339,
      scale: 3
    }
  })
}
function showLocat(locat, that) {
  // locat.location = app.coordtranslate(locat.location, locat.location.length)
  for (var i = 0; i < locat.length; i++) {
    that.data.markers.push({
      id: locat[i].id,
      title: locat[i].name,
      iconPath: setIcon(locat[i].type),
      longitude: locat[i].x,
      latitude: locat[i].y,
      // anchor:{
      //   x:10,
      //   y:10
      // }
      callout: {
        content: '地点：' + locat[i].name + '\n类型：' + app.globalData.typeName[locat[i].type],
        borderRadius: 10,
        fontSize:20,
        bgColor:'#00CCFF',
        display: 'BYCLICK'
      }
    });
  }
  that.setData({
    markers: that.data.markers
  });
}
function setIcon(type) {
  if (type == 0)
    return "img/trade.png";
  if (type > 0 && type < 3)
    return "img/music.png";
  if (type > 2 && type < 6)
    return "img/show.png";
  if (type == 6)
    return "img/sport.png";
  if (type == 7)
    return "img/meet.png";
}
function back(that, id) {
  for (var i = 0; i < that.data.info.length; i++) {
    if (that.data.info[i].id == id) {
      that.setData({
        center: {
          x: that.data.info[i].x,
          y: that.data.info[i].y,
          scale: 10
        }
      })
      that.setData({
        markers: that.data.markers
      })
    }
  }
}
function search(data,that) {
  wx.request({
    url: app.globalData.url,
    data: data,
    success: function (res) {
      if (res.data.size != 0) {
        var len = that.data.info.length
        for (var j = 0; j < res.data.size; j++) {
          that.data.info[len + j] = res.data.location[j]
        }
        showLocat(res.data.location,that);
      } else if (app.globalData.toDoList.length == 1) {
        none()
      }
    }
  })
}
// function coordtranslate(locat, left,that) {
//   var location = '';
//   for (var i = locat.length - left; i < locat.length && location.length < 900; i++) {
//     location += locat[i].y + ',' + locat[i].x
//     left--
//     if (i != locat.length - 1)
//       location += ";"
//   }
//   if (left > 0)
//     location = location.substring(0, location.length - 1)
//   wx.request({
//     url: 'https://apis.map.qq.com/ws/coord/v1/translate',
//     data: {
//       locations: location,
//       type: 3,
//       key: 'WHNBZ-54TCU-IEIVU-2XIMN-AKKNH-TMBVF'
//     },
//     success: function (res) {
//       console.log(left)
//       for (var i = 0; i < res.locations.length; i++) {
//         locat[locat.length - left + i].x = res.locations[i].lng
//         locat[locat.length - left + i].y = res.locations[i].lat
//       }
//       if (left > 0)
//         locat=coordtranslate(locat, left, that)
//       else
//         showLocat(locat,that);
//     }
//   })
// }
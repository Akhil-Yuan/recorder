// pages/info/index/index.js
const $api = require('../../../utils/api.js').API
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog'

Page({
  data: {
    value: '',
    emailList: [],
    scrollNum: 0,
    clearObj: []
  },
  toastTip(msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1000
    })
  },
  toInbox() {
    wx.navigateTo({
      url: '../inbox/inbox?emailList='+JSON.stringify(this.data.emailList),
    })
  },
  infoSearch(e) {
    var that = this
    this.setData({
      value: e.detail
    }) 
    const data = {
      searchContent: this.data.value
    }
    $api.infoSearch(data)
    .then(res => {
      if(res.data.data.length) {
        wx.showToast({
          title: '搜索成功!',
          icon: 'success',
          duration: 1000
        })
        let query = wx.createSelectorQuery()
        query.selectViewport().scrollOffset()
        query.select("#info"+res.data.data[0].emailId).boundingClientRect()
        query.exec(res => {
          that.setData({
            scrollNum: res[0].scrollTop+res[1].top
          })
          wx.pageScrollTo({
            duration: 300,
            scrollTop: that.data.scrollNum
          })
        })
      } else {
        wx.showToast({
          title: '暂无搜索内容！',
          icon: 'none',
          duration: 1000
        })
      }
    })
    .catch(() => {
      wx.showToast({
        title: '搜索失败！',
        icon: 'error',
        duration: 1000
      })
    })
  },
  clearInfo(event) {
    this.data.clearObj.push(event.currentTarget.dataset.clearobj)
    $api.clearInfo(this.data.clearObj)
    .then(res => {
      wx.showToast({
        title: '删除成功！',
        icon: 'success',
        duration: 1000
      })
      this.onLoad()
    })
  },
  toInfo(event) {
    Dialog.alert({
      message: event.currentTarget.dataset.infocontent,
    }).then(() => {
      // on close
    })
  },
  onLoad: function (options) {
    $api.infoList()
    .then(res => {
      this.setData({
        emailList: res.data.data.emailList
      })
    })
  }
})
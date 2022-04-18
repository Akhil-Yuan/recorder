// pages/training/index/index.js
const $api = require('../../../utils/api.js').API;

Page({
  data: {
    value: '',
    trainList: []
  },
  training(event) {
    const content = event.currentTarget.dataset.content
    const execId = event.currentTarget.dataset.execid
    wx.navigateTo({
      url: '/pages/record/record?content='+content+'&execId='+execId
    })
  },
  trainSearch(e) {
    var that = this
    this.setData({
      value: e.detail
    }) 
    const data = {
      search: this.data.value
    }
    $api.trainSearch(data)
    .then(res => {
      if(res.data.data.length) {
        wx.showToast({
          title: '搜索成功!',
          icon: 'success',
          duration: 1000
        })
        let query = wx.createSelectorQuery()
        query.selectViewport().scrollOffset()
        query.select("#train"+res.data.data[0].execId).boundingClientRect()
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
  onLoad: function (options) {
    $api.trainList()
    .then(res => {
      this.setData({
        trainList: res.data.data
      })
    })
  }
})
// pages/index/index.js
const $api = require('../../../utils/api.js').API

Page({
  data: {
    value: '',
    imageURL: 'https://img.yzcdn.cn/vant/cat.jpeg',
    recentList: [],
    studentId: 1
  },
  toSearch() {
    wx.setStorageSync('indexSearch', true)
    wx.navigateTo({
      url: '/pages/index/search/search'
    })
  },
  toCourse(event) {
    const courseId = event.currentTarget.dataset.courseid
    wx.navigateTo({
      url: '/pages/index/course/course?courseId='+courseId,
    })
  },
  myCourse() {
    wx.navigateTo({
      url: '/pages/index/myCourse/myCourse',
    })
  },
  onLoad: function (options) {
    $api.newRecent()
    .then(res => {
      this.setData({
        recentList: res.data.data
      })
    })
  }
})
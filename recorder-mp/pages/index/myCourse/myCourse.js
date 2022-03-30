// pages/myCourse/myCourse.js
const $api = require('../../../utils/api.js').API
Page({
  data: {
    value: '',
    mycourseList: {},
  },
  toBack() {
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index/index',
      })
    }, 1000)
  },
  toSearch() {
    wx.setStorageSync('mySearch', true)
    wx:wx.navigateTo({
      url: '../search/search'
    })
  },
  courseOne(event) {
    const courseId = event.currentTarget.dataset.courseid
    wx.navigateTo({
      url: '../course/course?courseId='+courseId
    })
  },
  onLoad: function (options) {
    $api.myCourse()
    .then(res => {
      this.setData({
        mycourseList: res.data.data
      })
    })
  }
})
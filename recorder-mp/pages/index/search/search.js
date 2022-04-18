// pages/search/search.js
const $api = require('../../../utils/api.js').API;

Page({
  data: {
    value: '',
    showRecent: true,
    showList: false,
    showNot: false,
    recentList: [],
    courseList: [],
    mySearch:false,
    indexSearch:false
  },
  toBack() {
    wx.setStorageSync('mySearch', false)
    wx.setStorageSync('indexSearch', false)
    setTimeout(() => {
      wx.navigateBack({
        delta: 1,
      })
    }, 1000)
  },
  search(e) {
    this.setData({
      value: e.detail
    })
    if(this.data.value != "") {
      const params = "search="+this.data.value
      if(wx.getStorageSync('mySearch')) {
        $api.mySearch(params)
        .then(res => {
          if(res.data.data.length) {
            this.setData({
              showRecent: false,
              showList: true,
              courseList: res.data.data
            })
          } else {
            this.setData({
              showRecent: false,
              showList: false,
              showNot: true
            })
          }
        })
      } else if (wx.getStorageSync('indexSearch')) {
        $api.searchCourse(params)
        .then(res => {
          this.setData({
            showRecent: false,
            showList: true,
            courseList: res.data.data.hasCourseList
          })
        })
        .catch(err => {
          this.setData({
            showRecent: false,
            showList: false,
            showNot: true
          })
        })
      }
    }
  },
  onCancel() {
    this.setData({
      showRecent: true,
      showList: false,
      showNot: false
    })
    this.onLoad()
  },
  deleteRecent() {
    if(wx.getStorageSync('mySearch')) {
      $api.mydeleteRecent()
      .then(res => {
        this.setData({
          recentList: []
        })
      })
    } else if(wx.getStorageSync('indexSearch')) {
      $api.deleteRecent()
      .then(res => {
        this.setData({
          recentList: []
        })
      })
    }
  },
  toCourseOne(event) {
    const courseId = event.currentTarget.dataset.courseid
    wx.navigateTo({
      url: '../course/course?courseId='+courseId
    })
  },
  onLoad: function (options) {
    if(wx.getStorageSync('mySearch')) {
      $api.myrecentList()
    .then(res => {
      this.setData({
        recentList:res.data.data
      })
    })
    } else if(wx.getStorageSync('indexSearch')) {
      $api.recentList()
      .then(res => {
        this.setData({
          recentList: res.data.data
        })
      })
    }
  }
})
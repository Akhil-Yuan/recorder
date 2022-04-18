const $api = require('../../../utils/api.js').API
// pages/mine/mine.js
Page({
  data: {
    headAddr: '',
    nickname: '',
    a: {}
  },
  toMyCourse() {
    wx.navigateTo({
      url: '/pages/index/myCourse/myCourse'
    })
  },
  toPersonalFile() {
    wx.navigateTo({
      url: '../personalfile/personalfile',
    })
  },
  toProgress() {
    wx.navigateTo({
      url: '../progress/progress'
    })
  },
  toSetting() {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  onLoad: function (options) {
    let _this = this
    wx.getStorage({
      key: 'isLogin',
      success({
        data
      }) {
        if (data == true) {
          // 让每次拿到的地址值不同，小程序才会更新视图
          wx.getRandomValues({
            length: 6,
            success(res) {
              let random = wx.arrayBufferToBase64(res.randomValues);
              $api.getStudentInfo().then(({data: {data }}) => {
                wx.setStorageSync('nickname', data.name)
                wx.setStorageSync('signature', data.signature)
                wx.setStorageSync('sexIndex', data.sex)
                _this.setData({
                  headAddr: `http://47.107.101.153:8080${data.headAddr}?t=${random}`,
                  nickname: wx.getStorageSync('nickname')
                })
                wx.setStorageSync('headAddr', _this.data.headAddr)
              })
            }
          })
        } else {
          wx.showToast({
            title: '请先登录',
            icon: 'error',
            duration: 2000,
            success() {
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }, 2000);
            }
          })
        }
      }
    })
  },

  onShow: function () {
    // 从缓存中拿图片地址
    const headAddr = wx.getStorageSync('headAddr')
    const nickname = wx.getStorageSync('nickname')
    this.setData({
      headAddr,
      nickname
    })
  }
})
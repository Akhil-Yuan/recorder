const $api = require('../../utils/api.js').API

Page({
  data: {
    phonenumber: '', //　手机号
    password: '',  //　密码
  },
  // 警告弹窗
  warnTip(content) {
    wx.showModal({
      title: '提示',
      content,
    showCancel: false
    })
  },
  warnTipNobtn(content, icon) {
    wx.showToast({
      title: content,
      icon
    })
  },
  // 登录：获取手机号以及密码
  phonenumberInput(e) {
    this.setData({
      phonenumber: e.detail.value
    })
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登录：校验、查找数据库内容
  signin() {
    var that = this
    var phoneReg = /^1[0-9]{10}$/
    // 校验手机号码
    if (!phoneReg.test(parseInt(that.data.phonenumber))) {
      this.warnTipNobtn('请输入正确的手机号', 'none')
    }else if(!that.data.password) {
      this,this.warnTipNobtn('请输入密码', 'none')
    } else {
      wx.setStorageSync('isLogin', false)
      // 在数据库中匹配用户信息
      $api.isExistPhone({
        phone: parseInt(that.data.phonenumber)
      })
      .then(res => {
        if(!res.data.data) {
          that.warnTipNobtn('该手机号未注册', 'none')
        } else {
          wx.login({
            success (res) {
              const params = {
                phone: parseInt(that.data.phonenumber),
                password: that.data.password,
                code: res.code
              }
              $api.signIn(JSON.stringify(params))
              .then(res1 => {
                wx.setStorageSync('token', res1.data.data)
                wx.setStorageSync('isLogin', true)
                wx.setStorageSync('mySearch', false)
                wx.setStorageSync('indexSearch', false)
                that.warnTipNobtn('登录成功', 'success')
                setTimeout(() => {
                  wx.switchTab({
                    url: '../index/index/index'
                  })
                }, 1000)
              })
              .catch(err => {
                that.warnTipNobtn('密码错误', 'none')
              })
            }
          })
        }
      })
    }
  },


  // 跳转到注册界面
  register(){
    wx.showModal({
      title: '提示',
      content: '每个微信用户只能注册一个手机号',
      success: (res) => {
        if(res.confirm) {
          wx.navigateTo({
            url: '../enroll/enroll',
          })
        }
      }
    })
  }
})
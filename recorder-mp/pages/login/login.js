Page({
  data: {
    phonenumber: '', //　手机号
    password: '',  //　密码
    userOpenid: '',  // 用户唯一标识
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
    const db = wx.cloud.database()
    const user = db.collection('user')
    // 校验手机号码
    if (!phoneReg.test(parseInt(that.data.phonenumber))) {
      this.warnTipNobtn('请输入正确的手机号', 'none')
    }else if(!that.data.password) {
      this,this.warnTipNobtn('请输入密码', 'none')
    } else {
      // 在数据库中匹配用户信息
      user
        .where({
          phoneNumber: parseInt(that.data.phonenumber)
        })
        .get()
          .then(res => {
            var userInfo = res.data
            if (userInfo.length === 0) {
              that.warnTipNobtn('该手机号未注册', 'none')
            } else {
              for (let i = 0; i < userInfo.length; i++) {
                if (parseInt(that.data.phonenumber) === userInfo[i].phoneNumber) {
                  if(userInfo[i].isExamined === false) {
                    that.warnTipNobtn('号码审核中，审核完成后即可登录', 'none')
                  } else if (that.data.password !== userInfo[i].password) {
                    that.warnTipNobtn('密码错误', 'none')
                  } else {
                    wx.showLoading({
                      title: '登陆中',
                    })
                    var isUser = true
                    var timestamp = Date.parse(new Date())
                    var expiration = timestamp +　604800000
                    wx.setStorageSync('username', userInfo[i].name)
                    wx.setStorageSync('organize', userInfo[i].organize)
                    wx.setStorageSync('isUser', isUser)
                    wx.setStorageSync('expiration', expiration)
                    wx.setStorageSync('phone', that.data.phonenumber)
                    that.warnTipNobtn('登录成功', 'success')
                    wx.hideLoading()
                    setTimeout(() => {
                      wx.redirectTo({
                        url: '../record/record',
                      })
                    }, 1000);
                  }
                }
              }
            }
          })
          .catch(err => {
            console.log('失败', err)
          })
    }
  },


  // 跳转到注册界面
  register(){
    var that = this
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        wx.showLoading({
          title: '加载中',
        })
        var userOpenid = res.result.openId
        const db = wx.cloud.database()
        const user = db.collection('user')
        user.where({
          _openid: userOpenid
        })
          .get()
          .then(res => {
            wx.hideLoading()
            if (res.data.length !== 0) {
              that.warnTip('当前微信已经注册过手机号！')
            } else {
              wx.navigateTo({
                url: '../enroll/enroll',
              })
            }
          })
      }
    })
  }
})
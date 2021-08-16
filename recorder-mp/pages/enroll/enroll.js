// pages/enroll/enroll.js
Page({
  data: {
    phonenumber: '',
    email: '',
    name: '',
    organize: '',
    password: '',
    passwordAck: '',
    openid: ''
  },

  onLoad() {
    this.getOpenid()
  },

  // 警告弹窗
  warnTip(content) {
    wx.showModal({
      title: '提示',
      content,
      showCancel: false
    })
  },

  // 获取用户openid
  getOpenid() {
    var that = this
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        var openid = res.result.openId
        that.setData({
          openid
        })
      }
    })
  },

  // 注册：获取表单信息
  phonenumberInput(e) {
    this.setData({
      phonenumber: e.detail.value
    })
  },
  emailInput(e) {
    this.setData({
      email: e.detail.value
    })
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  passwordInpurAck(e) {
    this.setData({
      passwordAck: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  organizeInput(e) {
    this.setData({
      organize: e.detail.value
    })
  },

  // 已有帐号，跳转到登录页面
  signin() {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 注册：校验、发送到数据库
  regist() {
    var that = this
    var phoneReg = /^1[0-9]{10}$/
    var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    const db = wx.cloud.database()
    const user = db.collection('user')
    // 输入框校验
    if (that.data.name === '') {
      that.warnTip('请输入姓名')
    } else if (that.data.phonenumber == '') {
      that.warnTip('请输入手机号码')
    } else if (!phoneReg.test(parseInt(this.data.phonenumber))) {
      that.warnTip('请输入正确的手机号码')
    } else if (!/^[0-9]{6}$/.test(that.data.organize)) {
      that.warnTip('请输入六位组织码')
    } else if (!emailReg.test(this.data.email)) {
      that.warnTip('请输入正确的邮箱')
    } else if (that.data.password == '') {
      that.warnTip('请输入密码')
    } else if (that.data.passwordAck == '') {
      that.warnTip('请输入确认密码')
    } else if (!/^\d{6}$/.test(that.data.password)) {
      that.warnTip('密码至少6位数')
    } else if (that.data.password !== that.data.passwordAck) {
      that.warnTip('两次输入密码不一致')
    } else {
      wx.showModal({
        title: '提示',
        content: '每个微信用户只能注册一个手机号，请确认手机号码填写正确',
        success: res => {
          if(res.confirm) {
            user
              .where({
                phoneNumber: parseInt(that.data.phonenumber)
              })
              .get()
                .then(res => {
                  if(res.data.length !== 0) {
                    that.warnTip('该手机号已注册')
                  } else {
                    user.add({
                      data: {
                        name: that.data.name,
                        organize: that.data.organize,
                        phoneNumber: parseInt(that.data.phonenumber),
                        password: that.data.password,
                        email: that.data.email,
                        isExamined: false
                      }
                    }).then(res => {
                      wx.showToast({
                        title: '已注册，待审核',
                      })
                      setTimeout(() => {
                        wx.navigateBack({
                          delta: 1,
                        })
                      }, 1000)
                    })
                    .catch(err => {
                      console.log('用户注册失败', err)
                    })
                  }
                  console.log('查找数据库成功', res)
                })
                .catch(err => {
                  console.log('查找数据库失败', err)
                })
          }
        }
      })
    }
  },
})
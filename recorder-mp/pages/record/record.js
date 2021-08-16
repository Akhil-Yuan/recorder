// record.js
var util = require('../../utils/util.js')
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    isSpeaking: false,  // 是否正在说话
    src: '', // 暂存路径
    voicesList: [], // 音频列表
    recordTxt: ['元音a（5s）', '元音i（5s）', '元音u（5s）','唱段（10s）'],  // 录音按钮文本数组
    showTxt: [], // 展示在picker的数组,
    index: 0,  // 展示数组的下标
    picktype: null, // 多选框选择类型
    cloudPath: '',  // 云存储路径
    uploadedTip: false, //上传提示
    uploadedTime: '', //上传提示中的时间
    phone: '',  //用户手机号码
    username: '', // 用户名
    organize: '',  // 组织
  },
  onLoad: function() {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      // 获取缓存的上传状态、上传时间、手机号码
      uploadedTip: wx.getStorageSync('uploadedTip'),
      uploadedTime: wx.getStorageSync('uploadedTime'),
      phone: wx.getStorageSync('phone'),
      username: wx.getStorageSync('username'),
      organize: wx.getStorageSync('organize')
    })
    this.data.showTxt = this.data.recordTxt.slice()
    var storeVoices = []
    var storetxt = []
    // 获取缓存的录音文件
    if( wx.getStorageSync('storeVoices') !== '' && wx.getStorageSync('storetxt') !== '') {
      storeVoices = wx.getStorageSync('storeVoices')
      storetxt = wx.getStorageSync('storetxt')
      this.setData({
        showTxt: storetxt,
        voicesList: storeVoices
      })
    } else {
      this.setData({
        showTxt: this.data.showTxt
      })
    }
    var timestamp = Date.parse(new Date())
    // 获取用户是否登录以及登录时长
    var expiration = wx.getStorageSync('expiration')
    var isUser = wx.getStorageSync('isUser')
    wx.hideLoading({})
    if(!isUser) { // 判断用户是否登录
      wx.showModal({
        title: '提示',
        content: '暂未登录，登录后可使用录音系统功能',
        showCancel: false,
        success(res) {
          if(res.confirm) {
            wx.redirectTo({
              url: '../login/login'
            })
          }
        }
      })
    } else if (!isUser && expiration < timestamp) { // 判断用户登录状态是否过期
      wx.showModal({
        title: '提示',
        content: '登录状态已过期，请重新登录',
        showCancel: false,
        success(res) {
          if(res.confirm) {
            wx.redirectTo({
              url: '../login/login',
            })
          }
        }
      })
    } else {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {     //获取录音权限
            wx.authorize({
              scope: 'scope.record',
              success() {
                console.log('授权成功')
              }, fail() {
                wx.showModal({
                  title: '提示',
                  content: '尚未进行授权，部分功能将无法使用',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (!res.authSetting['scope.record']) {
                            wx.authorize({
                              scope: 'scope.record',
                              success() {
                                console.log('授权成功')
                              }, fail() {
                                console.log('用户点击取消')
                              }
                            })
                          }
                        },
                        fail: function () {
                          console.log("授权设置录音失败");
                        }
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  bindPickerChange: function(e) { // 绑定选择的录音文本
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      picktype: 1
    })
  },
  modaltip(msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },
  toastTip(msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1000
    })
  },
  // 手指按下
  touchdown: function () {
    if (this.data.voicesList.length >= this.data.recordTxt.length) {
      console.log('结束后按下')
      return
    }
    var duration = ''
    console.log("手指按下了...")
    this.setData({
      isSpeaking: true
    })
    if( this.data.showTxt[this.data.index]=='元音a（5s）' || this.data.showTxt[this.data.index]=='元音i（5s）' || this.data.showTxt[this.data.index]=='元音u（5s）') {
      duration = 5000 
    } else if ( this.data.showTxt[this.data.index]=='唱段（10s）' ) {
      duration = 10000
    }
    recorderManager.start({
      format: 'aac',  // 音频格式
      sampleRate: 44100,  // 采样率
      encodeBitRate: 320000, // 编码率
      numberOfChannels: 1,  // 录音通道
      duration
    })
    recorderManager.onStart(()=>{
      console.log('开始录音...')
      console.log('录音内容', this.data.showTxt[this.data.index] )
    });
    recorderManager.onError((errMsg)=>{ // 错误回调
      console.log(errMsg)
      this.modaltip('录音的姿势不对')
    });
  },
  // 手指抬起
  touchup: function () {
    if (this.data.voicesList.length < 4) {
    } else if(this.data.voicesList.length >= this.data.recordTxt.length) {
      console.log('结束后抬起')
      return
    }
    var that = this
    console.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })
    recorderManager.stop()
    recorderManager.onStop((res)=>{
      wx.showLoading({
        title: '保存中',
      })
      this.data.src = res.tempFilePath
      this.toastTip('录音成功', res)
      wx.saveFile({ // 录音后保存文件
        tempFilePath: that.data.src,
        success(res) {
          res.text = that.data.showTxt[that.data.index] // 添加文本
          that.data.voicesList = that.data.voicesList.concat(res)  // 将获取到的数组添加到voicesList
          that.setData({
            voicesList: that.data.voicesList
          })
          that.data.showTxt.splice(that.data.index, 1)  // 录音完毕后showTxt删除录制完毕的字段
          that.setData({
            showTxt: that.data.showTxt,
            index: 0
          })
          wx.setStorageSync('storeVoices', that.data.voicesList)
          wx.setStorageSync('storetxt', that.data.showTxt)
        }
      })
      wx.hideLoading()
      if (that.data.src === '') {
        that.tip("请先录音！")
      }
    });
  },
  // 点击播放录音
  playRecord(e) {
    innerAudioContext.src = e.currentTarget.dataset.key
    innerAudioContext.play()
    innerAudioContext.onPlay(() => {
      this.toastTip('正在播放')
    })
    innerAudioContext.onEnded((res) => {
      this.toastTip('播放结束')
      console.log('播放结束', res)
    })
  },
  // 上传录音
  uploadVoice() {
    wx.showLoading({
      title: '上传中',
    })
    var createTime = util.formatTime(Date.parse(new Date())) // 用户上传时间
    if( wx.getStorageSync('uploadCounter') ){
      var uploadCounter = wx.getStorageSync('uploadCounter')  // 上传计数器，用于区分云存储文件
    } else {
      var uploadCounter = 1
    }
    this.setData({
      uploadedTime: createTime,
      uploadedTip: true
    })
    wx.setStorageSync('uploadedTip', this.data.uploadedTip) // 设置上传状态
    wx.setStorageSync('uploadedTime', this.data.uploadedTime) // 设置上传时间
    const db = wx.cloud.database()
    // 将所有录音上传
    for (let i = 0; i < this.data.voicesList.length; i++) {
      var filePath = this.data.voicesList[i].savedFilePath
      var txt = this.data.voicesList[i].text
      wx.cloud.uploadFile({ // 上传到云存储
        cloudPath: 'voices/' + txt + '_' + this.data.phone + '_' + uploadCounter + '.m4a',
        filePath,
        createTime,
        success: res => {
          console.log('上传成功', res)
          // var name = res.fileID.slice(res.fileID.lastIndexOf('/') + 1)
          if (res.fileID.slice(res.fileID.lastIndexOf('/') + 1).search('元音a') !== -1) {
            var name = 'a'
          } else if (res.fileID.slice(res.fileID.lastIndexOf('/') + 1).search('元音i') !== -1) {
            var name = 'i'
          } else if (res.fileID.slice(res.fileID.lastIndexOf('/') + 1).search('元音u') !== -1) {
            var name = 'u'
          } else if (res.fileID.slice(res.fileID.lastIndexOf('/') + 1).search('唱段') !== -1) {
            var name = 'song'
          } else {
            console.log('查询失败')
          }
          db.collection('voices') // 上传到数据库
          .add({
            data: {
              name,
              filePath,
              phone: this.data.phone,
              createTime: Date.parse(new Date()),
              fileid: res.fileID,
              username: this.data.username,
              organize: this.data.organize
            }
          })
          .then(res => {
            console.log('录音文件上传到数据库成功', res)
          })
          .catch(err => {
            console.log('录音文件上传到数据库失败', err)
          })
        }
      })
    }
    uploadCounter = parseInt(uploadCounter) + 1
    wx.setStorageSync('uploadCounter', uploadCounter)
    wx.hideLoading({})
    this.toastTip('上传成功！')
  },
  // 删除录音
  deleteVoice(e) {
    var that = this
    var delid = e.currentTarget.dataset.id
    var deltext = e.currentTarget.dataset.text
    wx.showModal({
      title: '提示',
      content: '确定删除文件吗？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          // 在本地删除录音文件
          wx.removeSavedFile({
            filePath: e.currentTarget.dataset.key,
            success:res => {
              console.log('删除成功', res)
              that.data.voicesList.splice(delid, 1)
              that.data.showTxt.splice(delid, 0, deltext)
              that.setData({
                voicesList: that.data.voicesList,
                showTxt: that.data.showTxt
              })
              wx.setStorageSync('storeVoices', that.data.voicesList)
              wx.setStorageSync('storetxt', that.data.showTxt)
            },
            fail(err){
              console.log('删除失败', err)
            }
          })
        }
      }
    })
  }
})
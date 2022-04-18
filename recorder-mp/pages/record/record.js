// record.js
var util = require('../../utils/util.js')
const $api = require('../../utils/api.js').API
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
    content: '',//练习内容
    execId: '',//练习id
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      // 获取缓存的上传状态、上传时间、手机号码
      uploadedTip: wx.getStorageSync('uploadedTip'),
      uploadedTime: wx.getStorageSync('uploadedTime'),
      content: options.content,
      execId: options.execId
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
    wx.hideLoading({})
    if(!wx.getStorageSync('isLogin')) { // 判断用户是否登录
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
          //添加录音id
          switch(res.text) {
            case '元音a（5s）':
              res.code = 1
              break
            case '元音i（5s）':
              res.code = 2
              break
            case '元音u（5s）':
              res.code = 3
              break
            case '唱段（10s）':
              res.code = 4
              break
          }
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
    // 将所有录音上传
    var that = this
    for (let i = 0; i < this.data.voicesList.length; i++) {
      var filePath = this.data.voicesList[i].savedFilePath
      var code = this.data.voicesList[i].code
      //请求参数
      wx.uploadFile({
        filePath,
        name: 'file',
        url: 'http://47.107.101.153/applet/studentExec/loadExeRecode',
        header: {
          'Content-Type': 'multipart/form-data',
          'token': wx.getStorageSync('token')
        },
        formData: {
          'execId': that.data.execId,
          'code': code
        },
        success: res => {
          if(res.data.code === 200) {
            that.toastTip('上传成功！')
          } else {
            that.toastTip('上传失败！')
          }
        },
        fail: err => {
          that.toastTip('提交失败！')
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
// pages/info/inbox/inbox.js
const $api = require('../../../utils/api.js').API
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog'

Page({
  data: {
    emailList: [],
    clearObj: []
  },
  toInfo(event) {
    Dialog.alert({
      message: event.currentTarget.dataset.infocontent,
    }).then(() => {
      // on close
    })
  },
  clearInfo(event) {
    this.data.clearObj.push(event.currentTarget.dataset.clearobj)
    $api.clearInfo(this.data.clearObj)
    .then(res => {
      wx.showToast({
        title: '删除成功！',
        icon: 'success',
        duration: 1000
      })
      this.onLoad()
    })
  },
  onLoad: function (options) {
    if(options) {
      this.setData({
        emailList: JSON.parse(options.emailList)
      })
    }
    $api.inbox(this.data.emailList)
    .then(res => {
      this.setData({
        emailList: res.data.data
      })
    })
  }
})
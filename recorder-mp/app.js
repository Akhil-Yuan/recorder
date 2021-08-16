// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.cloud.init({
      env: 'cloud1-4g002dmfd056c314',
      traceUser: true
    })
  },
  globalData: {
    voices: [], // 音频数组
  }
})

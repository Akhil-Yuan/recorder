// pages/setting/setting.js
Page({
    data: {

    },
    change() {
        wx.navigateTo({
          url: '/pages/login/login'
        })
    },
    exit() {
        wx.showModal({
            content: '确认退出吗？',
            success(e) {
                if (e.confirm) {
                    // 移除缓存中的token后再执行后续操作
                    wx.removeStorageSync('token')
                    wx.setStorage({
                        key: 'isLogin',
                        data: false
                    }).then(() => {
                        wx.reLaunch({
                            url: '/pages/login/login'
                        })
                    })
                }
            }
        })
    },
    onLoad: function (options) {

    }
})
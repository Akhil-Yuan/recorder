// pages/progressReport/progressReport.js
const recorderManager = wx.getRecorderManager()
const player = wx.createInnerAudioContext()
const $api = require('../../../utils/api.js').API
Page({
    data: {
        voicesList: {},
        // 存放进入的是哪个页面
        options: {}
    },
    toastTip(msg) {
        wx.showToast({
            title: msg,
            icon: 'success',
            duration: 1000,
            mask: true
        })
    },
    onLoad: function (options) {
        // 已经获取到课程id和课程名
        console.log(options);
        this.setData({ options })
        $api.getOneCourseRecord(options).then(({data: {data}}) => {
            console.log(data.workExecIdMap);
            this.setData({
                voicesList: data.workExecIdMap
            })
        })
    },

    // 点击播放录音
    playRecord(e) {
        console.log(e);
        player.src = `http://47.107.101.153:8080${e.currentTarget.dataset.src}`
        player.play()
        player.onPlay(() => {
            this.toastTip('正在播放')
        })
        player.onEnded((res) => {
            this.toastTip('播放结束')
            console.log('播放结束', res)
        })
    },
    // 删除录音
    deleteVoice(e) {
        let _this = this
        let execId = e.currentTarget.dataset.execid
        let code = e.currentTarget.dataset.code
        // var deltext = e.currentTarget.dataset.text
        wx.showModal({
            title: '提示',
            content: '确定删除文件吗？',
            showCancel: true,
            success(res) {
                if (res.confirm) {
                    console.log(e);
                    let data = { execId, code }
                    $api.deleteExercise(data).then(() => {
                        _this.toastTip('删除成功')
                        player.stop()
                        $api.getOneCourseRecord(_this.data.options).then(({data: data}) => {
                            _this.setData({
                                voicesList: data.workExecIdMap
                            })
                            _this.onLoad(_this.data.options)
                        })
                    })
                }
            }
        })
    }
})
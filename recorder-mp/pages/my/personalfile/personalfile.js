// pages / personalfile / personalfile.js
const $api = require('../../../utils/api').API
let flag = true;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        headAddr: '',
        nickname: '',
        signature: '',
        show: false,
        sexIndex: 0,
        sexArr: ['女', '男'],
        nicknameFocus: false,
        signatureFocus: false,
    },
    onLoad: function () {
        wx.disableAlertBeforeUnload()
        let _this = this
        wx.getStorage({
            key: 'isLogin',
            success({
                data
            }) {
                if (data == true) {
                    _this.setData({
                        nickname: wx.getStorageSync('nickname'),
                        signature: wx.getStorageSync('signature'),
                        sexIndex: wx.getStorageSync('sexIndex'),
                        headAddr: wx.getStorageSync('headAddr')
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
    enableAlertBeforeUnload() {
        wx.enableAlertBeforeUnload({
            message: '资料还没保存哦~确认返回吗？',
        })
    },
    // 改变头像
    changeImage() {
        let _this = this
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            success({
                tempFiles
            }) {
                console.log(tempFiles[0].tempFilePath);
                const header_token = wx.getStorageSync('token')
                wx.uploadFile({
                    url: 'http://47.107.101.153:80/applet/student/uploadHead',
                    filePath: tempFiles[0].tempFilePath,
                    name: 'file',
                    header: {
                        'token': header_token,
                        'content-type': 'multipart/form-data'
                    },
                    success(res) {
                        console.log('我是wx.uploadFile方法', res);
                        let pic = JSON.parse(res.data).data
                        wx.getRandomValues({
                            length: 6,
                            success(res) {
                                console.log(res, 111);
                                let random = wx.arrayBufferToBase64(res.randomValues);
                                _this.setData({
                                    headAddr: `http://47.107.101.153:8080${pic}?t=${random}`
                                })
                                wx.setStorageSync('headAddr', _this.data.headAddr)
                            }
                        })
                    }
                })
            }
        })
    },
    // 保存按钮
    saveData() {
        let _this = this
        $api.editStudentInfo({
            name: _this.data.nickname,
            signature: _this.data.signature,
            sex: _this.data.sexIndex
        }).then(() => {
            wx.showToast({
                title: '保存成功',
                icon: 'success'
            })
        }).catch(() => {
            wx.showToast({
                title: '保存失败',
                icon: 'error'
            })
        })
        wx.setStorageSync('nickname', _this.data.nickname)
        wx.setStorageSync('signature', _this.data.signature)
        wx.setStorageSync('sexIndex', _this.data.sexIndex)
        wx.disableAlertBeforeUnload()
    },
    // input获取焦点
    nicknameSelect() {
        this.setData({
            nicknameFocus: true,
        })
    },
    // 修改名称
    nicknameChange(e) {
        this.setData({
            nickname: e.detail.value,
            isChange: true
        })
        // 节流
        if (flag) {
            flag = false;
            this.enableAlertBeforeUnload()
            flag = true;
        }
    },
    // input获取焦点
    signatureSelect() {
        this.setData({
            signatureFocus: true,
        })
    },
    // 修改个性签名
    signatureChange(e) {
        this.setData({
            signature: e.detail.value,
            isChange: true
        })
        if (flag) {
            flag = false;
            this.enableAlertBeforeUnload()
            flag = true;
        }
    },
    // 性别确认
    onConfirm(e) {
        var sexual = this.sexChange(e);
        this.setData({
            sexIndex: sexual,
            isChange: true
        })
        this.pickerClose();
        this.enableAlertBeforeUnload()
    },
    // 性别取消
    onCancel() {
        this.pickerClose();
    },
    // 改变性别事件
    sexChange(e) {
        const {
            value,
            index
        } = e.detail;
        return index;
    },
    // 显示底部选择器
    ShowPicker() {
        this.setData({
            show: true
        });
    },
    // 选择器关闭
    pickerClose() {
        this.setData({
            show: false
        });
    },
})
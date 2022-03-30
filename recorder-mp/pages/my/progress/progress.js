const $api = require('../../../utils/api.js').API
// pages/progress/progress.js
Page({
    data: {
      courseList: []
    },
    toProgressReport() {
    },
    toClassRecord(e) {
      let courseId = e.currentTarget.dataset.courseid;
      let courseName = e.currentTarget.dataset.coursename;
      wx.navigateTo({
        url: `../classRecord/classRecord?courseId=${courseId}&courseName=${courseName}`
      })
    },
    onLoad: function (options) {
      $api.getMyCourseList().then(({data: {data}}) => {
        console.log('我是课程列表', data);
        this.setData({
          courseList: data
        })
      })
    }
})
// pages/course/course.js
const $api = require('../../../utils/api.js').API

Page({
  data: {
    active: 0,
  },
  onChange(event) {
   
  },
  onLoad: function (options) {
    $api.courseOne(options.courseId)
    .then(res => {
      console.log(res)
    })
  }
})
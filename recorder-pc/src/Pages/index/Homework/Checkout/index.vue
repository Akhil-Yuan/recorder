<template>
  <div class="con">
    <div class="studentList">
      <div class="submitted">已提交 8 人</div>
      <div class="readover">已批阅 3 人</div>
      <div class="person">
        张三
        <span class="smallscore">100分</span>
        <span class="hasread">已读</span>
      </div>
      <div class="person">张三</div>
    </div>
    <div class="main">
      <div class="bigscore">100分</div>
      <div class="student">
        <div class="stuName">张三</div>
        <div class="upLoadTime">2022/4/10 12:45</div>
        <div class="content">作业内容</div>
      </div>
      <hr />
      <div class="teacher">
        <div class="teacherName">教师姓名</div>
        <div class="upLoadTime">2022/4/11 14:55</div>
        <div class="content">教师评语</div>
      </div>
    </div>
    <div class="mark">
      <div class="markScore">
        <span>评分：</span>
        <el-input
          v-model="markScore"
          size="small"
          class="scoreInput"
          :maxlength="3"
          max="100"
        ></el-input>
        分
      </div>
      <div class="comment">
        <el-input
          v-model="comment"
          placeholder="请输入评语"
          size="normal"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 4 }"
          :maxlength="200"
          show-word-limit
        ></el-input>
        <div class="quickComment" @click="getTips">
          <el-row>
            <el-col :span="13" :offset="0"
              ><div class="tips">作业完成的不错哦</div></el-col
            >
            <el-col :span="10" :offset="1"
              ><div class="tips">期待你的进步</div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="10" :offset="0"
              ><div class="tips">不错！继续保持</div></el-col
            >
            <el-col :span="13" :offset="1"
              ><div class="tips">加油！可以继续努力</div></el-col
            >
          </el-row>
        </div>
      </div>
      <div class="submit">
        <el-button type="primary" size="default" @click="submit" class="btn"
          >提交</el-button
        >
      </div>
      <div class="pagination">
        <div class="pre">
          <i class="el-icon-arrow-left"></i>
          <span>上一份</span>
        </div>
        <div class="next">
          <span>下一份</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  data() {
    return {
      markScore: "",
      comment: "",
    };
  },
  methods: {
    getTips({ target }) {
      if (this.comment === "") {
        this.comment += target.innerText;
      } else {
        this.comment += "，" + target.innerText;
      }
    },
    submit() {},
  },
};
</script>

<style scoped>
.con {
  margin: 0 auto;
  padding: 12px;
  width: 950px;
  height: 550px;
  background-color: rgb(214, 229, 234);
}
.studentList {
  float: left;
  width: 15%;
  height: 100%;
  padding: 5px;
  overflow: auto;
  background-color: white;
}
.submitted {
  font-size: 17px;
}
.readover {
  margin: 5px 0 15px 0;
  font-size: 12px;
  color: rgb(165, 164, 164);
}
.person {
  width: 100%;
  margin-bottom: 5px;
  font-size: 15px;
}
.person:last-child {
  margin-bottom: 0;
}
.smallscore,
.hasread {
  font-size: 12px;
  border-radius: 3px;
}
.smallscore {
  margin: 0 8px 0 25px;
  background-color: #ff6633;
  color: white;
}
.hasread {
  background-color: #ebecee;
  color: #a1a1a1;
}
.main {
  float: left;
  margin-left: 10px;
  padding: 10px 20px 0 30px;
  width: 57%;
  height: 100%;
  background-color: white;
}
.bigscore {
  float: right;
  padding: 0px 2px;
  height: 20px;
  text-align: center;
  border-radius: 3px;
  line-height: 20px;
  color: white;
  font-size: 17px;
  background-color: #ff6633;
}
.student {
  width: 100%;
  height: 40%;
}
.upLoadTime {
  font-size: 12px;
  color: rgb(165, 164, 164);
}
.content {
  padding: 20px 0 0 10px;
  width: 100%;
}
.teacher {
  width: 100%;
  height: 55%;
}
.mark {
  position: relative;
  float: right;
  padding: 10px;
  width: 25%;
  height: 100%;
  background-color: white;
}
.scoreInput {
  width: 70px;
}
.comment {
  margin-top: 20px;
}
.quickComment {
  margin-top: 20px;
}
.quickComment .el-row {
  margin-bottom: 10px;
}
.quickComment .el-row:last-child {
  margin-bottom: 0;
}
.tips {
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  background-color: #ebecee;
  text-align: center;
  color: #a1a1a1;
  cursor: pointer;
}
.submit {
  margin-top: 40px;
  text-align: center;
}
.submit .btn {
  width: 90%;
}
.pagination {
  position: absolute;
  bottom: 30px;
  left: 0;
  padding: 0 10px;
  width: 100%;
}
.pagination .pre {
  float: left;
  color: #a1a1a1;
  cursor: pointer;
}
.pagination .next {
  float: right;
  color: #a1a1a1;
  cursor: pointer;
}
.pagination i {
  font-size: 18px;
}
</style>
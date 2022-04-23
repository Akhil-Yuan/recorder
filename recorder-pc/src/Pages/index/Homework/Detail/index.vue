<template>
  <div class="con">
    <div class="msgBox">
      <div class="header">
        <div class="teacher">教师姓名</div>
        <div class="date">2022/3/23 10:00</div>
      </div>
      <div class="body">
        <div class="title">《读书》</div>
        <div class="desc">一站到底，天天向上</div>
      </div>
      <div class="footer">
        <el-button @click="back" class="back">返回</el-button>
        <el-button type="primary" @click="toAssignment" class="continue">继续布置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  methods: {
    back() {
      this.$router.back();
    },
    toAssignment() {
      this.$router.push({
        name: "assignment",
      });
    },
  },
};
</script>

<style scoped>
.con {
  margin: 0 auto;
  width: 950px;
  height: 550px;
  background-color: rgb(214, 229, 234);
}
.msgBox {
  position: relative;
  margin: 0 auto;
  padding-top: 25px;
  width: 50%;
  height: 100%;
}
.date {
  font-size: 12px;
  color: grey;
}
.body {
  margin-top: 15px;
}
.title {
  margin-left: 10px;
  font-weight: 600;
}
.desc {
  margin-top: 15px;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.continue {
    float: right;
}
.back,
.continue {
    width: 100px;
    height: 35px;
}
</style>
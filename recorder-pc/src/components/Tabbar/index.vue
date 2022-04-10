<template>
  <div class="con">
    <div class="tabbar" v-show="tabbarNeeded">
      <router-link to="/class" active-class="active">课堂</router-link>
      <router-link to="/homework" active-class="active">作业</router-link>
      <router-link to="/courseware" active-class="active">课件</router-link>
    </div>
    <div class="bread" v-show="breadNeeded">
      作业列表<i class="el-icon-arrow-right"></i>
      <span v-show="isAssign">布置作业</span>
      <span v-show="isDetail">查看详情</span>
      <span v-show="isCheckout">作业批阅</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      tabbarNeeded: true,
      breadNeeded: false,
      isAssign: false,
      isDetail: false,
      isCheckout: false,
    };
  },
  mounted() {
    console.log(this.$route);
  },
  watch: {
    $route({ name }) {
      if (name == "homework" || name == "courseware") {
        this.tabbarNeeded = true;
        this.breadNeeded = false;
      } else if (name == "assignment") {
        this.tabbarNeeded = false;
        this.breadNeeded = true;
        this.isAssign = true;
        this.isDetail = false;
        this.isCheckout = false;
      } else if (name == "detail") {
        this.tabbarNeeded = false;
        this.breadNeeded = true;
        this.isAssign = false;
        this.isDetail = true;
        this.isCheckout = false;
      } else if (name == "checkout") {
        this.tabbarNeeded = false;
        this.breadNeeded = true;
        this.isAssign = false;
        this.isDetail = false;
        this.isCheckout = true;
      }
    },
  },
};
</script>

<style scoped>
.con {
  margin: 0 auto;
  padding: 8px 0 10px 0;
  width: 950px;
}
.con a {
  font-weight: 600;
  text-decoration: none;
  color: black;
}
/* 从第二项开始 */
.con a:nth-child(n + 2) {
  margin-left: 30px;
}
.bread {
  font-weight: 600;
}
.bread i {
  font-weight: 600;
}
.active {
  color: #409eff !important;
}
</style>
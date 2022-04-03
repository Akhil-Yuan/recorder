<template>
  <div class="con">
    <!-- 布置作业 -->
    <el-button type="primary" @click="toAssignment">+ 布置作业</el-button>
    <el-row class="types">
      <el-col :span="5" :offset="0">标题</el-col>
      <el-col :span="4" :offset="0">课堂</el-col>
      <el-col :span="6" :offset="0">发布时间</el-col>
      <el-col :span="3" :offset="0">已提交</el-col>
      <el-col :span="3" :offset="0">待批改</el-col>
      <el-col :span="3" :offset="0">操作</el-col>
    </el-row>
    <!-- 下面用v-for渲染 -->
    <el-row class="detail">
      <el-col :span="5" :offset="0">作业标题</el-col>
      <el-col :span="4" :offset="0">课堂名称</el-col>
      <el-col :span="6" :offset="0">2022/3/23 23:00</el-col>
      <el-col :span="3" :offset="0">8</el-col>
      <el-col :span="3" :offset="0">3</el-col>
      <el-col :span="2" :offset="0">
        <span class="readover">批阅</span>
      </el-col>
      <el-col :span="1" :offset="0">
        <el-dropdown trigger="click" size="medium">
          <i class="el-icon-more more"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看详情</el-dropdown-item>
            <el-dropdown-item>删除作业</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Homework",
  methods: {
    toAssignment() {
      this.$router.push({
        path: "/Assignment",
      });
    },
  },
};
</script>

<style scoped>
.con {
  margin: 0 auto;
  padding: 12px 0 0 8px;
  width: 700px;
  height: 500px;
  background-color: rgb(214, 229, 234);
}
.types {
  margin-top: 12px;
  background-color: #ebebeb;
}
.detail {
  margin-top: 5px;
}
.readover {
  cursor: pointer;
}
.more {
  cursor: pointer;
}
</style>
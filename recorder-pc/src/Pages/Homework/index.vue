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
    <el-row class="detail" v-for="item in homeworkList" :key="item.courseId">
      <el-col :span="5" :offset="0">{{item.courseName}}</el-col>
      <el-col :span="4" :offset="0">课堂名称</el-col>
      <el-col :span="6" :offset="0">2022/3/23 23:00</el-col>
      <el-col :span="3" :offset="0">8</el-col>
      <el-col :span="3" :offset="0">3</el-col>
      <el-col :span="2" :offset="0">
        <span class="readover" @click="toCheckout">批阅</span>
      </el-col>
      <el-col :span="1" :offset="0">
        <el-dropdown trigger="click" size="medium">
          <i class="el-icon-more more"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="toDetail">查看详情</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="deleteHomework">删除作业</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTeacherCourses } from "../../api/api";
export default {
  name: "Homework",
  data() {
    return {
      homeworkList: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let {data} = await getTeacherCourses("getTeacherCourses");
      console.log(data);
      this.homeworkList = data;
    },
    toAssignment() {
      this.$router.push({
        name: "assignment",
      });
    },
    deleteHomework() {
      this.$confirm("", "", {
        title: "确认删除此作业吗",
        message: "该作业也会在学生端删除",
        center: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "返回",
      })
        .then(() => {
          // 向后端发送请求
        })
        .catch(() => {});
    },
    toDetail() {
      this.$router.push({
        name: "detail",
      });
    },
    toCheckout() {
      this.$router.push({
        name: "checkout",
      });
    },
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
.types {
  margin-top: 12px;
  background-color: #ebebeb;
}
.detail {
  margin-top: 5px;
}
.readover {
  cursor: pointer;
  color: #4eb6f6;
}
.more {
  cursor: pointer;
}
</style>
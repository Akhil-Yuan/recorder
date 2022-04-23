<template>
  <div class="index">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课堂" name="first">
        <ClassIndex />
      </el-tab-pane>
      <el-tab-pane label="作业" name="second">
        <Homework />
      </el-tab-pane>
      <el-tab-pane label="课件" name="third">
        <Courseware />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script>
import ClassIndex from './class/classIndex.vue'
import Homework from './Homework/index.vue'
import Courseware from './Courseware/index.vue'

export default {
  name: 'index',
  components: {
    ClassIndex,
    Homework,
    Courseware
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
  
<style scoped>
.index{
  background-color: #F2F7FB;
  min-height: calc(100%-80px);
  height: 100%;
}
/deep/ .el-tabs__nav-scroll{
  height: 60px;
  padding: 0 40px;
}
/deep/ .el-tabs__item{
  height: 60px;
  line-height: 60px;
  font-size: large;
}
</style>
  
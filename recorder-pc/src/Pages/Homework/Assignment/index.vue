<template>
  <div class="con">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="110px"
      size="normal"
      :hide-required-asterisk="true"
    >
      <el-form-item label="作业标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作业描述" prop="desc">
        <el-input type="textarea" v-model="form.desc" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="发布范围" prop="classList">
        <el-checkbox-group v-model="form.classList">
          <!-- <el-checkbox
            v-for="item in items"
            :key="item.key"
            :label="item.label"
          >
            {{ item.label }}
          </el-checkbox> -->
          <el-checkbox label="课程1"></el-checkbox>
          <el-checkbox label="课程2"></el-checkbox>
          <el-checkbox label="课程3"></el-checkbox>
          <el-checkbox label="课程4"></el-checkbox>
          <el-checkbox label="课程5"></el-checkbox>
          <el-checkbox label="课程6"></el-checkbox>
          <el-checkbox label="课程7"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="提交截止时间" prop="deadLine">
        <el-date-picker
          v-model="form.deadLine"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="cancel" @click="back">取消</el-button>
        <el-button type="primary" @click="onSubmit" class="submit"
          >立即创建</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Assignment",
  data() {
    return {
      form: {
        title: "",
        desc: "",
        classList: [],
        deadLine: "",
      },
      rules: {
        title: [{ required: true, message: "请输入作业标题", trigger: "blur" }],
        desc: [{ required: true, message: "请输入作业描述", trigger: "blur" }],
        classList: [
          {
            required: true,
            type: "array",
            message: "请选择至少一个班级",
            trigger: "change",
          },
        ],
        deadLine: [
          {
            required: true,
            type: "date",
            message: "请选择截止日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 向后端服务器发数据
          // 第一二个参数分别是消息内容和标题，为了语义化明显，统一写在第三个options对象中
          this.$confirm("", "", {
            title: "布置成功",
            message: "",
            center: true,
            confirmButtonText: "继续布置",
            cancelButtonText: "返回",
          }).then(() => {
            this.$router.go(0)
          }).catch(() => {
            this.$router.back();
          });
        } else {
          // 弹窗
          this.$notify({
            title: "提示",
            message: "请填写完整信息",
            type: "error",
            duration: 3000,
          });
        }
      });
    },
    back() {
      this.$router.push({
        name: 'homework'
      });
    },
  },
};
</script>

<style scoped>
.con {
  margin: 0 auto;
  padding: 12px 130px 0 90px;
  width: 950px;
  height: 550px;
  background-color: rgb(214, 229, 234);
}
.el-date-editor {
  width: 100%;
}
.cancel {
  width: 100px;
  position: absolute;
  top: 10px;
  left: 0;
}
.submit {
  width: 100px;
  position: absolute;
  top: 10px;
  right: 0;
}
</style>
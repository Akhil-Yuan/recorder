<template>
  <div class="con">
    <div class="bigTitle">立即注册</div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="68px"
      label-position="right"
      size="normal"
      hide-required-asterisk
    >
      <el-form-item label="姓名">
        <el-input v-model="form.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpwd">
        <el-input v-model="form.checkpwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="组织码" prop="organization">
        <el-input v-model="form.organization" maxlength="6"></el-input>
      </el-form-item>
      <div class="wall"></div>
      <el-form-item>
        <el-button type="primary" @click="register('form')" class="register"
          >立即注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: "",
        password: "",
        checkpwd: "",
        organization: "",
        teacherName: "",
      },
      rules: {
        account: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkpwd: [
          {
            trigger: "blur",
            validator: validatePass,
          },
        ],
        organization: [
          { required: true, message: "请输入组织码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.con {
  margin: 0 auto;
  padding: 0px 80px 0px 55px;
  width: 570px;
  height: 550px;
  text-align: center;
  background-color: rgb(214, 229, 234);
}
.bigTitle {
  margin-bottom: 50px;
  font-size: 28px;
}
.wall {
  margin-bottom: 35px;
}
.register {
  position: relative;
  top: -10px;
  width: 100%;
}
</style>
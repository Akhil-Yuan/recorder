<template>
  <div class="con">
    <div class="bigTitle">嗓音收集系统-教师端</div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="60px"
      label-position="right"
      size="normal"
      hide-required-asterisk
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <span class="forgetPwd">忘记密码</span>
      <el-form-item>
        <el-button type="primary" @click="login" class="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      // 后端接口
      this.$router.replace({
        name: "homework",
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
.login {
  position: relative;
  top: -10px;
  width: 100%;
}
.forgetPwd {
  position: relative;
  top: -18px;
  float: right;
  font-size: 13px;
}
</style>
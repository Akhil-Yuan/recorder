<template>
  <div class="con">
    <el-button slot="reference" @click="visible_upload = true"
      >+ 上传课件</el-button
    >
    <el-dialog title="上传课件" :visible.sync="visible_upload" width="30%">
      <div>
        <!-- 浏览文件 -->
        <el-upload
          class="upload"
          ref="upload"
          action=""
          accept="image/*, .pdf, .ppt, .doc"
          :limit="1"
          :data="params"
          :auto-upload="false"
          :on-exceed="overLoad"
          :before-upload="checkFile"
        >
          <el-button slot="trigger" size="small">浏览</el-button>
          <div slot="tip" class="el-upload_tip">单个文件限制在1G内</div>
        </el-upload>
        <!-- 发布范围 -->
        <div class="range">
          <span>发布范围：</span>
          <!-- 下面div等接口弄好之后用v-for渲染 -->
          <div class="class">
            <el-checkbox v-model="checked" class="className">课堂1</el-checkbox>
          </div>
        </div>
        <!-- 上传到服务器、取消 -->
      </div>
      <span slot="footer">
        <el-button
          size="small"
          class="upload_cancel"
          @click="visible_upload = false"
          >取消</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="submitUpload"
          class="upload_send"
          >立即上传</el-button
        >
      </span>
    </el-dialog>
    <el-row class="types">
      <el-col :span="5" :offset="0">文件名称</el-col>
      <el-col :span="4" :offset="0">课堂</el-col>
      <el-col :span="6" :offset="0">上传时间</el-col>
      <el-col :span="3" :offset="0">已查看</el-col>
      <el-col :span="6" :offset="0">操作</el-col>
    </el-row>

    <el-row class="detail">
      <!-- 下面等接口弄好后用v-for渲染 -->
      <el-col :span="5" :offset="0">秋名山漂移教程</el-col>
      <el-col :span="4" :offset="0">三年二班</el-col>
      <el-col :span="6" :offset="0">2022/3/23 23:00</el-col>
      <el-col :span="3" :offset="0">9</el-col>
      <el-col :span="3" :offset="0">下载</el-col>
      <el-col :span="3" :offset="0">
        <span class="delete" @click="visible_delete = true">删除</span>
        <el-dialog :visible.sync="visible_delete" width="20%">
          <div class="delete_body">
            <div class="title_delete">确认删除此课件吗</div>
            <div class="tips_delete">该课件也会在学生端删除</div>
          </div>
          <div slot="footer" class="delete_footer">
            <el-button @click="visible_delete = false" class="delete_cancel"
              >返回</el-button
            >
            <el-button
              type="primary"
              @click="confirmDelete"
              class="delete_confirm"
              >确认删除</el-button
            >
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Courseware",
  data() {
    return {
      checked: "",
      visible_upload: false,
      visible_delete: false,
      params: {},
    };
  },
  mounted() {},
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      this.visible_upload = false;
    },
    confirmDelete() {
      this.visible_delete = false;
    },
    checkFile(file) {
      // 提取文件后缀名
      let fileType = file.name.slice(file.name.indexOf(".") + 1);
      console.log(fileType);
      // 进行筛选
    },
    overLoad(files, fileList) {
      console.log(files, fileList);
      this.$message('一次只能上传一个课件');
    }
  },
};
</script>

<style scoped>
.con {
  margin: 0 auto;
  padding: 12px 0 0 8px;
  width: 950px;
  height: 550px;
  background-color: rgb(214, 229, 234);
}
.el-upload_tip {
  margin-top: 10px;
}
.range {
  margin-top: 20px;
}
.types {
  margin-top: 12px;
  background-color: #ebebeb;
}
.detail {
  margin-top: 5px;
}
.class {
  display: inline-block;
}
.className {
  font-size: px;
}
.upload_cancel,
.upload_send {
  width: 85px;
  height: 30px;
  font-size: 14px;
}
.delete {
  cursor: pointer;
}
.delete_body {
  margin-top: -20px;
}
.title_delete {
  text-align: center;
  font-size: 24px;
}
.tips_delete {
  margin-top: 24px;
  text-align: center;
  font-size: 16px;
}
.delete_footer {
  margin-top: 20px;
}
.delete_cancel {
  width: 30%;
  position: absolute;
  bottom: 20px;
  left: 20px;
}
.delete_confirm {
  width: 30%;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
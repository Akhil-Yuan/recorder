<template>
  <div class="classroom">
    <div class="list">
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple">
            <div class="listOne">
                <span class="title">音乐欣赏</span>
                <el-popover
                  placement="top"
                  width="160"
                  v-model="isClear">
                  <p class="clearTitle">确定删除课程吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="isClear = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="clearClass">确定</el-button>
                  </div>
                  <i class="el-icon-more deleteicon" slot="reference"></i>
                </el-popover>
                <span class="classNum">课程号：123456</span>
                <template>
                    <el-button type="primary" class="classbtn" @click="dialogFormVisible = true">开始上课</el-button>
                </template>
                <el-dialog title="发送链接" :visible.sync="dialogFormVisible" width="40%">
                    <el-form :model="form" :rules="rules" ref="form">
                        <el-form-item label="会议链接" :label-width="formLabelWidth" prop="classLink">
                            <el-input v-model="form.classLink" autocomplete="off" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="其他信息" :label-width="formLabelWidth" prop="classInfo">
                            <el-input v-model="form.classInfo" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sendCancel">取 消</el-button>
                        <el-button type="primary" @click="sendLink('form')">确 定 发 送</el-button>
                    </div>
                </el-dialog>
                <el-button class="managebtn" @click="toManage">课堂管理</el-button>
            </div>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
            <div class="listOne" @click="dialogFormAdd = true">
                <i class="el-icon-plus addicon"></i>
                <span class="addTitle">新增课堂</span>
            </div>
        </div></el-col>
        <el-dialog title="新建课堂" :visible.sync="dialogFormAdd" width="40%">
            <el-form :model="addForm" :rules="addRules" ref="addForm">
                <el-form-item label="课程名称" :label-width="formLabelWidth" placeholder="必填" prop="className">
                    <el-input v-model="addForm.className" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程教师" :label-width="formLabelWidth" placeholder="必填" prop="teacher">
                    <el-input v-model="addForm.teacher" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程封面" :label-width="formLabelWidth" prop="classImg">
                    <el-upload
                    ref="upload"
                    :on-change="onChange" 
                    :limit="1"
                    autocomplete="off"
                    action="#"
                    style="text-align: left !important;"
                    list-type="picture-card"
                    :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt="" 
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                  v-if="!disabled"
                                  class="el-upload-list__item-delete"
                                  @click="handleRemove(file)"
                                >
                                  <i class="el-icon-delete"></i>
                                </span>
                              </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="addForm.classImg" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCancel">取 消</el-button>
                <el-button type="primary" @click="addClass('addForm')">确 定 新 增</el-button>
            </div>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>
    
<script>
export default {
name: 'ClassIndex',
inject: ['reload'],
data () {
    return {
        dialogFormVisible: false,
        form: {
          classInfo: '',
          classLink: ''
        },
        formLabelWidth: '100px',
        dialogFormAdd: false,
        addForm: {
            className: '',
            teacher: '',
            classImg: null
        },
        rules: {
            classLink: [
                {required: true, message: '会议链接不能为空!'}
            ]
        },
        addRules: {
            className: [
                {required: true, message: '课堂名称不能为空!'}
            ],
            teacher: [
                {required: true, message: '课程教师不能为空!'}
            ]
        },
        dialogVisible: false,
        disabled: false,
        isClear: false
    }
},
methods: {
    sendLink(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            console.log(this.form)
          } else {
            return false;
          }
        })
    },
    clearClass() {
      this.isClear = false
    },
    addClass(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormAdd = false
            console.log(this.addForm)
          } else {
            return false;
          }
        })
    },
    handleRemove(file) {
      let fileList = this.$refs.upload.uploadFiles
      let index = fileList.findIndex( fileItem => {return fileItem.uid === file.uid})
      fileList.splice(index, 1)
      this.addForm.classImg = null
        console.log(file)
    },
    onChange(file) {
      console.log('11111',file)
      this.addForm.classImg = file.raw
    },
    sendCancel() {
      this.dialogFormVisible = false
      this.form = {
        classInfo: '',
        classLink: ''
      }
      this.reload()
    },
    addCancel() {
      this.dialogFormAdd = false
      this.addForm = {
          className: '',
          teacher: '',
          classImg: null
      }
      this.reload()
    },
    toManage() {
      this.$router.push({path:'/manage'})
    }



    }
     
}
</script>

<style scoped>
.list{
  width: 100%;
}
.listOne{
  background-color: #ffffff;
  width: 300px;
  height: 165px;
  position: relative;
  margin: 20px auto;
}
.title{
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: large;

}
.deleteicon{
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: large;
}
.classNum{
  position: absolute;
  top: 50px;
  left: 20px;
  color: #CACACA;
}
.classbtn{
  position: absolute;
  bottom: 20px;
  left: 30px;
}
.managebtn{
    position: absolute;
    bottom: 20px;
    right: 30px;
}
.addicon, .addTitle{
    font-weight: 600;
    font-size: large;
    color: #169BD5;
    display: block;
}
.addicon{
    font-size: xxx-large;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
}
.addTitle{
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
}
.clearTitle{
  line-height: 40px;
  text-align: center;
}

/* 布局样式 */
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
    
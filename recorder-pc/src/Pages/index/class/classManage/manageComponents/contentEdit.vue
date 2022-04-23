<template>
    <div class="contentEdit">
        <div class="top">
            <el-button icon="el-icon-arrow-left" circle class="back" @click="toContent"></el-button>
            <span class="title">内容管理 > 编辑章节内容</span>
        </div>
        <el-container>
            <el-aside width="350px" style="background-color: #ebebeba9;">
                <el-button icon="el-icon-plus" class="addIcon" @click="peerDialog = true">添加目录</el-button>
                <el-dialog title="添加目录" :visible.sync="peerDialog" style="text-align: left;" width="40%">
                    <el-form :model="peerForm" ref="peerForm" :rules="peerRules">
                      <el-form-item label="目录名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="peerForm.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="目录位置" :label-width="formLabelWidth" prop="side">
                        <el-input v-model="peerForm.side" autocomplete="off" placeholder="如1、1-1、1-1-1"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="peerCancel">取 消</el-button>
                      <el-button type="primary" @click="addPeer('peerForm')">确 定</el-button>
                    </div>
                </el-dialog>
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#ebebeba9" @select="select">
                    <el-submenu index="1" background-color="#ebebeba9" v-for="item1,index1 in classList" :key="index1">
                        <template slot="title">
                            <span>{{item1.name}}</span>
                        </template>
                        <el-submenu index="1-1" v-for="item2,index2 in item1.childList" :key="index2">
                            <template slot="title">{{item2.name}}</template>
                            <el-menu-item index="1-1-1" v-for="item3,index3 in item2.childList" :key="index3">{{item3.name}}</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                    <el-form-item prop="file">
                        <el-upload
                        class="upload-demo"
                        action="#"
                        :on-change="handleChange"
                        :file-list="fileList"
                        :auto-upload="false">
                            <el-button size="small" icon="el-icon-link">添加附件</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="name" label="目录名称">
                        <el-input type="textarea" autosize placeholder="请输入目录名称" v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="word" label="文字内容">
                        <el-input type="textarea" autosize placeholder="请输入文字内容" v-model="addForm.word"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right;">
                        <el-button type="primary" @click="submitForm('addForm')" style="margin-top: 40px;">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
name: 'ContentEdit',
data () {
    return {
        fileList: [],
        comName: '',
        addForm: {
            file: null,
            name: '',
            word: ''
        },
        rules: {
            file: { required: true, message: '文件不能为空'},
            word: { required: true, message: '内容不能为空'},
            name: { required: true, message: '目录名称不能为空'}
        },
        classList:[{
            name: '1',
            childList: [{
                name:'1-1',
                childList: [{
                    name: '1-1-1'
                }]
            }]
        },{
            name: '2',
            childList: [{
                name:'2-1',
                childList: [{
                    name: '2-1-1'
                }]
            }]
        },],
        formLabelWidth: '100px',
        peerDialog: false,
        peerForm: {
            name: '',
            side: ''
        },
        peerRules: {
            name: { required: true, message: '名称不能为空'},
            side: { required: true, message: '位置不能为空'}
        }
    }
},
methods: {
    handleChange(file) {
        console.log(file)
        let newList = {
            name: file.name
        }
        this.fileList.push(newList)
        this.addForm.file = file.raw
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.addForm)
          } else {
            return false;
          }
        })
    },
    addPeer(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.peerDialog = false
            console.log(this.peerForm)
          } else {
            return false;
          }
        })
    },
    peerCancel() {
        this.peerDialog = false
        this.peerForm = {
          name: '',
          side: ''
        }
    },
    select(index) {
        console.log(index)
        this.addForm.name = index
    },
    toContent() {
        this.comName = 'Content'
        this.$emit('comChange', this.comName)
    }
}
}
</script>

<style scoped>
.contentEdit{
    padding: 0 20px;
    margin-bottom: 50px;
}
.top{
    height: 50px;
    text-align: left;
    margin-bottom: 20px;
}
.back{
    margin-right: 20px;
}
.title{
    line-height: 50px;
}
.el-menu-vertical-demo{
    text-align: left;
}
.addIcon{
    margin: 20px 20px;
}
.upload-demo{
    text-align: left;
}
</style>

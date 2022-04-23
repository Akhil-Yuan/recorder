<template>
    <div class="noteList">
        <div class="title">通知列表</div>
        <div class="listOne" @click="showList">
            <el-row>
                <el-col :span="2">
                    <div class="top"><div class="noteImg">通知</div></div>
                </el-col>
                <el-col :span="18">
                    <div class="center">
                        <div class="noteName">消息名称</div>
                        <div class="info">
                            <span class="className">收件人：班级名称</span>
                            <span class="readNum">已读：3/42</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4"><div class="bottom">
                    <span class="time">2022/3/23</span>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-s-fold delete" slot="reference"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">置顶通知</el-dropdown-item>
                          <el-dropdown-item command="b">删除通知</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dialog title="删除通知" :visible.sync="deletaDialog" style="text-align: left;" width="30%">
                        <span>删除后，该通知也会在学生端删除，确定删除吗？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="deletaDialog = false">取 消</el-button>
                            <el-button type="primary" @click="deleteNote">确 定</el-button>
                        </span>
                    </el-dialog>
                </div></el-col>
            </el-row>
        </div>
        <el-dialog title="消息名称" :visible.sync="noteDialog" style="text-align: center;" width="30%">
        <span>消息内容</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="noteDialog = false">确 定</el-button>
        </span>
        </el-dialog>
        <el-button type="primary" icon="el-icon-plus" class="addIcon" @click="addDialog = true">新建通知</el-button>
        <el-dialog title="新建通知" :visible.sync="addDialog" style="text-align: left;" width="40%">
            <el-form :model="addForm" ref="addForm" :rules="addRules">
              <el-form-item label="通知名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="addForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="正文内容" :label-width="formLabelWidth" prop="content">
                <el-input v-model="addForm.content" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="收件人" :label-width="formLabelWidth" prop="person">
                <el-checkbox-group v-model="addForm.person">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addCancel">取 消</el-button>
              <el-button type="primary" @click="addNote('addForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
name: 'NoteList',
data () {
    return {
        formLabelWidth: '100px',
        deletaDialog: false,
        addDialog: false,
        addForm:{
            name: '',
            content: '',
            person: []
        },
        addRules: {
            name: [
                {required: true, message: '通知名称不能为空!'}
            ],
            content: [
                {required: true, message: '通知标题不能为空!'}
            ],
            person: [
                {required: true, message: '收件人不能为空!'}
            ]
        },
        noteDialog: false
    }
},
methods: {
    handleCommand(command) {
        console.log(command)
        if(command == 'b') {
            this.showDelete()
        }
    },
    deleteNote() {
        this.deletaDialog = false
        console.log('删除成功')
    },
    showDelete() {
        this.deletaDialog = true
    },
    addNote(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addDialog = false
            console.log(this.addForm)
            this.$message({
                message: '通知发布成功!',
                type: 'success'
            })
          } else {
            return false;
          }
        })
    },
    addCancel() {
        this.addDialog =false
        this.addForm = {
            name: '',
            content: '',
            person: []
        }
    },
    showList() {
        this.noteDialog = true
    }
}
}
</script>

<style scoped>
.noteList{
    padding-left: 20px;
    text-align: right;
}    
.title{
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: large;
}    
.listOne{
    height: 60px;
    border-top: #cacaca61 solid 1px;
    margin-bottom: 100px;
}
.top{
    height: 60px;
    justify-content:center;
    align-items:center;
    display:-webkit-flex;
}
.noteImg{
    background-color: red;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
}
.center{
    height: 60px;
    text-align: left;
}
.noteName{
    font-size: large;
    height: 35px;
    line-height: 35px;
}
.info{
    color: #CACACA;
    font-size: small;
}
.className{
    margin-right: 50px;
}
.bottom{
    height: 60px;
    line-height: 60px;
    color: #CACACA;
    font-size: medium;
}
.delete{
    margin-left: 20px;
    font-size: x-large;
}
</style>

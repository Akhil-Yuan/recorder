<template>
    <div class="nameList">
        <div class="title">音乐欣赏</div>
        <div class="classNum">学生人数:40人</div>
        <el-table :data="tableData" :stripe="true" :header-cell-style="{backgroundColor: '#ebebeba9'}">
            <el-table-column prop="num" label="学生编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="学生姓名" width="180">
            </el-table-column>
            <el-table-column prop="time" label="加入课程时间">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式">
            </el-table-column>
            <el-table-column label="操作">
                <el-button icon="el-icon-delete" circle @click="deleteDialog = true"></el-button>
            </el-table-column>
        </el-table>
        <el-dialog title="删除课程" :visible.sync="deleteDialog" width="30%" style="text-align: left;">
        <span>删除将导致所有数据无法找回，请慎重操作，确定删除吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="deleteList">确 定</el-button>
        </span>
        </el-dialog>
        <el-button type="primary" icon="el-icon-plus" class="addbtn" @click="addDialog = true">添加学生</el-button>
        <el-dialog title="添加学生" :visible.sync="addDialog" style="text-align: left;" width="40%">
            <el-form :model="form" ref="form" :rules="rules">
              <el-form-item label="学生名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addCancel">取 消</el-button>
              <el-button type="primary" @click="addList('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
name: 'NameList',
components: {
},
data () {
    return {
        tableData: [{
          num: '01',
          name: '张三',
          time: '2022/3/23',
          phone: '1234567'
        },{
          num: '01',
          name: '张三',
          time: '2022/3/23',
          phone: '1234567'
        }],
        deleteDialog: false,
        addDialog: false,
        form: {
          name: '',
          phone: ''
        },
        formLabelWidth: '120px',
        rules: {
            name: [
                {required: true, message: '学生姓名不能为空!'}
            ],
            phone: [
                {required: true, message: '联系方式不能为空!'}
            ]
        },
    }
},
methods: {
    deleteList(done) {
        this.deleteDialog =false
    },
    addCancel() {
        this.addDialog = false
        this.form = {
          name: '',
          phone: ''
        }
        location.reload()
    },
    addList(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addDialog = false
            console.log(this.form)
          } else {
            return false;
          }
        })
    }
}
}
</script>

<style scoped>
.nameList{
    padding: 0 20px;
    text-align: right;
}
.title{
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: large;
}
.classNum{
    height: 40px;
    color: rgba(0, 0, 0, 0.322);
    text-align: left;
}
/deep/.el-table{
    width: 100%;
    margin-bottom: 100px;
}
.addbtn{
    margin-bottom: 40px;
}
</style>

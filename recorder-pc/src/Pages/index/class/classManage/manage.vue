<template>
    <div class="manage">
            <div class="top">
                <el-button icon="el-icon-arrow-left" circle class="back" @click="toIndex"></el-button>
                课程管理
            </div>
        <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="班级名单"><NameList></NameList></el-tab-pane>
            <el-tab-pane label="内容管理">
                <component :is="comManage" @comChange="comChange"></component>
            </el-tab-pane>
            <el-tab-pane label="通知管理">
                <component :is="comNote" @comChangeNote="comChangeNote"></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import NameList from './manageComponents/nameList.vue'
import Content from './manageComponents/content.vue'
import ContentEdit from './manageComponents/contentEdit.vue'
import NoteList from'./noteComponents/noteList.vue'
import ContentDetail from './manageComponents/contentDetail.vue'

export default {
name: 'manage',
components: {
    NameList,
    Content,
    ContentEdit,
    NoteList,
    ContentDetail
},
data () {
    return {
        tabPosition: 'left',
        comManage: 'Content',
        comNote: 'NoteList'
    }
},
methods: {
    comChange(data) {
        console.log(data)
        this.comManage = data
    },
    comChangeNote(data) {
        this.comNote = data
    },
    toIndex() {
        this.$router.push({path: '/index'})
    }
}
}
</script>

<style scoped>
.manage{
    padding: 0 40px;
}    
.top{
    font-size: large;
    text-align: left;
    height: 70px;
    line-height: 70px;
    font-weight: 600;
}
/deep/.el-tabs{
    background-color: #ffffff;
}
/deep/.el-tabs--left .el-tabs__item.is-left{
    width: 100px;
}
.back{
    margin: 0 20px;
}
</style>

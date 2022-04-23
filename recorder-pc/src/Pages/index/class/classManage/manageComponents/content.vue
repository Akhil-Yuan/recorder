<template>
    <div class="content">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#ebebeba9" @select="select">
            <el-submenu index="1" v-for="item1,index1 in classList" :key="index1">
                <template slot="title">
                    <span>{{item1.name}}</span>
                </template>
                <el-submenu index="1-1" v-for="item2,index2 in item1.childList" :key="index2">
                    <template slot="title">{{item2.name}}</template>
                    <el-menu-item index="1-1-1" v-for="item3,index3 in item2.childList" :key="index3">{{item3.name}}</el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
        <el-button type="primary" class="edit" @click="toEdit">编辑章节内容</el-button>
    </div>
</template>

<script>
export default {
name: 'Content',
data () {
    return {
        comName: '',
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
    }
},
methods: {
    toEdit() {
        this.comName = 'ContentEdit'
        this.$emit('comChange', this.comName)
    },
    select(index) {
        console.log(index)
        this.comName = 'ContentDetail'
        this.$emit('comChange', this.comName)
    }
}
}
</script>

<style scoped>
.content{
    text-align: right;
}    
.el-menu-vertical-demo{
    text-align: left;
    margin: 0 40px;
    margin-bottom: 100px;
}
.edit{
    margin-right: 40px;
    margin-bottom: 40px;
}
</style>

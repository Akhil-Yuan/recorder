<template>
    <div class="contentDetail">
        <div class="top">
            <el-button icon="el-icon-arrow-left" circle class="back" @click="toContent"></el-button>
            <span class="title">内容管理 > 编辑章节内容</span>
        </div>
        <el-container>
            <el-aside style="background-color: #ebebeba9;">
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
                <div class="content">
                    <div class="comTitle">经典曲目欣赏</div>
                    <div class="file">文件内容暂为空~</div>
                    <div class="word">请欣赏任意经典曲目，并尝试模仿练习。</div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
name: 'ContentDetail',
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
    select(index) {
        console.log(index)
    },
    toContent() {
        this.comName = 'Content'
        this.$emit('comChange', this.comName)
    }
}
}
</script>

<style scoped>
.contentDetail{
    padding: 0 20px;
}    
.content{
    height: 300px;
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
.comTitle{
    height: 50px;
    line-height: 50px;
    font-size: large;
    font-weight: 600;
}
.file{
    background-color:#ebebeba9;
    color: rgba(0, 0, 0, 0.313);
    height: 150px;
    text-align: left;
    padding: 20px;
}
.word{
    margin: 20px;
    text-align: left;
    font-size: medium;
}
/deep/.el-main{
    padding: 0 20px !important;
}
</style>

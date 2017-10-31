<template>
    <!--
    作者：李文达Leo
    手机：15040481637
    时间：2017年8月1日
    模块：归文管理列表
    -->
<div>
    <div class="lmgl__content__btn">
        <el-button v-for="nb in navBtn" type="primary" :key="nb.key" :disabled="nb.disable" @click="btnclick(nb.lable)">{{ nb.lable }}</el-button>
    </div>
    <div class="lmgl__content__list">
        <el-table ref="multipleTable" :data="contentList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="NRBT" label="标题"></el-table-column>
            <el-table-column prop="ZYX" label="重要性" width="120" align="center"></el-table-column>
            <el-table-column prop="SXRQ" label="发布日期" width="120" align="center"></el-table-column>
            <el-table-column prop="XXRQ" label="下线日期" width="120" align="center"></el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import backGdwz from '@/services/manage/wzgl/backGdwz.js';
import delGdwz from '@/services/manage/wzgl/delGdwz.js';

    export default {
        data(){
            return {
                navBtn: [
                    { key: 1,lable: "还原",disable: true},
                    { key: 2,lable: "删除",disable: true},
                ],
                multipleSelection:[],
            } 
        },
        props:{
            contentList:{
                type:Array,
                default : []
            },
            uuid:{
                type:String,
                default : '1234567'
            }
        },
        methods: {
            btnclick: function(val) {
                if (val==="还原") {
                    this.huanYuan();
                } else if (val==="删除") {
                    this.delete();
                }
            },
            delete: function () {
                console.log("要发送进行删除处理了+"+this.uuid+this.multipleSelection)
                let param = {
                    uuid:this.uuid,
                    obj:this.multipleSelection,
                }
                delGdwz(param).then(data => {
                    if(data.status==="success"){
                      _self.checked = !_self.checked;
                      this.$message({
                        message: '成功',
                        type: 'success',
                        duration: 2000
                      });
                    }else{
                      this.$message({
                        message: '失败，请联系管理员'+data.result,
                        type: 'error',
                      });
                    } 
                }).catch(date => {
                    this.$message({
                      message: '成功',
                      type: 'success',
                    });
                })
            },
            huanYuan: function () {
                let param = {
                    uuid:this.uuid,
                    obj:this.multipleSelection,
                }
                backGdwz(param).then(data => {
                    if(data.status==="success"){
                      _self.checked = !_self.checked;
                      this.$message({
                        message: '成功',
                        type: 'success',
                        duration: 2000
                      });
                    }else{
                      this.$message({
                        message: '失败，请联系管理员'+data.result,
                        type: 'error',
                      });
                    } 
                }).catch(date => {
                    this.$message({
                      message: '成功',
                      type: 'success',
                    });
                })
                console.log("要发送进行还原处理了+"+this.uuid+this.multipleSelection)
            },
            //在栏目管理表格复选框改变时
            handleSelectionChange: function (val){
                this.multipleSelection = val;

                if(this.multipleSelection.length > 0){
                    this.navBtn[0].disable = false;
                    this.navBtn[1].disable = false;
                } else {
                    this.navBtn[0].disable = true;
                    this.navBtn[1].disable = true;
                }
            }
        }
    }
</script>

<style scoped>
    .lmgl__content__btn{
        margin-bottom: 10px;
    }
</style>
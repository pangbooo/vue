<template>
    <!--
        作者：李文达Leo
        手机：15040481637
        时间：2017年8月1日
        模块：文章评论管理列表
        -->
    <div>
        <div class="lmgl__content__btn">
            评论查看方式：
            <el-select v-model="typePingLun" @change="getPLData">
                <el-option label="显示未审核评论" value=""></el-option>
                <el-option label="显示审核不通过评论" value="0"></el-option>
                 <el-option label="显示审核通过评论" value="1"></el-option>
                <el-option label="显示所有评论" value="3"></el-option>
            </el-select>
            <el-button v-for="nb in navBtn" type="primary" :key="nb.key" :disabled="nb.disable" @click="btnclick(nb.lable)">{{ nb.lable }}</el-button>
        </div>
        <div class="lmgl__content__list">
            <el-table ref="multipleTable" :data="contentList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                 <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="PLR" label="评论人"  width="150" ></el-table-column>
                <el-table-column prop="PLNR" label="内容"align="left"></el-table-column>
                <el-table-column prop="INSERT_DATE" label="评论时间" width="180" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import allpartPlgl from '@/services/manage/wzgl/allpartPlgl.js';
import { getTime } from '@/lib/publicFun.js';
import delPL from '@/services/manage/wzgl/deletePL.js';
import {updateWhetherPassByUuid} from '@/api/manage.js';
export default {
    data() {
        return {
            multipleSelection: [],
            totalpage: 0,
            navBtn: [
                { key: 1, lable: "审核通过", disable: true },
                { key: 2, lable: "审核不通过", disable: true },
                { key: 3, lable: "删除", disable: true }
            ],
           
        }
    },
    props: {
        uuid: {
            type: String,
            default: '1234343'
        },
         contentList: {
             type: Array,
             default: []
         },
         typePingLun: {
             type: String,
             default: '1'
         }
    },created(){
       // this.getPLData();
    },
    methods: {
        btnclick: function(val){
            if (val === "审核通过") {
                this.SH('pass');
            } else if (val === "审核不通过") {
                this.SH('nopass');
            } else if (val === "删除") {
                this.deletePL();
            }
        },
        //在栏目管理表格复选框改变时
        handleSelectionChange: function(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.navBtn[0].disable = false;
                this.navBtn[1].disable = false;
                this.navBtn[2].disable = false;
            } else {
                this.navBtn[0].disable = true;
                this.navBtn[1].disable = true;
                this.navBtn[2].disable = true;
            }
        },
        SH: function(zt){
            let args = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                args.push(this.multipleSelection[i].UUID);
            }
            let params = { uuids: args,whetherPassType:zt };
            updateWhetherPassByUuid(params).then(res => {
                if (res.status === "success") {
                    this.$message.success('操作成功！');
                    this.$emit('reloadGrid');
                } else {
                    this.$message.error('操作失败，请联系管理员！');
                }
            });
        },
        deletePL: function(){
             let args = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                args.push(this.multipleSelection[i].UUID);
            }
            let params = { uuids: args };
            delPL(params).then(res => {
                if (res.status === "success") {
                    this.$message.success('删除成功！');
                    this.$emit('reloadGrid');
                } else {
                    this.$message.error('删除失败，请联系管理员！');
                }
            });
        },
        getPLData: function(val) {
             this.$emit("typePingLun-change",val)
        }
    }
}
</script>

<style scoped>
.lmgl__content__btn {
    margin-bottom: 10px;
}
</style>
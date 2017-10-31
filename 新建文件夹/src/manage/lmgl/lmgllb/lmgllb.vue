/*    栏目管理下的栏目管理列表
        作者：马日
        QQ： 995401608
        tel：13478470501
        时间： 2017年8月31日
*/
<template>
<div>
    <div class="lmgl__content" v-show="lmglshow">
        <div class="lmgl__content__btn" v-if="(lmqx.XGQX)">
            <el-button v-for="nb in navBtn" :key="nb.key" type="primary" :disabled="nb.disable">{{ nb.lable }}</el-button>
        </div>
        <div class="lmgl__content__list">
            <el-table ref="multipleTable" :data="lmglContentList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="LMMC" label="显示名称" width="150"></el-table-column>
                <el-table-column prop="LMDM" label="栏目代码" width="150"></el-table-column>
                <el-table-column prop="LMLX" label="类型" width="100"></el-table-column>
                <el-table-column prop="ZMB" label="主模板|链接"></el-table-column>
                <!--<el-table-column prop="ZT" label="状态" width="100"></el-table-column>-->
            </el-table>
            <div class="lmgl__content__page">
                <idt-pagination class="lmgl__content__page__idtpagination" :currentPage="nowPage" :totalPage="totalRows" :pageSize="pageSize" @size-change="changePageSize" @current-change="changeNowpage"></idt-pagination>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import idtpagination from '@/components/pagination/index.vue';

import getWebLmqx from '@/services/manage/lmgl/getLmqx.js';
import getLmgl from '@/services/manage/lmgl/getLmgl.js';

export default {
    data() {
        return {
            lmglshow: true,
            lmqx: {
                XGQX: true
            },
            navBtn: [
                { key: 1,lable: "新建栏目",disable: false },
                { key: 2,lable: "快速新建栏目",disable: false },
                { key: 3,lable: "重命名",disable: true },
                { key: 4,lable: "删除",disable: true },
                { key: 5,lable: "复制",disable: true },
                { key: 6,lable: "剪切",disable: true },
                { key: 7,lable: "粘贴",disable: true },
                { key: 8,lable: "排序",disable: false }
            ],
            lmglContentList: [],
            multipleSelection: [],
            nowPage: 1,
            pageSize: 10,
            totalRows: 100,
        }
    },
    props: { 
        lmid: {
            type: String,
            default: ''
        }
    },
    watch: {
        lmid(val,oldVal){
            if(val){
                this.getData(val);
            }
        }
    },
    created() {

    },
    methods: {
        getData(val){
            let params = { 
                nowPage: this.nowPage,
                pageSize: this.pageSize,
                puuid: val
            };
            getLmgl(params).then(data => {
                // console.log(data);
                if(data.status === "success"){
                    this.lmglContentList = data.data.DataList;
                    this.totalRows = data.data.totalRows;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data => {
                this.$message.error('网络连接异常，请检查网络111！');
            });
        },
        changePageSize(val){
            this.pageSize = val;
        },
        changeNowpage(val){
            this.nowPage = val;
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        getLmqx(val){
            var self = this;
            let params = {};
            params.lmid = val;
            getWebLmqx(params).then(res => {
                console.log(res);
                this.lmqx=res.data;
                if(this.lmqx.LLQX=='1'){
                    let params = { 
                        nowPage: self.nowPage,
                        pageSize: self.pageSize,
                        puuid: val
                    };
                    getLmgl(params).then(data => {
                        console.log(data);
                        if(data.status === "success"){
                            this.lmglContentList = data.data.DataList;
                            this.totalRows = data.data.totalRows;
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');
                        }
                    }).catch(data => {
                        this.$message.error('网络连接异常，请检查网络111！');
                    });
                }
            });
        },
    },
    components: {
        'idt-pagination':idtpagination
    }
}
</script>

<style scoped>
.lmgl__content__btn{
    margin: 0 0 15px 0;
}
.lmgl__content__page{
    margin-top: 10px;
    width: 575px;
    float: right;
}
.lmgl__content__page__idtpagination{
    float: right;    
}
</style>
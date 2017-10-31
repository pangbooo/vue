/*
 * @文档描述: 评价结果（总体）
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-09-26 10:36:35 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-09-27 21:05:39
 */
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="pjjg" id="pjjg">
        <div class="pjjg__content">
            <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
            <div class="pjjg__content__line"></div>
            <div class="pjjg__content__table">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column label="序号" width="65" :formatter="getXh"></el-table-column>
                    <el-table-column prop="DWMC" show-overflow-tooltip label="单位名称" width=""></el-table-column>
                    <el-table-column prop="AVG" show-overflow-tooltip label="平均分" width="100"></el-table-column>
                    <el-table-column prop="5" show-overflow-tooltip label="五星" width="100"></el-table-column>
                    <el-table-column prop="4" show-overflow-tooltip label="四星" width="100"></el-table-column>
                    <el-table-column prop="3" show-overflow-tooltip label="三星" width="100"></el-table-column>
                    <el-table-column prop="2" show-overflow-tooltip label="二星" width="100"></el-table-column>
                    <el-table-column prop="1" show-overflow-tooltip label="一星" width="100"></el-table-column>
                </el-table>
            </div>
            <div class="pjjg__content__pagination">
                <idt-pagination :currentPage="nowPage" :totalPage="totalRows" :pageSize="pageSize" @size-change="changePageSize" @current-change="changeNowpage"></idt-pagination>
            </div>
            <div style="clear: both;"></div>
        </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
</div>    
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header.vue';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtpagination from '@/components/pagination/index.vue';
import idtfooter from '@/InternetPlus/common/footer/footer.vue';
import idtfloatbar from '@/InternetPlus/common/floatbar/floatbar.vue';

import { getPjjgBmList } from '@/api/common.js';

export default {
    data() {
        return {
            page: 'pjjg',
            params: [],
            tableData: [],
            nowPage: 1,
            pageSize: 10,
            totalRows: 100
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar': idtnavbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-pagination': idtpagination,
        'idt-footer': idtfooter,
        'idt-floatbar': idtfloatbar
    },
    created() {
        this.getpjjgdata();
    },
    methods: {
        getXh(row, column) {
            return ((this.nowPage - 1) * this.pageSize + this.tableData.indexOf(row) + 1);
        },
        getpjjgdata(){
            let params = {
                nowPage: this.nowPage,
                pageSize: this.pageSize
            };
            getPjjgBmList(params).then(res => {
                if(res.status === 'success'){
                    this.tableData = res.data.DataList;
                    this.totalRows = res.data.totalRows;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
        changeNowpage(val){
            this.nowPage = val;
            this.getpjjgdata();            
        },
        changePageSize(val){
            this.pageSize = val;
            this.getpjjgdata();            
        },
    }
}

</script>

<style scoped>
/* 
    css belong to pjlb.vue
*/
.pjjg{
    width: 1260px;
    margin: 0 auto;
}
.pjjg__content{
    width: 1250px;
    margin: 0 auto;
}
.pjjg__content__line{
    width: 100%;
    border-top: 1px solid #cccccc;
}
.pjjg__content__table{
    width: 100%;
    margin: 10px 0;    
}
.pjjg__content__pagination{
    width: 575px;
    float: right;
    margin: 10px 0;
}
</style>

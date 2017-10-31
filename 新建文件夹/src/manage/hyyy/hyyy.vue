<template>
    <div class="table">
        <div class="handle-box">
            <el-button class="handle-del mr10" @click="handleBatchDelete">批量删除</el-button>
            <el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getData">
            </el-input>
        </div>
        <div class="table__form">
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" class="handle-table">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="XH" label="序号" width="70" :formatter="getXh">
                </el-table-column>
                <el-table-column prop="DJRQ" label="登记日期" sortable width="130" align="center">
                </el-table-column>
                <el-table-column prop="M_XM" label="男方姓名" sortable width="130" align="center">
                </el-table-column>
                <el-table-column prop="M_SFZH" label="男方身份证号" width="180" align="center">
                </el-table-column>
                <el-table-column prop="W_XM" label="女方姓名" sortable width="130" align="center">
                </el-table-column>
                <el-table-column prop="W_SFZH" label="女方身份证号" width="180" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button size="small" type="warning" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="totalRow" :page-size="pageSize" class="handle-page">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import getHyyy from "@/services/manage/hyyy/getHyyy.js";
import deleteHyyy from "@/services/manage/hyyy/deleteHyyy.js";
import batchdeleteHyyy from "@/services/manage/hyyy/batchdeleteHyyy.js";

export default {
    data() {
        return {
            tableData: [],
            cur_page: 1,
            totalRow: 0,
            multipleSelection: [],
            select_word: '',
            pageSize: 10
        }
    },
    created() {
        this.getData()
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            // console.log(this.cur_page);
            this.getData();
        },
        getData() {
            let params = {};
            params.dataKeys = this.select_word;
            params.nowPage = this.cur_page;
            params.pageSize = this.pageSize;
            getHyyy(params).then(data => {
                this.tableData = data.result.DataList;
                // console.log(this.tableData);
                this.totalRow = data.result.totalRows;
            });

        },
        getXh(row, column) {
            return ((this.cur_page - 1) * this.pageSize + this.tableData.indexOf(row) + 1);
        },
        handleDelete(index, row) {
            let params = { args: [row.UUID] };
            deleteHyyy(params).then(data => {
                if (data.status == "success" && data.result=="true") {
                    this.$message.error("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });
        },
        handleSelectionChange: function (val) {
            this.multipleSelection = val;
        },
        handleBatchDelete() {
            let args = [];
            if(this.multipleSelection.length === 0){
                this.$message.error("请选择需要删除的用户!");
                return;
            }
            for (let item of this.multipleSelection) {
                args.push([item.UUID]);
            }
            // console.log(args);
            let params = { args: args };
            batchdeleteHyyy(params).then(data => {
                if (data.status == "success" && data.result == "true") {
                    this.$message.error("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.table__form{
    width: 100%;
    height: 400px;
}
.pagination{
    margin: 50px 0;
}
</style>
<template>
    <div class="table">
<!--         <div class="crumbs">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>
            <i class="el-icon-menu"></i> 企业用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>企业用户列表</el-breadcrumb-item>
    </el-breadcrumb>
</div> -->
        <div class="handle-box">
            <el-button class="handle-del mr10" @click="handleBatchDelete">批量删除</el-button>
            <el-select v-model="select_cate" placeholder="筛选状态" class="handle-select mr10" @change="getData">
                <el-option key="1" label="登记" value="登记"></el-option>
                <el-option key="2" label="开通" value="开通"></el-option>
                <el-option key="2" label="禁用" value="禁用"></el-option>
                <el-option key="2" label="全部" value=""></el-option>
            </el-select>
            <el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getData">
            </el-input>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" class="handle-table">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="XH" label="序号" width="70" :formatter="getXh">
            </el-table-column>
            <el-table-column prop="QYLX" label="企业类型" sortable width="120" align="center">
            </el-table-column>
            <el-table-column prop="QYMC" label="企业名称" width="120" align="center">
            </el-table-column>
            <el-table-column prop="XYDM" label="企业工商注册/统一社会信用代码" align="center">
            </el-table-column>
            <el-table-column prop="ZHZT" label="状态" align="center" width="200">
            </el-table-column>
            <el-table-column label="操作" width="170" align="center">
                <template scope="scope">
                    <el-button v-show="scope.row.ZHZT=='登记' || scope.row.ZHZT==''" size="small" type="danger" @click="handleupdateYhzt(scope.row,'开通')">通过审核</el-button>
                    <el-button v-show="scope.row.ZHZT=='禁用'" size="small" type="danger" @click="handleupdateYhzt(scope.row,'开通')">解禁</el-button>
                    <el-button v-show="scope.row.ZHZT=='开通'" size="small" type="danger" @click="handleupdateYhzt(scope.row, '禁用')">禁用</el-button>
                    <el-button size="small" type="warning" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="totalRow" :page-size="page_size" class="handle-page">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import getQYglGrid from "@/services/qygl/getQygl.js";
import deleteQygl from "@/services/qygl/deleteQygl.js";
import batchdeleteQygl from "@/services/qygl/batchdeleteQygl.js";
import updateQYYhglZT from "@/services/qygl/updateQYYhZT.js";

export default {
    data() {
        return {
            tableData: [],
            cur_page: 1,
            totalRow: 0,
            page_size:5,
            multipleSelection: [],
            select_cate: '',
            select_word: ''
        }
    },
    created() {
        this.getData();
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            let params = {
                dataStatus: this.select_cate,
                dataKeys: this.select_word,
                cur_page: this.cur_page,
                page_size: this.page_size
            };
            params.nowPage = this.cur_page;
            getQYglGrid(params).then(data => {
                this.tableData = data.result.DataList;
                this.totalRow = data.result.totalRows;
            });

        },

        getXh(row, column) {
            return ((this.cur_page - 1) * this.page_size + this.tableData.indexOf(row) + 1);
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.$message('编辑第' + (index + 1) + '行');
        },
        handleDelete(index, row) {
            let params = { args: [row.UUID] };
            deleteQygl(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });

        },
        handleSelectionChange: function (val) {
            this.multipleSelection = val;
        },
        handleupdateYhzt: function (row, zt) {
            let params = { args: [zt, row.UUID] };
            updateQYYhglZT(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("更新成功!");
                    this.getData();
                } else {
                    this.$message.error("更新失败!");
                }

            });
        },
        handleBatchDelete() {
            let args = [];
            if(this.multipleSelection.length==0){
                this.$message.error("请选择需要删除的用户!");
                return ;
            }
            for (let item of this.multipleSelection) {
                args.push([item.UUID]);
            }
            let params = { args: args };
            batchdeleteQygl(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("更新成功!");
                    this.getData();
                } else {
                    this.$message.error("更新失败!");
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
</style>
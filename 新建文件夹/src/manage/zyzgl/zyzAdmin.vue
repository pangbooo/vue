<template>
    <div class="table">
        <div class="handle-box">
        </div>
        <idttable @rowDblclick="rowDblclick" :page_size="page_size" ref="multipleTable" @sortChange="sortChange" :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
            <div slot="buttonHandlers">
                <el-button icon="delete" type="primary" @click="handleBatchDelete()">删除</el-button>
                <el-button icon="delete" type="primary" @click="handleBatchSh('1')">审核通过</el-button>
                <el-button icon="delete" type="primary" @click="handleBatchSh('0')">审核不通过</el-button>
                &nbsp;审核状态：
                <el-select v-model="shjg" placeholder="审核状态" class="handle-select mr10" @change="getData()">
                    <el-option key="1" label="全部" value="all"></el-option>
                    <el-option key="2" label="未审核" value=""></el-option>
                    <el-option key="3" label="通过" value="1"></el-option>
                    <el-option key="4" label="未通过" value="0"></el-option>
                </el-select>
                <!--<el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getData">-->
                </el-input>
            </div>
        </idttable>
    </div>
</template>
<script>
import idttable from "@/components/table/table.vue"
import getZyzglGrid from "@/services/manage/zyzgl/getzyzgl.js";
import deletezyz from "@/services/manage/zyzgl/deletezyz.js";
import updateShZyzxx from "@/services/manage/zyzgl/updateSh.js";
import { getTime } from '@/lib/publicFun.js'
export default {
    data() {
        return {
            tableData: {},
            cur_page: 1,
            totalRow: 0,
            page_size: 10,
            select_cate: '',
            shjg: '',
            select_word: '',
            ntype: '',
            fields: {
                fielddata: [
                    { fieldname: '真实姓名', width: '140', showname: '真实姓名', sortable: true },
                    { fieldname: '性别', width: '90', showname: '性别', sortable: true },
                    { fieldname: '身份证号', width: '200', showname: '身份证号', sortable: true },
                    { fieldname: '出生日期', width: '150', showname: '出生日期', sortable: true, formatter: 'formatterdate' },
                    { fieldname: '审核结果', width: '150', showname: '审核结果', sortable: true, formatter: 'formattershjg' }
                ],
                opertions: {
                    showname: '操作',
                    width: '250',
                    buttons: [{
                        name: '修改',
                        type: 'info',
                        icon: "edit",
                        handler: 'changeType',
                        handlerargs: ''
                    }, {
                        name: '删除',
                        type: 'danger',
                        icon: "edit",
                        handler: 'handleDelete',
                        handlerargs: ''
                    }]
                }
            },
        }
    },
    created() {
        let label = this.$route.query.label
        let data = this.$route.query.data
        this.getData(data, label);
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        }, sortChange(sortInfo) {
            // console.log(sortInfo.prop); //字段名
            // console.log(sortInfo.order); //排序
        }, rowDblclick(row, event) {
            //双击事件处理
            // console.log(row)
        },
        getData() {
            let params = {
                cur_page: this.cur_page,
                pageSize: this.page_size,
                shjg: this.shjg
            };
            getZyzglGrid(params).then(data => {
                this.tableData = data.data;
            });
        }, formatterdate(row, column) {
            return getTime(row[column.property]);
        }, formattershjg(row, column) {
            if (row[column.property] == '1') {
                return "审核成功";
            } else if (row[column.property] == '0') {
                return "审核失败";
            } else {
                return "未审核";
            }
        }, handleBatchSh(shjg) {
            let multipleSelection = this.$refs.multipleTable.multipleSelection;
            let args = [];
            if (multipleSelection.length == 0) {
                this.$message.error("请选择需要删除的记录!");
                return;
            }
            for (let item of multipleSelection) {
                args.push(item.UUID);
            }
            let params = {};
            params.uuids = args;
            params.shjg = shjg;
            updateShZyzxx(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("操作成功!");
                    this.getData();
                } else {
                    this.$message.error("操作失败!");
                }
            });
        },
        handleDelete(row) {
            let params = { uuids: [row.UUID] };
            deletezyz(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });
        },
        handleupdateYhzt: function(row, zt) {
            let params = { 'status': zt, userNames: [row.NAME] };
            updateYhglZT(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("更新成功!");
                    this.getData();
                } else {
                    this.$message.error("更新失败!");
                }
            });
        },
        handleBatchDelete() {
            let multipleSelection = this.$refs.multipleTable.multipleSelection;
            let args = [];
            if (multipleSelection.length == 0) {
                this.$message.error("请选择需要删除的记录!");
                return;
            }
            for (let item of multipleSelection) {
                args.push(item.UUID);
            }
            let params = { uuids: args };
            deletezyz(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });
        }
    }, components: {
        idttable
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
</style>
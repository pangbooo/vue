<template>
    <div class="table">
        <idttable :fields="fields" :dataResult="tableData" :refreshData="getData"></idttable>
    </div>
</template>

<script>
import idttable from "@/components/table/table.vue"
import getYhglGrid from "@/services/yhgl/getYhgl.js";
import deleteYhgl from "@/services/yhgl/deleteYhgl.js";
import batchdeleteYhgl from "@/services/yhgl/batchdeleteYhgl.js";
import updateYhglZT from "@/services/yhgl/updateYhZT.js";

export default {
    data() {
        return {
            tableData: {anme:3},
            cur_page: 1,
            totalRow: 0,
            page_size:5,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            fields:[
                {fieldname:'YHMC',width:'150',showname:'帐户',sortable:true},
                {fieldname:'ZSXM',width:'150',showname:'姓名',sortable:true},
                {fieldname:'SFZH',width:'200',showname:'身份证号',sortable:false},
                {fieldname:'ZHZT',showname:'状态',width:'90'},
                {fieldname:'ZHZT',showname:'状态',width:'90'}
            ]
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
                page_size: this.page_size,
            };
            getYhglGrid(params).then(data => {
                this.tableData = data.result;
                console.log( this.tableData )
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
            deleteYhgl(params).then(data => {
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
            let args = [];
            if (this.multipleSelection.length == 0) {
                this.$message.error("请选择需要删除的用户!");
                return;
            }
            for (let item of this.multipleSelection) {
                args.push([item.UUID]);
            }
            let params = { args: args };
            batchdeleteYhgl(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("更新成功!");
                    this.getData();
                } else {
                    this.$message.error("更新失败!");
                }
            });
        }
    },components: {
       idttable
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
</style>
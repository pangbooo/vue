<template>
    <div class="table">
        <div class="handle-box">
        </div>
        <idttable @rowDblclick="rowDblclick"  :page_size="page_size" ref="multipleTable" @sortChange="sortChange"  :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
        <div slot="buttonHandlers">
             <el-button icon="delete" type="primary"  @click="handleBatchDelete()">删除</el-button>
             <el-button icon="delete" type="primary"  @click="handleBatchDelete()">审核通过</el-button>
                  &nbsp;用户状态：<el-select v-model="select_cate" placeholder="筛选状态" class="handle-select mr10" @change="getData()">
                        <el-option key="1" label="未开通" value="未开通"></el-option>
                        <el-option key="2" label="已开通" value="已开通"></el-option>
                        <el-option key="2" label="禁用" value="禁用"></el-option>
                        <el-option key="2" label="全部" value=""></el-option>
                  </el-select>
                  &nbsp;用户类型：<el-select v-model="ntype" placeholder="用户类型" class="handle-select mr10" @change="getData()">
                        <el-option key="0" label="全部" value=""></el-option>
                        <el-option key="1" label="个人" value="市民"></el-option>
                        <el-option key="2" label="法人" value="企业"></el-option>
                  </el-select>
                  <!--<el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getData">-->
                  </el-input>
            </div>
        </idttable>
    </div>
</template>
<script>
import idttable from "@/components/table/table.vue"
import getYhglGrid from "@/services/common/user/user_list.js";
import deleteYhgl from "@/services/manage/yhgl/deleteYhgl.js";
import batchdeleteYhgl from "@/services/manage/yhgl/batchdeleteYhgl.js";
import updateYhglZT from "@/services/manage/yhgl/updateYhZT.js";
import {getTime} from '@/lib/publicFun.js'
export default {
    data() {
        return {
            tableData: {},
            cur_page: 1,
            totalRow: 0,
            page_size:10,
            select_cate: '',
            select_word: '',
            ntype: '',
            fields:{fielddata:[
                {fieldname:'NAME',width:'150',showname:'帐户',sortable:true},
                {fieldname:'NC',width:'150',showname:'姓名',sortable:true},
                {fieldname:'NTYPE',width:'100',showname:'用户类型',sortable:false},
                {fieldname:'INSERT_DATE',width:'200',showname:'注册时间',sortable:false,formatter:'formatterdate'},
                {fieldname:'ZHZT',showname:'状态',width:'90'},
            ],opertions:{showname:'操作',align:'left',width:'250',buttons:[{name:'通过审核',size: 'small',type:'primary',icon:"check",script:"scope.row.ZHZT=='未开通' || scope.row.ZHZT==''",handler:'handleupdateYhzt',handlerargs:'已开通'},{name:'解禁',type:'primary',icon:"circle-check",size: 'small',script:"scope.row.ZHZT=='已禁用'",handler:'handleupdateYhzt',handlerargs:'已开通'},{name:'禁用',type:'primary',size: 'small',icon:"circle-close",script:"scope.row.ZHZT=='已开通'",handler:'handleupdateYhzt',handlerargs:'已禁用'}]}
            }
        }
    },
    created() {
        let label = this.$route.query.label
        let data = this.$route.query.data
        this.getData(data,label);
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },sortChange(sortInfo){
           // console.log(sortInfo.prop); //字段名
            // console.log(sortInfo.order); //排序
        },rowDblclick(row,event){
            //双击事件处理
           // console.log(row)
        },
        getData(obj,obj2) {
            let params = {
                zhzt: this.select_cate,
                ntype:this.ntype,
                dataKeys: this.select_word,
                nowPage: this.cur_page,
                pageSize: this.page_size,
            };
            params.data = obj;
            params.label = obj2;
            getYhglGrid(params).then(data => {
                this.tableData = data.data;
                console.log(this.tableData);
                for(let i=0; i<this.tableData.DataList.length; i++){
                    this.tableData.DataList[i].NTYPE = this.tableData.DataList[i].NTYPE === '市民' ? '个人':'法人'
                }
            });
        },formatterdate(row, column){
            return getTime(row[column.property]);
        },
        handleDelete(row) {
            let params = { userNames: [row.NAME] };
            deleteYhgl(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });
        },
        handleupdateYhzt: function (row, zt) {
            let params = {'status':zt, userNames:[row.NAME]};
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
                this.$message.error("请选择需要删除的用户!");
                return;
            }
            for (let item of multipleSelection) {
                args.push(item.NAME);
            }
            let params = { userNames: args };
            batchdeleteYhgl(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
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
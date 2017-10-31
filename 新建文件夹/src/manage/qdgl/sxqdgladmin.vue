<template>
    <div class="sxqdgladmin">
        <idttable  :page_size="pageSize" ref="multipleTable" @sortChange="sortChange"  :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
          <div slot="buttonHandlers" class="sxqdgladmin__title">
             <el-button icon="delete" type="primary"  @click="deleteData()">删除</el-button>
             <el-button type="primary"  @click="isGk(true)">公开</el-button>
             <el-button type="primary"  @click="isGk(false)">不公开</el-button>

              <el-select v-model="select_bm" class="handle-select mr10" @change="changeBm">
                    <el-option key="00" label="所有部门" value=""></el-option>
                    <el-option :key="index" v-for="(item,index) in bmlist" :label="item.DWMC" :value="item.DWMC"></el-option>
              </el-select>
              <el-select v-model="select_fl" class="handle-select mr10" @change="changeFl">
                    <el-option key="00" label="所有分类" value=""></el-option>
                    <el-option :key="index" v-for="(item,index) in fllist" :label="item.SXLX" :value="item.SXLX"></el-option>
              </el-select>
              <div style="margin-top: 15px;display:inline-block;">
                <el-input placeholder="请输入关键字" v-model="search_key" @keyup.enter.native="chooseGJZ()">
                  <el-button slot="append" icon="search"  @click="chooseGJZ()" ></el-button>
                </el-input>
              </div>
          </div>
        </idttable>
    </div>
</template>
<script>
import idttable from "@/components/table/table.vue"

import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import xzqlqdlbright from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbright';
import {webGetSimpleGridList} from '@/api/common.js';
import batchdeleteYhgl from "@/services/manage/yhgl/batchdeleteYhgl.js";
import {webUpdateBatch,webCommonDelByIds} from '@/api/manage.js';
import {tableIds} from '@/api/tableId.js'
export default {
    components: {
       idttable
    },
    data() {
        return {
            bmlist:[],
            select_bm:'',
            fllist:[],
            select_fl:'',
            search_key:'',
            isUpdataFl:true,
            tableData: {},
            currentPage: 1,
            totalRows: 0,
            pageSize:10,
            select_word: '',
            ntype: '',
            fields:{fielddata:[
                {fieldname:'办理部门',width:'150',showname:'办理部门',sortable:true},
                {fieldname:'事项全称',width:'',showname:'事项名称',sortable:true,overflow:true},
                {fieldname:'事项编号',width:'200',showname:'事项编号',sortable:true},
                {fieldname:'是否显示',width:'150',showname:'是否公开',sortable:true,align:'center'}
            ]}
        }
    },
    created() {
        this.getBM();
        this.getFL();
        this.getData();
    },
    methods: {
        chooseGJZ: function(){
            this.getData();
        },
        changeBm: function(){
            this.select_fl = '';
            this.search_key = '';
            this.getFL();
            this.getData();
        },
        changeFl: function(){
            this.search_key = '';
            this.getData();
        },
        deleteData:function(){
            let multipleSelection = this.$refs.multipleTable.multipleSelection;
            let args = [];
            if (multipleSelection.length == 0) {
                this.$message.error("请选择需要删除的用户!");
                return;
            }
            for (let item of multipleSelection) {
                args.push(item.UUID);
            }
            let param = {};
            param.tableId = tableIds['权力事项办理表'];
            param.uuids = args;
            webCommonDelByIds(param).then(res => {
                if (res.status === "success") {
                    this.$message.success("操作成功!");
                    this.getData();
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data =>{
                this.$message.error('webCommonDelByIds异常，请检查网络！')
            })
        },
        getBM:function() {
            xzqlqdlbleft().then(res => {
                if (res.status === "success") {
                    for(let i = 0;i < res.data.length; i++ ){
                        if(res.data[i].DWMC){
                            this.bmlist.push(res.data[i])
                        }
                    }
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                } 
            }).catch(data =>{
                this.$message.error('xzqlqdlbleft异常，请检查网络！')
            })
        },
        getFL: function(){
            let params = {
                nowPage: this.currentPage,
                pageSize: this.pageSize,
                filter: {}
            }

            this.select_bm ? params.filter["单位名称"] = this.select_bm:'';
            
            xzqlqdlbright(params).then(res => {
                if (res.status === "success") {
                    this.fllist = res.data.Matter_sxlxtj;
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data =>{
                this.$message.error('getData异常，请检查网络！')
            })
        },
        getData: function(){
            let params = {
                tableid:tableIds['权力事项办理表'],
                nowPage: this.currentPage,
                pageSize: this.pageSize,
                searchKeyFields : ['事项名称(大项)','分项名称(小项)'],
                filter: {}
            }

            this.select_bm ? params.filter["办理部门"] = this.select_bm:'';
            this.select_fl ? params.filter["事项类型"] = this.select_fl:'';
            this.search_key ? params.filter["searchKey"] = this.search_key:'';
            
            webGetSimpleGridList(params).then(res => {
                if (res.status === "success") {
                    try{
                        this.tableData = res.data;
                        let _self = this;
                        res.data.DataList.forEach(function(item,index){
                            let subtitle = item['分项名称(小项)'] ? '('+item['分项名称(小项)']+')':'';
                            let title = item['事项名称(大项)'] + subtitle;
                            _self.tableData.DataList[index].是否显示 = _self.tableData.DataList[index].是否显示 === ''? '公开':'不公开';
                            _self.$set(_self.tableData.DataList[index],'事项全称',title)
                        })
                        this.totalRows = res.data.totalRows
                    } catch(e){
                        alert(e);
                    }
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data =>{
                this.$message.error('getData异常，请检查网络！')
            })
        },
        handleCurrentChange: function(val){
            this.currentPage = val,
            this.getData();
        },
        isGk:function(boo){
            let multipleSelection = this.$refs.multipleTable.multipleSelection;
            let args = [];
            if (multipleSelection.length == 0) {
                this.$message.error("请选择需要删除的记录!");
                return;
            }
            for (let item of multipleSelection) {
                args.push(item.UUID);
            }
            let str = '';
            str = boo ? '':'false'
            let params = {};
            params.tableId = tableIds['权力事项办理表'],
            params.uuids = args;
            params.setMap = {'是否显示':str};
            webUpdateBatch(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("操作成功!");
                    this.getData();
                } else {
                    this.$message.error("操作失败!");
                }
            });
        },
        rowDblclick: function(){

        },
        sortChange: function(){

        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
</style>
<style>
    .sxqdgladmin__title .el-button+.el-button {
        margin-left: 0;
    }
    .el-tooltip__popper{
        width: 90%;
    }
</style>
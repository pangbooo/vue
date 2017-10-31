<template>
    <div class="sxqdgladmin">
        <idttable  :page_size="pageSize" ref="multipleTable" @sortChange="sortChange"  :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange" @rowDblclick="rowDblclick">
          <div slot="buttonHandlers" class="sxqdgladmin__title">
              <el-button icon="delete" type="primary"  @click="deleteData()">删除</el-button>
              <div style="display:inline-block;">
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

import {webGetSimpleGridList} from '@/api/common.js';
import batchdeleteYhgl from "@/services/manage/yhgl/batchdeleteYhgl.js";
import {webUpdateBatch,webCommonDelByIds} from '@/api/manage.js';
import {tableIds} from '@/api/tableId.js'
import {getTime} from '@/lib/publicFun.js'
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
                {fieldname:'咨询人姓名',width:'150',showname:'姓名',sortable:true,overflow:true},
                {fieldname:'咨询标题',width:'',showname:'主题',sortable:true,overflow:true},
                {fieldname:'咨询内容',width:'140',showname:'咨询内容',sortable:true,overflow:true},
                {fieldname:'INSERT_DATE',width:'140',showname:'登记日期',sortable:true,align:'center',formatter:'formatterdate'},
                {fieldname:'答复方式',width:'140',showname:'答复方式',sortable:true,align:'center'}
            ],opertions:{
                showname:'操作',align:'left',width:'140',
                buttons:[
                    {name:'处理',size: 'small',type:'primary',script:"",handler:'handleupdateCL',handlerargs:'已开通'},
                    {name:'转发',type:'primary',size: 'small',script:"",handler:'handleupdateZF',handlerargs:'已禁用'}
                ]}
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        chooseGJZ: function(){
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
            param.tableId = tableIds['在线咨询'];
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
        formatterdate: function(row, column){
            return getTime(row[column.property],'yy-MM-dd');
        },
        getData: function(){
            let params = {
                tableid:tableIds['在线咨询'],
                nowPage: this.currentPage,
                pageSize: this.pageSize,
                searchKeyFields : ['咨询标题'],
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
        handleupdateCL: function(){

        },
        handleupdateZF: function(){
            
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
            params.tableId = tableIds['在线咨询'],
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
        rowDblclick: function(val){
            this.$router.push({path:'/zxhfzxgl', query: {UUID: val.UUID}});
        },
        sortChange: function(){

        }
    }
}
</script>
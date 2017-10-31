/* 
    描述：部门预算右侧列表
    作者：马丽欣
    创建时间：2017年9月26日
    最后修改人：马丽欣
    最后修改时间：2017年9月26日
*/
<template>
<div>
    <div class="bmys_right">
        <div class="bmys_right--top">
          <h1>政府部门专项资金管理清单</h1>
          <div class="bmys_input">
            <el-input placeholder="搜索关键字" icon="search" v-model="keyword"   @keyup.enter.native="chooseGJZ($event)" ></el-input>
          </div>
          <div class="bmys_sel">
            <el-select v-model="selYear" placeholder="请选择" @change="getData()">
              <el-option v-for="(sel,idx) in selYears" :key="idx" :value="sel.LABEL" :label="sel.TEXT"></el-option>
            </el-select>
          </div>
        </div>
        <div class="bmys_right--center">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号"  width="70"> </el-table-column>
            <el-table-column prop="主管部门" label="主管部门"  width="230"> </el-table-column>
            <el-table-column prop="专项名称" label="专项名称" width="300"> </el-table-column>
            <el-table-column prop="金额" label="金额（万元）"> </el-table-column>
          </el-table>
        </div>
        <div class="bmys_right_fenye">
          <idt-pagination :currentPage="currentPage" :totalPage="totalPage" :pageSize="pageSize" @current-change="currentChange" @size-change="sizeChange" class="pagePos" ></idt-pagination> 
        </div>
    </div>
</div>
</template>
<script>
import idtpagination from '@/components/pagination/index.vue';
import zxzjlb from '@/services/common/zwfw/ygzw/zxqd/zxzj/zxzjlb.js';
import { tableIds } from '@/api/tableId';
export default{
  data() {
        return {
            activeName:'',
            selYears: [
              {TEXT: '所有',LABEL:'',UUID: '0'},          
              {TEXT: '2017',LABEL:'2017',UUID: '1'},
              {TEXT: '2016',LABEL:'2016',UUID: '2'},
              {TEXT: '2015',LABEL:'2015',UUID: '3'}
            ],
            selYear: '',
            keyword: '',
            zxlx: '',
            currentPage:1,
            totalPage:10,
            pageSize:10,
            nowPage:'1',
            tableData: []
        }
    },
    components: {
        'idt-pagination': idtpagination,
    },
    created: function(){
        this.getData();
    },
    methods:{
        getData: function(){
            let params = {
                tableid : tableIds.专项资金,
                nowPage: this.nowPage,
                pageSize: this.currentPage,
                filter:  { '专项名称': '部门预算专项' }  
            }
            if(this.keyword){
                params.searchKeyFields = ['专项名称','金额','主管部门'];
                params.filter["searchKey"] = this.keyword;
            }
            this.selYear ? params.filter["INSERT_DATE"] = '#'+this.selYear+'/01/01-#'+this.selYear+'/12/31':'';
            zxzjlb(params).then(res => {
                this.tableData = res.data.DataList; 
                this.totalPage = this.tableData.length;
            })
        },
        currentChange: function(val){
            this.currentPage = val;
            this.getData()
        },
        sizeChange: function(val){
            this.pageSize = val;
        },
        chooseGJZ: function(ev){
            if(ev.keyCode==13){
                this.getData();
            }
        }
    }
}
</script>

<style scoped>
  .bmys_sel {
    float: right;
    margin-right: 20px;
  }

  .bmys_input {
    float: right;
  }

  .bmys_pagination {
    margin-top: 30px;
    text-align: center;
    margin-bottom: 30px;
  }
 .bmys_right {
    width: 914px;
    float: right;
  }
  .bmys_right--top {
    width: 914px;
    height: 50px;
  }

  .bmys_right--top::after {
    content: '';
    display: block;
    clear: both;
  }

  .bmys_right--top h1 {
    font-size: 25px;
    float: left;
    font-weight: normal;
    border-left: 20px double #0095e4;
    padding: 0px 15px;
    height: 30px;
    line-height: 30px;
  }

  .bmys_right--top select {
    float: left;
    width: 162px;
    height: 46px;
    margin-left: 75px;
    border: 1px solid #e1dfda;
  }

  .bmys_right--top input {
    float: right;
    width: 195px;
    height: 44px;
    border: 1px solid #e1dfda;
    text-indent: 20px;
  }

  .bmys_right--top a {
    float: right;
    width: 56px;
    height: 44px;
    border: 1px solid #e1dfda;
    border-left: none;
    background: url("img/pay-search.png") no-repeat 15px 6px;
  }

  .bmys_right--center {
    width: 914px;
  }
  .bmys_right_fenye{
    float: right;
    margin: 10px 10px 10px 0;
  }
  
</style>

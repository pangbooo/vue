<template>
  <div>
    <div class="right-top-header">
      <span class="header-text">我的收藏({{total}})</span>
      <a href="/qlqd/wdsclb/index.html" class="wdzztable__more">更多>></a>
      <div class="header-img">
        <img src="./img/85.png" class="img-1">
        <img src="./img/91.png" class="img-2">
      </div>
    </div>
    <div class="right-top-center">
      <el-table ref="wdzztable" :data="dataList" @row-dblclick="dbclick" tooltip-effect="light">
        <el-table-column prop="BT" label="内容标题" :formatter="getTitle" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="INSERT_DATE" label="收藏时间" width="120" :formatter="getTime"></el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <img src="./img/jc.png" class="center-jc">
  </div>
</template>
<script>
  import { getMyFavorites } from '@/api/manage';
  import { deleteData } from '@/api/common.js';
  import { getTime } from '@/lib/publicFun.js';
  import { tableIds } from '@/api/tableId.js';
  export default {
    data() {
      return {
        dataList: {},
        pageSize: 5,
        currentPage: 1,
        dataList:[],
        total:0
      }
    },
    created() {
      this.getData();
    },
    methods: {
      dbclick(row, event){
        window.location.href = "/qlqd/xzqlqddetail/index.html?WZID="+row.ZJ;
      },
      getData: function () {
        let params = {
          nowPage: this.currentPage,
          pageSize: this.pageSize,
        };
        getMyFavorites(params).then(data => {
          this.dataList = data.data.DataList;
          this.total = data.data.totalRows;
        })
      },
      getTime(row, column, cellValue) {
        return getTime(cellValue,'yy-MM-dd');
      },
      getTitle(row, column, cellValue){
        let arr = [];
        arr = cellValue.split('###');

        str = arr[1] ? arr[0]+'('+arr[1]+')' : arr[0];
        return str;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      handleDelete(row){
        let params = {
            tableId:tableIds.我的收藏,
            uuids:[row.UUID]
        }
        deleteData(params).then(res=>{
          if(res.status === 'success'){
              this.$message.success('删除成功！');
              this.getData();
          }else{
              this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(data =>{
            this.$message.error('deleteData异常，请检查网络！')
        });
      }
    }
  }
</script>
<style scoped>
.right-top-header{
    height: 32px;
    padding: 14px;
    position: relative;
}

.header-text{
    position: absolute;
    font-size: 16px;
    color: #0073da;
    top: 22px;
    left: 14px;
    line-height: 1em;
}
.wdzztable__more{
  float: right;
  line-height: 32px;
}
.header-text1{
    position: relative;
    float: right;
    font-size: 14px;
    right: 20px;
    top: 22px;
    color: #989898;
}
.header-img{
  clear:both; 
  height: 3px;
  padding-top: 10px;
}
.header-img img{
  vertical-align: top;
}
.header-img .img-2{
  width: 755px;
  height: 3px;
}
.right-top-center{
    padding:0 14px;
    margin-top: 14px;
}
.center-table{
    font-size: 14px;
    /*height: 150px;*/
    color: #5b5c5e;
}
.table-tr{
    height: 32px;
    line-height: 32px;
}
.table-a{
    width:555px;
}
.table-b{
    width: 110px;
}
.table-c img{vertical-align: middle;}
.center-jc{
    position: relative;
    width: 100%;
    /*bottom: 62px;*/
}
</style>
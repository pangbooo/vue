<template>
      <div>
            <div class="handle-box">
                  <slot name="buttonHandlers"></slot>
            </div>
            <el-table :data="dataResult.DataList" :height="height" :border="border" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" @sort-change="sortChange" @row-dblclick="rowDblclick" @row-click="rowClick" class="handle-table" tooltip-effect="light">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="XH" label="序号" width="70" :formatter="getXh">
                  </el-table-column>
                  <el-table-column v-for="(field,index) in fields.fielddata" :column-key="index+''" :key="index" :prop="field.fieldname" :label="field.showname" :sortable="field.sortable" :width="field.width" :formatter="commonFormatter" :show-overflow-tooltip="field.overflow" :align="field.align">
                  </el-table-column>
                  <el-table-column :label="fields.opertions.showname" v-if="fields.opertions" :width="fields.opertions.width" :align="fields.opertions.align">
                        <template scope="scope">
                              <el-button v-for="(button,butidx) in fields.opertions.buttons" :key="butidx"  v-if=" buttonshow(scope,button.script)" :size="button.size === '' ? 'size': button.size" :type="button.type" :icon="button.icon" @click="buttonHandler(scope.row,button.handler,button.handlerargs)">{{button.name}}</el-button>
                        </template>
                  </el-table-column>
            </el-table>
            <div class="pagination" v-show="paginationshow">
                  <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="dataResult.totalRows" :page-size="page_size" >
                  </el-pagination>
            </div>
      </div>
</template>
<script>
export default {
      props: {
            fields: {
                  type: Object
            },
            dataResult: {
                  type: Object
            },
            page_size:{
                  type:Number,
                  default:10
            },
            height: {
                  default: '',
                  type: String
            },
            paginationshow: {
                  default: true,
                  type: Boolean
            },
            border: {
                  default: true,
                  type: Boolean
            }
      },
      data() {
            return {
                  cur_page: 1,
                  multipleSelection: [],
                  
            }
      },created(){
      },
      methods: {
            handleCurrentChange(val) {
                  this.cur_page = val;
                  this.$emit("handleCurrentChange", this.cur_page);
            }, refreshData() {
                  this.$emit("refreshData", this.cur_page);
            },rowDblclick(row,event){
                  this.$emit("rowDblclick", row,event);
            },rowClick(row,event){
                  this.$emit("rowClick", row,event);
            },
            getXh(row, column) {
                  return ((this.cur_page - 1) * this.page_size + this.dataResult.DataList.indexOf(row) + 1);
            },
            filterTag(value, row) {
                  return row.tag === value;
            },
            handleEdit(index, row) {
                  this.$message('编辑第' + (index + 1) + '行');
            },
            handleSelectionChange: function (val) {
                  this.multipleSelection = val;
                  this.$emit("handleSelectionChange", val);
            },
            buttonshow:function(scope,script){
                  //alert(script);
                  if(script)
                        return eval(script);
                  else{
                        return true;
                  }
            },buttonHandler:function(row,handler,handlerargs){
                  if(handler){
                        this.$parent[handler](row,handlerargs);
                  }
            },sortChange(sortInfo){
                   this.$emit("sortChange",sortInfo);
            },commonFormatter(row, column){
                  let field = this.fields.fielddata[column['columnKey']];
                  if(field.formatter && row[column.property]){
                        return  this.$parent[field.formatter](row,column);
                  }else{
                        return row[column.property];
                  }
            }

      }, components: {

      }, computed: {
            
      }

}
</script>

<style scoped>
.handle-box {
      margin-bottom: 20px;
}
.pagination{
      margin-top: 10px;
      margin-bottom: 10px;
      float: right;
}
.el-button+.el-button{margin-left: 10%}
</style>

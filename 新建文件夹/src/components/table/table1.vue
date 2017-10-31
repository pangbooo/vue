<template>
      <div>
            <div class="handle-box">
                  <el-button class="handle-del mr10" @click="handleBatchDelete()">批量删除</el-button>
                  <el-select v-model="select_cate" placeholder="筛选状态" class="handle-select mr10" @change="getData()">
                        <el-option key="1" label="登记" value="登记"></el-option>
                        <el-option key="2" label="开通" value="开通"></el-option>
                        <el-option key="2" label="禁用" value="禁用"></el-option>
                        <el-option key="2" label="全部" value=""></el-option>
                  </el-select>
                  <el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getData">
                  </el-input>
            </div>
            <el-table :data="dataResult.DataList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" class="handle-table">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="XH" label="序号" width="70" :formatter="getXh">
                  </el-table-column>
                  <el-table-column v-for="(field,index) in fields" :key="index" :prop="field.fieldname" :label="field.showname" :sortable="field.sortable" :width="field.width">
                  </el-table-column>
                  <el-table-column label="操作">
                        <template scope="scope">
                              <el-button v-show="scope.row.ZHZT=='登记' || scope.row.ZHZT==''" size="small" type="danger" @click="handleupdateYhzt(scope.row,'开通')">通过审核</el-button>
                              <el-button v-show="scope.row.ZHZT=='禁用'" size="small" type="danger" @click="handleupdateYhzt(scope.row,'开通')">解禁</el-button>
                              <el-button v-show="scope.row.ZHZT=='开通'" size="small" type="danger" @click="handleupdateYhzt(scope.row, '禁用')">禁用</el-button>
                              <el-button size="small" type="warning" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                        </template>
                  </el-table-column>
            </el-table>
            <div class="pagination">
                  <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="dataResult.totalRows" :page-size="page_size" class="handle-page">
                  </el-pagination>
            </div>
      </div>
</template>

<script>
import getYhglGrid from "@/services/yhgl/getYhgl.js";
import deleteYhgl from "@/services/yhgl/deleteYhgl.js";
import batchdeleteYhgl from "@/services/yhgl/batchdeleteYhgl.js";
import updateYhglZT from "@/services/yhgl/updateYhZT.js";

export default {
      props: {
            fields: {
                  type: Array
            },
            dataResult:{
                  type:Object
            }
      },
      data() {
            return {
                  cur_page: 1,
                  page_size: 5,
                  multipleSelection: [],
                  select_cate: '',
                  select_word: ''
            }
      },
      created() {
<<<<<<< .mine
=======
            //  alert();
>>>>>>> .r244
            this.getData();
      },
      methods: {
            handleCurrentChange(val) {
                  this.cur_page = val;
                  this.getData();
            }, refreshData() {
                  this.$emit("refreshData");
            },
            getData() {
<<<<<<< .mine
=======
                  // alert();
                      // alert(this.dataResult.DataList);
                        console.log(JSON.stringify(this.dataResult));
                       // alert(0)
>>>>>>> .r244
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

      }, components: {

      }

}
</script>

<style scoped>
.handle-box {
      margin-bottom: 20px;
}
</style>

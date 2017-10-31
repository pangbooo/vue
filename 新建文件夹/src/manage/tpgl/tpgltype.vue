<template>
   <div class="table">
        <el-dialog title="添加分类" :visible.sync="addtpVisible">
            <el-form :model="tpfl" ref="tpfl" :rules="rules" >
                <el-form-item label="分类名称" prop="分类名称">
                    <el-input v-model="tpfl.分类名称"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="分类描述">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入描述内容"
                      v-model="tpfl.描述">
                    </el-input>
                </el-form-item>
                <el-form-item label="排序" prop="排序">
                    <el-input v-model="tpfl.排序" placeholder="数字越小越在前"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeTp">取消</el-button>
                <el-button type="primary" @click="closeTp('sendaddtype')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改分类" :visible.sync="addxgVisible">
            <el-form :model="xgxx" ref="xgxx" :rules="rules" >
                <el-form-item label="分类名称" prop="flmc">
                    <el-input v-model="xgxx.分类名称"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" prop="描述">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入描述内容"
                      v-model="xgxx.描述">
                    </el-input>
                </el-form-item>
                <el-form-item label="排序" prop="排序">
                    <el-input v-model="xgxx.排序" placeholder="数字越小越在前"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeXg">取消</el-button>
                <el-button type="primary" @click="closeXg('sendchangetype')">确定</el-button>
            </div>
        </el-dialog>
        <idttable @rowDblclick="rowDblclick"  :page_size="page_size" ref="multipleTable" @sortChange="sortChange"  :fields="typefields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
        <div slot="buttonHandlers">
             <el-button icon="delete" class="handle-del"  @click="handleBatchDelete()">批量删除</el-button>
             <el-button icon='plus' class="handle-del"  @click="addTp()">添加</el-button>
                  <el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getData">
            </el-input>
            </div>
        </idttable>
    </div>
</template>

<script>
import idttable from "@/components/table/table.vue"
import getTpglTypeGrid from "@/services/manage/tpgl/getTpglTypeGrid.js"
import deleteTpfl from "@/services/manage/tpgl/deleteTpfl.js"
import saveTpfl from  "@/services/manage/tpgl/savetpflForm.js";
export default {
      data() {
        return {
            tpfl: {
                分类名称:'',
                描述:'',
                排序:''
            },
            xgxx:{
                分类名称:'',
                描述:'',
                排序:'',
                UUID:''
            },
            rules:{
                分类名称: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
                ],
                描述: [
                    { required: true, message: '请输入分类描述', trigger: 'blur' }
                ],
                排序: [
                    { required: true, message: '请输入分类排序', trigger: 'blur' }
                ]
            },
            addtpVisible: false,
            addxgVisible: false,
            tpDialogTitle:'添加分类',
            tableData: {},
            cur_page: 1,
            totalRow: 0,
            page_size:10,
            select_cate: '',
            select_word: '',
            typefields: {
                fielddata:[
                    {fieldname:'分类名称',width:'250',showname:'分类名称',sortable:true},
                    {fieldname:'描述',width:'220',showname:'描述',sortable:true},
                    {fieldname:'排序',width:'100',showname:'排序',sortable:true},
                ],
                opertions:{
                    showname:'操作',
                    width:'250',
                    buttons:[{
                        name:'修改',
                        type:'info',
                        icon:"edit",
                        handler:'changeType',
                        handlerargs:''
                    },{
                        name:'删除',
                        type:'danger',
                        icon:"edit",
                        handler:'handleDelete',
                        handlerargs:''
                    }]
                }
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        addTp(){
            this.addtpVisible=true;
        },
        closeTp(val){
            if(val==='sendaddtype'){
                saveTpfl(this.tpfl).then(res => {
                    if(res.status =='success'){
                        this.$message.success('操作成功');
                        this.tpfl={};
                    }else{
                        this.$message.error('操作失败');
                    }
                });
                // this.$message.success("添加成功!");
                this.getData();
            }
            this.addtpVisible=false;
            console.log("提交添加接口")
        },
        closeXg(val){
            if(val==='sendchangetype'){
                saveTpfl(this.xgxx).then(res => {
                    if(res.status =='success'){
                        this.$message.success('操作成功');
                    }else{
                        this.$message.error('操作失败');
                    }
                });
                // this.$message.success("修改成功!");
                this.getData();
            }
            this.addxgVisible=false;
            // console.log("提交修改接口")
        },
        changeType(row) {
            for(let a in row){
                console.log(a)
                this.xgxx[a] = row[a];
            }
            this.addxgVisible=true;
        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        sortChange(sortInfo){
           // console.log(sortInfo.prop); //字段名
            // console.log(sortInfo.order); //排序
        },
        rowDblclick(row,event){
            //双击事件处理
           // console.log(row)
        },
        getData() {
            let params = {
                dataStatus: this.select_cate,
                dataKeys: this.select_word,
                nowPage: this.cur_page,
                page_size: this.page_size,
            };
            getTpglTypeGrid(params).then(data => {
                this.tableData = data.data;
            });
        },
        handleDelete(row) {
            let params = { uuids: [row.UUID] };
            deleteTpfl(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });
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
            deleteTpfl(params).then(data => {
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
.mr10{
    margin-left: 10px;
}
</style>

<template>
    <div class="table tpgl__warp">
        <el-dialog title="添加投票" :visible.sync="addtpVisible">
            <el-form :model="tpxx" ref="tpxx" :rules="rules">
                <el-form-item label="主题" prop="主题" class="tpgl__w80">
                    <el-input v-model="tpxx.主题"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="描述" class="tpgl__w80">
                    <el-input v-model="tpxx.描述"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="分类名称" class="tpgl__w40">
                    <el-select v-model="tpxx.分类名称" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="多选方式" prop="多选方式">
                    <el-radio-group v-model="tpxx.多选方式">
                        <el-radio label="单选"></el-radio>
                        <el-radio label="多选"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选项管理" class="tpgl__w60">
                    <el-input v-model="tpxxzx.选项内容"></el-input>
                    <el-button type="primary" @click="tjxx">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tpxx.optionData" border ref="optionTable" class="handle-table" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="XH" label="序号" :formatter="getXh" width="70"></el-table-column>
                <el-table-column prop="选项内容" label="选项"></el-table-column>
                <el-table-column label="操作" width="170" align="center">
                    <template scope="scope">
                        <el-button size="small" type="warning">修改</el-button>
                        <el-button size="small" type="danger" @click="deloption(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeTp">取消</el-button>
                <el-button type="primary" @click="closeTp('tjzt')">确定</el-button>
            </div>
        </el-dialog>
        <idttable :page_size="page_size" ref="multipleTable" @sortChange="sortChange" :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
            <div slot="buttonHandlers">
                <el-button class="handle-del" @click="handleBatchDelete()">批量删除</el-button>
                <el-button class="handle-del" @click="addTp()">添加</el-button>
                <el-input class="handle-input tpgl__mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getData">
                </el-input>
            </div>
        </idttable>
    </div>
</template>

<script>
import idttable from "@/components/table/table.vue"

import getTpglGrid from "@/services/manage/tpgl/getTpglGrid.js"
import deleteTpgl from "@/services/manage/tpgl/deleteTpgl.js"
import deleteTpxx from "@/services/manage/tpgl/deleteTpxx.js"
import saveTpgl from "@/services/manage/tpgl/savetpztForm.js"
import saveTpxx from "@/services/manage/tpgl/savetpxxForm.js"
import getTpxxGrid from "@/services/manage/tpgl/getTpxxGrid.js"
import getTpflGrid from "@/services/manage/tpgl/getTpglTypeGrid.js"

export default {
    data() {
        return {
            tpxxzx: { 选项内容: '', UUID: '' },
            tpxx: { UUID: '', 主题: '', 多选方式: '1', 分类名称: '', 描述: '', option: '', optionData: [] },
            rules: {
                主题: [
                    { required: true, message: '请输入主题', trigger: 'blur' }
                ],
                分类名称: [
                    { required: true, message: '请输入分类', trigger: 'change' }
                ],
            },
            options: [{
                value: '新闻类',
                label: '新闻类'
            }, {
                value: '网站类',
                label: '网站类'
            }, {
                value: '财经类',
                label: '财经类'
            }, {
                value: '法制类',
                label: '法制类'
            }, {
                value: '婚姻类',
                label: '婚姻类'
            }],
            addtpVisible: false,
            tpDialogTitle: '添加投票',
            tableData: {},

            cur_page: 1,
            totalRow: 0,
            page_size: 10,
            select_cate: '',
            select_word: '',
            fields: {
                fielddata: [
                    { fieldname: '分类名称', width: '100', showname: '分类', sortable: true },
                    { fieldname: '主题', width: '250', showname: '主题', sortable: true },
                    { fieldname: '描述', width: '220', showname: '描述', sortable: true },
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
            xuanxiangData: [
                {

                }
            ]
        }
    },
    created() {
        this.getData();
    },
    methods: {
        addTp() {
            this.addtpVisible = true;
            this.tpDialogTitle = '添加投票';
        },
        editTp() {
            this.addtpVisible = true;
            this.tpDialogTitle = '编辑投票';

        },
        closeTp(val) {
            this.addtpVisible = false;
            if (val === "tjzt") {
                saveTpgl(this.tpxx).then(res => {
                    if (res.status == "success") {
                        this.$message.success("操作成功!");
                        this.getData();
                    } else {
                        this.$message.error("操作失败!");
                    }
                });
                this.backdefauletpxx();
            }
        },
        changeType(row) {
            this.tpxx.UUID = row.UUID;
            this.tpxx.主题 = row.主题;
            this.tpxx.多选方式 = row.多选方式;
            this.tpxx.分类名称 = row.分类名称;
            this.tpxx.描述 = row.描述;
            this.tpxxzx.主题id = this.tpxx.UUID;
            // 获取投票选项
            let params = { "主题id": this.tpxx.UUID };
            getTpxxGrid(params).then(res => {
                if (res.status == 'success') {
                    this.tpxx.optionData = res.data.DataList;
                    getTpflGrid({}).then(res_type => {
                        if(res_type.status == 'success'){
                                this.options = [];
                                let data= res_type.data.DataList;
                                for(let item of data){
                                    this.options.push({value:item.分类名称,label:item.分类名称});
                                }
                        }else{
                            this.$message.error(res_type.message);
                        }
                    });
                    this.addtpVisible = true;
                } else {
                    this.$message.error("获取投票选项失败!");
                }

            });

        },
        deloption(row) {
            let param = { uuids: [row.UUID] };
            deleteTpxx(param).then(res => {
                if (res.status == 'success') {
                    this.$message.success("删除成功!");
                    let params = { "主题id": this.tpxx.UUID };
                    getTpxxGrid(params).then(res => {
                        if (res.status == 'success') {
                            this.tpxx.optionData = res.data.DataList;
                            this.addtpVisible = true;
                        } else {
                            this.$message.error("获取投票选项失败!");
                        }

                    });
                } else {
                    this.$message.error(res.message);
                }
            });
        },
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
                dataStatus: this.select_cate,
                dataKeys: this.select_word,
                nowPage: this.cur_page,
                pageSize: this.page_size,
            };
            getTpglGrid(params).then(data => {
                this.tableData = data.data;
            });
        },
        getXh(row, column) {
            return ((this.cur_page - 1) * this.page_size + this.tpxx.optionData.indexOf(row) + 1);
        },
        handleDelete(row) {
            let params = { uuids: [row.UUID] };
            deleteTpgl(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });
        },
        handleupdateYhzt: function(row, zt) {
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
            deleteTpgl(params).then(data => {
                if (data.status == "success") {
                    this.$message.success("删除成功!");
                    this.getData();
                } else {
                    this.$message.error("删除失败!");
                }
            });
        },
        handleSelectionChange: function(val) {
            this.multipleSelection = val;
        },
        tjxx: function() {
            // 添加选项
            // this.tpxx.optionData.push({TPXX:this.tpxx.option})
            // console.log(this.tpxx.optionData)
            this.tpxxzx.主题id = this.tpxx.UUID;
            saveTpxx(this.tpxxzx).then(res => {
                if (res.status == 'success') {
                    this.$message.success("操作成功!");
                    this.tpxxzx = {};
                    let params = { "主题id": this.tpxx.UUID };
                    getTpxxGrid(params).then(res => {
                        if (res.status == 'success') {
                            this.tpxx.optionData = res.data.DataList;
                            this.addtpVisible = true;
                        } else {
                            this.$message.error("获取投票选项失败!");
                        }

                    });
                } else {
                    this.$message.error("操作失败!");
                }
            });
        },
        backdefauletpxx() {
            this.tpxx.uuid = '';
            this.tpxx.主题 = '';
            this.tpxx.fs = '多选';
            this.tpxx.tpfl = '';
            this.tpxx.描述 = '';
            this.tpxx.option = '';
            this.tpxx.optionData = []
        }
    }, components: {
        idttable
    }
}
</script>

<style>
/*投票管理css 李文达*/

.tpgl__mr10 {
    margin-left: 10px;
}

.tpgl__warp .el-input__inner {
    border-radius: 5px;
}

.tpgl__warp .el-form-item__label {
    width: 80px;
}

.tpgl__w80 .el-input__inner {
    width: 500px;
}

.tpgl__w60 .el-input__inner {
    width: 300px;
}

.tpgl__w60 .el-input {
    width: 310px;
}

.tpgl__w40 .el-input {
    width: 200px;
}

.tpgl__warp .el-form-item__content {
    float: left;
}



/*.tpgl__warp .el-dialog{max-height: 90%;overflow-y:auto;}*/
</style>

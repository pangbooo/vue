/*
 * @文档描述: 后台-责任清单
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-10-11 14:18:16 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-12 13:17:13
 */
<template>
<div>
    <div class="table">
        <div class="handle-box"></div>
        <idttable @rowDblclick="rowDblclick" :page_size="page_size" ref="multipleTable" @sortChange="sortChange" :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
            <div slot="buttonHandlers">
                <el-select v-model="select_cate" placeholder="请选择部门" class="handle-select mr10" @change="getDataByDep()">
                    <el-option v-for="(item,index) in bms" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getDataBysearch">
                </el-input>
                <div class="rightfloat">
                    <el-button type="primary" @click="tianjia" icon="plus">添加</el-button>
                    <el-button type="primary" @click="xiugaizrqd" icon="edit">修改</el-button>
                    <el-button type="danger" @click="deletezrqd" icon="delete">删除</el-button>                
                </div>
            </div>
        </idttable>
    </div>
    <el-dialog title="责任清单登记" :visible.sync="dialogFormVisible" @close="cancelzrqd('zrqdform')">
        <div class="zrqddj__div">
            <el-form :model="zrqdform" :rules="zrqdformrules" ref="zrqdform">
                <el-form-item label="部门名称" prop="部门名称" :label-width="formLabelWidth">
                    <el-select v-model="zrqdform.部门名称" placeholder="请选择部门" class="zrqdgl__bmselect" @change="getDataByDep()">
                        <el-option v-for="(item,index) in bmsdj" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门职责" prop="部门职责" :label-width="formLabelWidth">
                    <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 5 }" v-model="zrqdform.部门职责"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelzrqd('zrqdform')" icon="circle-close">取 消</el-button>
            <el-button type="primary" @click="addzrqd('zrqdform')" icon="circle-check">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="责任清单修改" :visible.sync="dialogFormVisiblexg" @close="cancelzrqdxg('zrqdformxg')">
        <div class="zrqddj__div">
            <el-form :model="zrqdformxg" :rules="zrqdformrulesxg" ref="zrqdformxg">
                <el-form-item label="部门名称" prop="部门名称" :label-width="formLabelWidth">
                    <el-select v-model="zrqdformxg.部门名称" placeholder="请选择部门" class="zrqdgl__bmselect" @change="getDataByDep()">
                        <el-option v-for="(item,index) in bmsdj" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门职责" prop="部门职责" :label-width="formLabelWidth">
                    <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 5 }" v-model="zrqdformxg.部门职责"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelzrqdxg('zrqdformxg')" icon="circle-close">取 消</el-button>
            <el-button type="primary" @click="saveXiugai('zrqdformxg')" icon="circle-check">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import idttable from "@/components/table/table.vue";

import bmlist from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft.js';
import { webGetSimpleGridList,saveFormService } from '@/api/common.js';
import { webUpdateBatch,webCommonDelByIds } from '@/api/manage.js';
import { tableIds } from '@/api/tableId.js';

export default {
    data() {
        return {
            dialogFormVisible: false,
            dialogFormVisiblexg: false,
            formLabelWidth: '100px',
            zrqdform: {
                部门名称: '',
                部门职责: ''
            },
            zrqdformxg: {
                部门名称: '',
                部门职责: ''
            },
            zrqdformrules: {
                部门名称: [
                    { required: true, message: '请填写部门名称', trigger: 'blur' }
                ],
                部门职责: [
                    { required: true, message: '请填写部门职责', trigger: 'blur' }
                ]
            },
            zrqdformrulesxg: {
                部门名称: [
                    { required: true, message: '请填写部门名称', trigger: 'blur' }
                ],
                部门职责: [
                    { required: true, message: '请填写部门职责', trigger: 'blur' }
                ]
            },
            tableData: {},
            select_cate: '',
            select_word: '',
            fields: {
                fielddata:[
                    {fieldname:'部门名称',width:'200',showname:'部门名称',sortable:true,overflow: true },
                    {fieldname:'部门职责',width:'700',showname:'部门职责',sortable:false,overflow: true }
                ],
                opertions: {
                    // showname:'操作',
                    // width:'250',
                    // buttons:[
                    //     { name:'通过审核',type:'danger',icon:"edit",script:"scope.row.ZHZT=='登记' || scope.row.ZHZT==''",handler:'handleupdateYhzt',handlerargs:'开通' },
                    //     { name:'解禁',type:'warning',icon:"edit",script:"scope.row.ZHZT=='禁用'",handler:'handleupdateYhzt',handlerargs:'开通' },
                    //     { name:'禁用',type:'warning',icon:"edit",script:"scope.row.ZHZT=='开通'",handler:'handleupdateYhzt',handlerargs:'禁用' },
                    //     { name:'删除',type:'danger',icon:"edit",handler:'handleDelete',handlerargs:'' }
                    // ]
                }
            },
            bms: [
                { label: '全部', value: ''}
            ],
            bmsdj: [],
            cur_page: 1,
            totalRow: 0,
            page_size: 10,
            filter: {},
            uuids: []
        }
    },
    created() {
        this.getData();
        bmlist().then(res => {
            if(res.status === "success"){
                for(let i=0;i<res.data.length;i++){
                    let obj = { label: res.data[i].DWMC, value: res.data[i].DWMC };
                    this.bms.push(obj);
                    this.bmsdj.push(obj);
                }
            }else{
                this.$message.error('服务器异常，请联系管理员！');
            }
        }).catch(res => {
            this.$message.error('网络异常，请检查网络连接！');
        });
    },
    methods: {
        rowDblclick(){

        },
        sortChange(info){
            // console.log(sortInfo.prop); //字段名
            // console.log(sortInfo.order); //排序
        },
        handleCurrentChange(val){
            this.cur_page = val;
            this.getData();
        },
        getData(){
            let params = {
                tableid: tableIds.责任清单,
                filter: this.filter,
                searchKeyFields: ['部门名称','部门职责'],
                nowPage: this.cur_page,
                pageSize: this.page_size
            };
            webGetSimpleGridList(params).then(res => {
                if(res.status === "success"){
                    this.tableData = res.data;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络异常，请检查网络连接！');
            });
        },
        deletezrqd(){
            let multipleSelection = this.$refs.multipleTable.multipleSelection;
            if (multipleSelection.length === 0) {
                this.$message.error('请选择需要删除的清单！');
                return;
            } else {
                let uuids = [];
                for (let a of multipleSelection) {
                    uuids.push(a.UUID);
                }
                let params = {
                    ableId: tableIds.责任清单,
                    uuids: uuids
                };
                webCommonDelByIds(params).then(res => {
                    if(res.status === "success"){
                        this.$message.success('删除成功。');
                        this.getData();
                    }else{
                        this.$message.error('服务器异常，请联系管理员！');
                    }
                }).catch(res => {
                    this.$message.error('网络异常，请检查网络连接！');
                });
            }
        },
        addzrqd(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    let params = {
                        tableId: tableIds.责任清单,
                        params: this.zrqdform
                    };
                    saveFormService(params).then(res => {
                        if(res.status === "success"){
                            this.$message.success('添加成功！');
                            this.$refs[formName].resetFields();
                            this.dialogFormVisible = false;
                            this.getData();
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');
                        }
                    }).catch(res => {
                        this.$message.error('网络异常，请检查网络连接！');
                    });
                } else {
                    return false;
                }
            });
        },
        cancelzrqd(formName){
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();            
        },
        tianjia(){
            this.dialogFormVisible = true;
        },
        getDataByDep(){
            if(this.select_cate){
                this.filter['部门名称'] = this.select_cate;
            }else{
                delete this.filter['部门名称'];
            }
            this.getData();
        },
        getDataBysearch(){
            if(this.select_word){
                this.filter['searchKey'] = this.select_word;
            }else{
                delete this.filter['searchKey'];
            }
            this.getData();
        },
        xiugaizrqd(){
            let multipleSelection = this.$refs.multipleTable.multipleSelection;
            if (multipleSelection.length === 0) {
                this.$message.error('请选择需要修改的清单！');
                return;
            } else {
                this.dialogFormVisiblexg = true;
                for (let a of multipleSelection) {
                    this.uuids.push(a.UUID);
                }
                this.zrqdformxg['部门名称'] = multipleSelection[0]['部门名称'];
                this.zrqdformxg['部门职责'] = multipleSelection[0]['部门职责'];
            }
        },
        cancelzrqdxg(formName){
            this.$refs[formName].resetFields();            
            this.dialogFormVisiblexg = false;
            this.uuids.length = 0;  
        },
        saveXiugai(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    let params = {
                        tableId: tableIds.责任清单,
                        uuids: this.uuids,
                        setMap: {
                            部门名称: this.zrqdformxg['部门名称'],
                            部门职责: this.zrqdformxg['部门职责']
                        }
                    };
                    webUpdateBatch(params).then(res => {
                        if(res.status === "success"){
                            this.$message.success('修改成功');
                            this.$refs[formName].resetFields();
                            this.dialogFormVisiblexg = false;
                            this.uuids.length = 0;
                            this.getData();
                        }else{
                            this.$message.error('服务器异常，请联系管理员！');
                        }
                    }).catch(res => {
                        this.$message.error('网络异常，请检查网络连接！');
                    });
                } else {
                    return false;
                }
            });
        }
    },
    components: {
       idttable
    }
}
</script>

<style>
    .rightfloat{
        float: right;
        padding-right: 10px;
    }
    .handle-select{
        width: 150px;
    }
    .zrqddj__div{
        width: 500px;
        margin: 0 auto;
    }
    .zrqdgl__bmselect{
        width: 400px;
    }
</style>

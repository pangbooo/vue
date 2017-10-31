/*
 * @文档描述: 后台管理-企业资产负面清单
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-10-11 14:17:43 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-12 13:16:35
 */

<template>
<div>
    <div class="table">
        <div class="handle-box"></div>
        <idt-table @rowDblclick="rowDblclick" :page_size="page_size" ref="multipleTable" @sortChange="sortChange" :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
            <div slot="buttonHandlers">
                <el-select v-model="select_cate" placeholder="请选择类别" class="buttonHandlers__select mr10" @change="getDataBylb">
                    <el-option v-for="(item,index) in lbs" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-input class="handle-input mr10" placeholder="筛选关键词" icon="search" v-model="select_word" :on-icon-click="getDataBysearch">
                </el-input>
                <div class="rightfloat">
                    <el-button type="primary" @click="tianjia" icon="plus">添加</el-button>
                    <el-button type="primary" @click="xiugaizrqd" icon="edit">修改</el-button>                    
                    <el-button type="danger" @click="deletezrqd" icon="delete">删除</el-button>
                </div>
            </div>
        </idt-table>
    </div>
    <el-dialog title="资产负面清单登记" :visible.sync="dialogFormVisible" @close="cancelzrqd('zrqdform')">
        <el-form :model="zrqdform" :rules="zrqdformrules" ref="zrqdform">
            <div class="zrqdform__div">
                <el-form-item label="投资领域" prop="投资领域" :label-width="formLabelWidth" required>
                    <el-select v-model="zrqdform.投资领域" placeholder="请选择投资领域" @change="watchTzly" class="zrqdform__div__lb">
                        <el-option v-for="(item,index) in lysdj" :key="index" :label="item.label" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别" prop="类别" :label-width="formLabelWidth">
                    <el-select v-model="zrqdform.类别" placeholder="请选择类别" @change="watchLb" class="zrqdform__div__lb">
                        <el-option v-for="(item,index) in lbsdj" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="国家标准" prop="国家标准" :label-width="formLabelWidth">
                    <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入内容" v-model="zrqdform.国家标准"></el-input>
                </el-form-item>
                <el-form-item label="省级标准" prop="省级标准" :label-width="formLabelWidth">
                    <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入内容" v-model="zrqdform.省级标准"></el-input>
                </el-form-item>
                <el-form-item label="市县标准" prop="市县标准" :label-width="formLabelWidth">
                    <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入内容" v-model="zrqdform.市县标准"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelzrqd('zrqdform')" icon="circle-close">取 消</el-button>
            <el-button type="primary" @click="addzrqd('zrqdform')" icon="circle-check">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="资产负面清单修改" :visible.sync="dialogFormVisiblexg" @close="cancelzrqdxg('zrqdformxg')">
        <el-form :model="zrqdformxg" :rules="zrqdformrulesxg" ref="zrqdformxg">
            <div class="zrqdform__div">
                <el-form-item label="投资领域" prop="投资领域" :label-width="formLabelWidth" required>
                    <el-select v-model="zrqdformxg.投资领域" placeholder="请选择投资领域" @change="watchTzlyxg" class="zrqdform__div__lb">
                        <el-option v-for="(item,index) in lysxg" :key="index" :label="item.label" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别" prop="类别" :label-width="formLabelWidth">
                    <el-select v-model="zrqdformxg.类别" placeholder="请选择类别" @change="watchLbxg" class="zrqdform__div__lb">
                        <el-option v-for="(item,index) in lbsxg" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="国家标准" prop="国家标准" :label-width="formLabelWidth">
                    <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入内容" v-model="zrqdformxg.国家标准"></el-input>
                </el-form-item>
                <el-form-item label="省级标准" prop="省级标准" :label-width="formLabelWidth">
                    <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入内容" v-model="zrqdformxg.省级标准"></el-input>
                </el-form-item>
                <el-form-item label="市县标准" prop="市县标准" :label-width="formLabelWidth">
                    <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入内容" v-model="zrqdformxg.市县标准"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelzrqdxg('zrqdformxg')" icon="circle-close">取 消</el-button>
            <el-button type="primary" @click="saveXiugai('zrqdformxg')" icon="circle-check">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import idttable from "@/components/table/table.vue";

import { webGetSimpleGridList,saveFormService } from '@/api/common.js';
import { webUpdateBatch,webCommonDelByIds } from '@/api/manage.js';
import { tableIds } from '@/api/tableId.js';
import { checklb } from './checklb.js';
export default {
    data() {
        var validateTzly = (rule, value, callback) => {
            if(this.isEmptyObject(value)){
                callback(new Error('请选择投资领域'));
            }else{
                callback();                
            }
        };
        return {
            dialogFormVisible: false,
            dialogFormVisiblexg: false,
            formLabelWidth: '100px',
            uuids: [],
            zrqdform: {
                投资领域: {},
                类别: '',
                国家标准: '',
                省级标准: '',
                市县标准: ''
            },
            zrqdformrules: {
                投资领域: [
                    { validator: validateTzly, trigger: 'change' }
                ],
                类别: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                国家标准: [
                    { required: false, message: '请填写国家标准', trigger: 'blur' }
                ],
                省级标准: [
                    { required: false, message: '请填写省级标准', trigger: 'blur' }
                ],
                市县标准: [
                    { required: false, message: '请填写市县标准', trigger: 'blur' }
                ]
            },
            zrqdformrulesxg: {
                投资领域: [
                    { validator: validateTzly, trigger: 'change' }
                ],
                类别: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                国家标准: [
                    { required: false, message: '请填写国家标准', trigger: 'blur' }
                ],
                省级标准: [
                    { required: false, message: '请填写省级标准', trigger: 'blur' }
                ],
                市县标准: [
                    { required: false, message: '请填写市县标准', trigger: 'blur' }
                ]
            },
            zrqdformxg: {
                投资领域: {},
                类别: '',
                国家标准: '',
                省级标准: '',
                市县标准: ''
            },
            tableData: {},
            select_cate: '',
            select_word: '',
            fields: {
                fielddata:[
                    {fieldname:'投资领域',width:'150',showname:'投资领域',sortable:true,overflow: true},
                    {fieldname:'类别',width:'100',showname:'类别',sortable:true,overflow: true},
                    {fieldname:'国家标准',width:'250',showname:'国家标准',sortable:false,overflow: true},
                    {fieldname:'省级标准',width:'250',showname:'省级标准',sortable:false,overflow: true},
                    {fieldname:'市县标准',width:'160',showname:'市县标准',sortable:false,overflow: true}
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
            lbs: [],
            lysdj: [],
            lysxg: [],
            lbsdj: [],
            lbsxg: [],
            lbsdjall: [],
            lbsxgall: [],
            cur_page: 1,
            totalRow: 0,
            page_size: 10,
            filter: {}
        }
    },
    created() {
        this.lbs = require('./lbs.js');
        this.lysdj = require('./lysdj.js');
        this.lysxg = require('./lysdj.js');
        this.lbsdjall = require('./lbsdjall.js');
        this.lbsxgall = require('./lbsdjall.js');
        this.getData();
    },
    methods: {
        rowDblclick(){

        },
        sortChange(info){
            // console.log(sortInfo.prop); //字段名
            // console.log(sortInfo.order); //排序
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
                this.zrqdformxg['投资领域'] = { label: multipleSelection[0]['投资领域'], value: multipleSelection[0]['投资领域'],index: '0' };
                this.zrqdformxg['类别'] = multipleSelection[0]['类别'];
                this.zrqdformxg['国家标准'] = multipleSelection[0]['国家标准'];
                this.zrqdformxg['省级标准'] = multipleSelection[0]['省级标准'];
                this.zrqdformxg['市县标准'] = multipleSelection[0]['市县标准'];
            }
        },
        saveXiugai(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    let params = {
                        tableId: tableIds.负面清单,
                        uuids: this.uuids,
                        setMap: {
                            投资领域: this.zrqdformxg['投资领域'].value,
                            类别: this.zrqdformxg['类别'],
                            国家标准: this.zrqdformxg['国家标准'],
                            省级标准: this.zrqdformxg['省级标准'],
                            市县标准: this.zrqdformxg['市县标准']
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
        },
        isEmptyObject(obj){ 
            for(let key in obj){
                return false;
            };
            return true;
        },
        watchTzly(){
            this.lbsdj = this.lbsdjall[this.zrqdform['投资领域'].index];
        },
        watchTzlyxg(){
            this.lbsxg = this.lbsxgall[this.zrqdformxg['投资领域'].index];
        },
        watchLbxg(){
            let obj = checklb(this.zrqdformxg['类别']);
            this.zrqdformxg['国家标准'] = obj.a;
            this.zrqdformxg['省级标准'] = obj.b;
            this.zrqdformxg['市县标准'] = obj.c;
        },
        watchLb(){
            let obj = checklb(this.zrqdform['类别']);
            this.zrqdform['国家标准'] = obj.a;
            this.zrqdform['省级标准'] = obj.b;
            this.zrqdform['市县标准'] = obj.c;
        },
        handleCurrentChange(val){
            this.cur_page = val;
            this.getData();
        },
        getDataBylb(){
            if(this.select_cate){
                this.filter['类别'] = this.select_cate;
            }else{
                delete this.filter['类别'];
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
        getData(){
            let params = {
                tableid: tableIds.负面清单,
                filter: this.filter,
                searchKeyFields: ['投资领域','类别','国家标准','省级标准','市县标准'],
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
            // console.log(multipleSelection);
            if (multipleSelection.length === 0) {
                this.$message.error('请选择需要删除的清单！');
                return;
            } else {
                let uuids = [];
                for (let a of multipleSelection) {
                    uuids.push(a.UUID);
                }
                let params = {
                    tableId: tableIds.负面清单,
                    uuids: uuids
                };
                webCommonDelByIds(params).then(res => {
                    if(res.status === "success"){
                        this.$message.success('删除成功');
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
                        tableId: tableIds.负面清单,
                        params: {
                            投资领域: this.zrqdform['投资领域'].value,
                            类别: this.zrqdform['类别'],
                            国家标准: this.zrqdform['国家标准'],
                            省级标准: this.zrqdform['省级标准'],
                            市县标准: this.zrqdform['市县标准']
                        }
                    };
                    saveFormService(params).then(res => {
                        if(res.status === "success"){
                            this.$message.success('添加成功');
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
            this.$refs[formName].resetFields();            
            this.dialogFormVisible = false;
            this.uuids.length = 0;            
        },
        cancelzrqdxg(formName){
            this.$refs[formName].resetFields();            
            this.dialogFormVisiblexg = false;
            this.uuids.length = 0;  
        },
        tianjia(){
            this.dialogFormVisible = true;
        }
    },
    components: {
       'idt-table': idttable
    }
}
</script>

<style>
    .rightfloat{
        float: right;
        padding-right: 10px;
    }
    .zrqdform__div{
        width: 480px;
        margin: 0 auto;
    }
    .zrqdform__div__lb{
        width: 380px;
    }
    .buttonHandlers__select{
        width: 220px;
    }
</style>

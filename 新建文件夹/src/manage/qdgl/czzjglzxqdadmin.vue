/*
 * @文档描述: 登记财政资金专项清单
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-10-11 14:19:03 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-12 11:17:34
 */
<template>
<div>
    <div class="table">
        <div class="handle-box"></div>
        <idttable @rowDblclick="rowDblclick" :page_size="page_size" ref="multipleTable" @sortChange="sortChange" :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
            <div slot="buttonHandlers">
                <el-select v-model="select_cate" placeholder="请选择主管部门" class="handle-select mr10" @change="getDataByDep">
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
    <el-dialog title="登记财政资金专项清单登记" :visible.sync="dialogFormVisible" @close="cancelzrqd('zrqdform')">
        <el-form :model="zrqdform" :rules="zrqdformrules" ref="zrqdform">
            <div class="zrqdform__div">
                <el-form-item label="专项名称" prop="专项名称" :label-width="formLabelWidth">
                    <el-input v-model="zrqdform.专项名称"></el-input>
                </el-form-item>
                <el-form-item label="专项类型" prop="专项类型" :label-width="formLabelWidth">
                    <el-select v-model="zrqdform.专项类型" placeholder="请选择专项类型" class="zrqdform__div__lb">
                        <el-option v-for="(item,index) in lbs" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主管部门" prop="主管部门" :label-width="formLabelWidth">
                    <el-select v-model="zrqdform.主管部门" placeholder="请选择主管部门" class="zrqdform__div__lb">
                        <el-option v-for="(item,index) in bmsdj" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额" prop="金额" :label-width="formLabelWidth">
                    <el-input v-model="zrqdform.金额"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelzrqd('zrqdform')" icon="circle-close">取 消</el-button>
            <el-button type="primary" @click="addzrqd('zrqdform')" icon="circle-check">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="登记财政资金专项清单修改" :visible.sync="dialogFormVisiblexg" @close="cancelzrqdxg('zrqdformxg')">
        <el-form :model="zrqdformxg" :rules="zrqdformrulesxg" ref="zrqdformxg">
            <div class="zrqdform__div">
                <el-form-item label="专项名称" prop="专项名称" :label-width="formLabelWidth">
                    <el-input v-model="zrqdformxg.专项名称"></el-input>
                </el-form-item>
                <el-form-item label="专项类型" prop="专项类型" :label-width="formLabelWidth">
                    <el-select v-model="zrqdformxg.专项类型" placeholder="请选择专项类型" class="zrqdform__div__lb">
                        <el-option v-for="(item,index) in lbs" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主管部门" prop="主管部门" :label-width="formLabelWidth">
                    <el-select v-model="zrqdformxg.主管部门" placeholder="请选择主管部门" class="zrqdform__div__lb">
                        <el-option v-for="(item,index) in bmsdj" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额" prop="金额" :label-width="formLabelWidth">
                    <el-input v-model="zrqdformxg.金额"></el-input>
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

import bmlist from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft.js';
import { webGetSimpleGridList,saveFormService } from '@/api/common.js';
import { webUpdateBatch,webCommonDelByIds } from '@/api/manage.js';
import { tableIds } from '@/api/tableId.js';
// import getZrqd from '@/services/manage/qdgl/getCzzjzxqd.js';
// import deleteZrqd from '@/services/manage/qdgl/deleteZcfmqd.js';
// import addZrqd from '@/services/manage/qdgl/addCzzjzxqd.js';

export default {
    data() {
        var validateJe = (rule, value, callback) => {
            let vreg = /^\d+$/;
            if(vreg.test(value)){
                callback();
            }else{
                callback(new Error('请输入正确的金额，只能是非负整数，小数保留两位小数'));
            }
        };
        return {
            dialogFormVisible: false,
            dialogFormVisiblexg: false,
            formLabelWidth: '100px',
            zrqdform: {
                专项名称: '',
                专项类型: '',
                主管部门: '',
                金额: ''
            },
            zrqdformxg: {
                专项名称: '',
                专项类型: '',
                主管部门: '',
                金额: ''
            },
            zrqdformrulesxg: {
                专项名称: [
                    { required: true, message: '请填写专项名称', trigger: 'blur' }
                ],
                专项类型: [
                    { required: true, message: '请选择专项类型', trigger: 'change' }
                ],
                主管部门: [
                    { required: true, message: '请选择主管部门', trigger: 'change' }
                ],
                金额: [
                    { required: true, message: '请填写金额', trigger: 'blur' },                    
                    { validator: validateJe, trigger: 'blur' }
                ]
            },
            zrqdformrules: {
                专项名称: [
                    { required: true, message: '请填写专项名称', trigger: 'blur' }
                ],
                专项类型: [
                    { required: true, message: '请选择专项类型', trigger: 'change' }
                ],
                主管部门: [
                    { required: true, message: '请选择主管部门', trigger: 'change' }
                ],
                金额: [
                    { required: true, message: '请填写金额', trigger: 'blur' },                    
                    { validator: validateJe, trigger: 'blur' }
                ]
            },
            tableData: {},
            select_cate: '',
            select_word: '',
            fields: {
                fielddata:[
                    {fieldname:'专项名称',width:'250',showname:'专项名称',sortable:true,overflow: true},
                    {fieldname:'专项类型',width:'250',showname:'专项类型',sortable:true,overflow: true},
                    {fieldname:'主管部门',width:'250',showname:'主管部门',sortable:true,overflow: true},
                    {fieldname:'金额',width:'',showname:'金额',sortable:true,overflow: true}
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
            lbs: [
                { laber: '部门预算专项', value: '部门预算专项' },
                { laber: '转移支付专项', value: '转移支付专项' }
            ],
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
                tableid: tableIds.专项资金,
                filter: this.filter,
                searchKeyFields: ['专项名称','专项类型','主管部门','金额'],
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
                    tableId: tableIds.专项资金,
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
                this.zrqdformxg['专项名称'] = multipleSelection[0]['专项名称'];
                this.zrqdformxg['专项类型'] = multipleSelection[0]['专项类型'];
                this.zrqdformxg['主管部门'] = multipleSelection[0]['主管部门'];
                this.zrqdformxg['金额'] = multipleSelection[0]['金额'];
            }
        },
        saveXiugai(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    let params = {
                        tableId: tableIds.专项资金,
                        uuids: this.uuids,
                        setMap: {
                            专项名称: this.zrqdformxg['专项名称'],
                            专项类型: this.zrqdformxg['专项类型'],
                            主管部门: this.zrqdformxg['主管部门'],
                            金额: this.zrqdformxg['金额']
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
        addzrqd(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    let params = {
                        tableId: tableIds.专项资金,
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
        cancelzrqdxg(formName){
            this.dialogFormVisiblexg = false;
            this.$refs[formName].resetFields();
            this.uuids.length = 0;
        },
        getDataByDep(){
            if(this.select_cate){
                this.filter['主管部门'] = this.select_cate;
            }else{
                delete this.filter['主管部门'];
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
        tianjia(){
            this.dialogFormVisible = true;
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
    .zrqdform__div{
        width: 480px;
        margin: 0 auto;
    }
    .zrqdform__div__lb{
        width: 380px;
    }
    .handle-select{
        width: 150px;
    }
</style>

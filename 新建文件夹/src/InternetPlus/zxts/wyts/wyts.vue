/*
 * @Author: 马丽欣 
 * @Date: 2017-09-22
 * @Last Modified by: 
 * @Last Modified time: 
 */
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="location">
        <idt-breadcrumb :page="page" ></idt-breadcrumb>
    </div>
    <div class="ts__title">
        <h1>我要投诉</h1>
        <h2><i class="el-icon-information"></i>受理公众对全省各政府部门行政审批工作效能、工作态度的投诉。</h2>
    </div>
    <div class="center">
        <el-form ref="ruleForm" class="form" :rules="rules" :model="ruleForm" label-width="120px" :inline="true">
            <!-- <el-form-item label="被投诉单位" prop="regiondw">
                <el-select class="select" v-model="ruleForm.regiondw" placeholder="请选择被投诉单位">
                    <el-option v-for="(item,index) in wyts" :key="index" :label="item.DWMC" :value="item.DWMC"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="被投诉单位" prop="regiondw">
                <el-autocomplete class="inline-input" v-model="ruleForm.regiondw" :fetch-suggestions="querySearch" placeholder="请填写咨询单位" @select="handleSelect"></el-autocomplete>
            </el-form-item>
            <el-form-item label="被投诉人/工号" prop="regionsx">
                <el-input class="btsr" v-model="ruleForm.btst"></el-input>
            </el-form-item>
            <el-form-item label="事由" prop="content">
                <el-input class="content" :rows="3"  resize="none" type="textarea" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item label="投诉人" prop="name">
                <el-input class="name" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input class="phone" v-model.number="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="答复方式" prop="answer">
                <el-radio-group class="answer" v-model="ruleForm.answer">
                    <el-radio v-for="(item,index) in wytsData.dffs" :key="index" :label="item.text"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="家庭地址" prop="address">
                <el-input class="address" v-model="ruleForm.address"></el-input>  
            </el-form-item>
            <el-form-item label="是否公开" prop="yesNo">
                <el-radio-group class="yesNo" v-model="ruleForm.yesNo">
                    <el-radio v-for="(item,index) in wytsData.sfgk" :key="index" :label="item.text"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="验证码" prop="checkCode">
                <el-input class="message" v-model="ruleForm.checkCode"></el-input>
            </el-form-item>
            <el-form-item>
                <img @click="getCode()" class="code" :src="'data:image/png;base64,' + code"/>
            </el-form-item>
            <el-form-item label="附件" prop="fj">
                <!--<el-row>
                    <el-col :span="20">	
                        <input type="file" @change="getFile($event)">
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" icon="upload" size="mini" @click="submitUpload($event)">上传</el-button>
                    </el-col>
                </el-row>-->
                <el-row>
                    <div class="upload-demo">
                        <div class="el-upload el-upload--text"><input type="file" name="file" class="upload__input" @change="getFile($event)" ><button type="button" class="el-button el-button--primary el-button--small"><span>点击上传</span></button></div><div class="el-upload__tip">请上传投诉的相关材料，且每个不超过10M</div>
                        <ul class="el-upload-list el-upload-list--text">
                            <li v-for="fileitem in fileList" @click="webDelFile_fn(fileitem.UUID)" :key="fileitem.UUID" class="el-upload-list__item is-success">
                                <a class="el-upload-list__item-name">
                                    <i class="el-icon-document"></i>
                                    {{fileitem.FILENAME}}
                                </a>
                                <span  class="el-upload-list__item-status-label">
                                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                                </span>
                                <i class="el-icon-close"></i>
                                <i class="el-icon-download">download</i>
                            </li>
                        </ul>
                    </div>
                </el-row>
            </el-form-item> 
            <el-form-item>
                <el-button class="submit" type="success" @click="submitForm('ruleForm')">提&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
                <el-button class="reset" type="warning" @click="resetForm('ruleForm')">重&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
    <idt-loginmessage v-if="dialogVisible" @quickLogin="showLogin"></idt-loginmessage>
    <idt-quicklogin v-if="logindialogVisible"></idt-quicklogin>
</div>
</template>
<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtfooter from '@/InternetPlus/common/footer/footer';
import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import loginmessage from '@/InternetPlus/common/loginmessage/loginmessage';
import quicklogin from '@/InternetPlus/common/quicklogin/quicklogin';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import { webUpload, getCode, webCommonFileList } from '@/api/common';
import { webSaveMyForm, webDelFile } from '@/api/manage.js';
import { downloadFile } from '@/lib/publicFun.js';
import { tableIds } from '@/api/tableId';
import { MessageBox } from 'element-ui';
import { tokenWhetherPast,getUserAndCompanyManagerInfo } from '@/api/manage.js';
import { getTime } from '@/lib/publicFun.js';
export default{
    data() {
        var checkCompany = (rule, value, callback) => {
            setTimeout(() => {
                if (value==='') {
                    callback(new Error('投诉单位不能为空'));
                }else{
                    var l = 0;
                    for(var i=0;i<this.wyts.length;i++){
                        if (value === this.wyts[i].DWMC) {
                            ++l;
                        }
                    }
                    if(l==0){
                        callback(new Error('请输入正确的投诉单位'));  
                    }else{
                        callback();
                    }
                    console.log(this.wyts);
                }
            }, 500);
        };
        var checkPhone = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('请输入您的电话'));
            }
            setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('电话号码应该为数字值'));
            } else {
                var partten = /^1[3,4,5,7,8]\d{9}$/;
                if (!partten.test(value)) {
                callback(new Error('请输入正确的电话号码'));
                } else {
                callback();
                }
            }
            }, 500);
        };
        return {
            restaurants: [],
            fileList:[],
            wyts:[],
            code:'',
            page:'wyts',
            ruleForm: {
                uuid:'',
                regiondw: '',
                btsr:'',
                content:'',
                name:'',
                phone:'',
                checkCode:'',
                address:'',
                answer: '',
                yesNo: '',
            }, 
            rules: {
                regiondw: [
                    { required: true, fieldName: '请选择被投诉单位',validator: checkCompany,trigger: 'change' }
                ],
                btsr: [
                    { required: true, message: '请输入被投诉人/工号', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'change' }
                ],
                phone: [
                    { required: true, validator: checkPhone , trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入家庭地址', trigger: 'change' }
                ],
                answer: [
                    { required: true, message: '请选择答复方式', trigger: 'change' }
                ],
                yesNo: [
                    { required: true, message: '请选择是否公开', trigger: 'change' }
                ],
                checkCode: [
                    { required: true, message: '请输入验证码', trigger: 'change' }
                ]
            },
            wytsData:{
                dffs:[
                    {id:1,text:"电话回复",value:"电话回复"},
                    {id:2,text:"网上回复",value:"网上回复"}
                ],
                sfgk:[
                    {id:1,text:"是",value:"是"},
                    {id:2,text:"否",value:"否"} 
                ]
            },
            dialogVisible: false,
            logindialogVisible: false
        }
    },
    watch:{
        wyts:function(){
            for(var key in this.wyts){
                this.wyts[key]["value"]=this.wyts[key].DWMC;
            }
            this.restaurants = this.wyts;
            console.log(this.restaurants);
        }
    },
    components:{
        'idt-header': idtheader,
        'idt-navbar':idtnavbar,
        'idt-footer':idtfooter,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-quicklogin': quicklogin,
        'idt-loginmessage': loginmessage,
        'idt-floatbar': floatbar
    },
    created() {
        tokenWhetherPast().then(res => {
            console.log(res)
            this.dialogVisible = res.status !== 'success' ? true : false;
        });
        let self = this;
        window.onkeypress = function(e){
            if(e.keyCode === 13){
                self.submitForm('ruleForm');
            }
        };
        this.xzqlqdlbleft();
        this.getCode();
        this.webCommonFileList_fn();
        this.judgeUserType();
    },
    methods:{
        judgeUserType(){
            getUserAndCompanyManagerInfo().then(res => {
                if(res.status === 'success'){
                    this.ruleForm.name = res.data.ZSXM;
                    this.ruleForm.phone = res.data.SJH;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(res => {
                this.$message.error('网络连接异常，请检查网络连接！');
            });
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
            return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
        },
        getCode(){
            getCode().then(res=>{
                if(res.status === "success"){
                    this.code = res.data.image;
                    localStorage.setItem("idt_App_key",res.data.key);
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
        xzqlqdlbleft(){
             xzqlqdlbleft().then(res => {
                if (res.status === "success") {
                    this.wyts = res.data;
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                } 
            }).catch(data =>{
                this.$message.error('xzqlqdlbleft异常，请检查网络！')
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let param = {
                    tableId : tableIds.在线投诉,
                    ownerColname: '登记人账户',
                    params : {
                        被投诉单位 : this.ruleForm.regiondw,
                        '被投诉人/工号' : this.ruleForm.btsr,
                        投诉人姓名 : this.ruleForm.name,
                        答复方式 : this.ruleForm.answer,
                        家庭地址 :  this.ruleForm.address,
                        是否公开 : this.ruleForm.yesNo,
                        投诉标题 :  this.ruleForm.content,
                        checkCode : this.ruleForm.checkCode,
                        UUID: this.ruleForm.uuid,
                        表名:tableIds.在线投诉,
                        添加时间: getTime()
                    }
                }
                webSaveMyForm(param).then(res => {
                    if(res.status == "success"){
                        this.$message.success('恭喜您，提交成功！');
                        setTimeout(() => {
                            window.location.href = '/zxts/tslb/index.html';
                        }, 2000);
                    }else{
                        this.$message.error('验证码输入错误，请重试!');
                        this.getCode();
                    }
                })
            } else {
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getCode();
        },
        getFile(event) {
                this.file = event.target.files[0];
                this.submitUpload(event);
        },
        webDelFile_fn(uuid){
            if(uuid){
                this.$confirm('此操作将删除该附件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {};
                    params.fileId = uuid;
                    params.tableId = tableIds.在线投诉;
                    webDelFile(params).then(res => {
                        if(res.status == 'success'){
                            this.$message.success(res.message);
                            this.webCommonFileList_fn();
                        }else{
                            this.$message.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                }); 


                
            }
        },
        webCommonFileList_fn(){
            if(this.ruleForm.uuid){
                 let params = {};
                 params.uuid = this.ruleForm.uuid;
                 params.tableId = tableIds.在线投诉;
                 webCommonFileList(params).then(res => {
                    if(res.status == 'success'){
                        this.fileList = res.data;
                    }else{
                         this.$message.error(res.message);
                    }
                });
            }
            
        },
        submitUpload(event) {
			event.preventDefault();
            this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					if(this.file){
                        let param = {
                            tableId : tableIds.在线投诉,
                            ownerColname: '登记人账户',
                            params : {
                                被投诉单位 : this.ruleForm.regiondw,
                                '被投诉人/工号' : this.ruleForm.btsr,
                                投诉人姓名 : this.ruleForm.name,
                                答复方式 : this.ruleForm.answer,
                                家庭地址 :  this.ruleForm.address,
                                是否公开 : this.ruleForm.yesNo,
                                投诉标题 :  this.ruleForm.content,
                                checkCode : this.ruleForm.checkCode,
                                UUID: this.ruleForm.uuid,
                                表名:tableIds.在线投诉,
                            }
                        }
                        webSaveMyForm(param).then(res => {
							if (res.status === 'success') {
                                this.ruleForm.uuid = res.data.UUID;
                                let formData = new FormData();
								formData.append('tableId', tableIds.在线投诉);
								formData.append('ATTACH_ID', res.data.UUID);
								formData.append('FIELDNAME', 'fj');
                                formData.append('file', this.file);
								webUpload(formData).then(res => {
									if(res.status == "success"){
                                        this.$message.success('上传成功');
                                        this.webCommonFileList_fn();
									}else{
                                        this.$message.success(res.message);
                                    }
								});
							} else {
								this.$message.error('服务器异常，请联系管理员！');
							}
						}).catch(res => {
							this.$message.error('网络异常，请检查网络！');
						});
					}else{
						this.$message.error('请选择文件');
					}
				} else {
					return false;
				}
			});
        },
        showLogin() {
            this.dialogVisible = false;
            this.logindialogVisible = true;
        }
    }
}
</script>
<style scoped>
.ts__title {
    width: 1000px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
}
.ts__title h1 {
    float: left;
    width: 110px;
    font-size: 16px;
    background: url('./img/icon-tsjb.png') 30px 0 no-repeat;
    padding-left: 100px;
    color: #48576a;
    font-weight: 600;
}
.ts__title h2 {
    float: left;
    font-size: 14px;
    color: #c2c2c2;
}
.ts__title h2 i {
    margin-right: 5px;
    color: #1d90e6;
}
.center {
    width: 1000px;
    margin: 0 auto;
    height: auto;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.center:hover {
    box-shadow: 0 0 8px 0 rgba(204, 204, 204, 0.5), 0 2px 4px 0 rgba(204, 204, 204, 0.58);
}
.form {
    width: 900px;
    margin: 30px auto;
    /* padding-left: 100px; */
}
.select,.name,.phone,.btsr,.answer,.address,.yesNo,.inline-input{width: 305px;}
.message {
    width: 205px;
}
.upload,.content{width:745px;}
.getCode{width:116px;}
.code{width:84px;height: 34px;border:1px solid #bfcbd9;border-radius: 2px;}
.answer,
.yesNo {
    width: 293px;
    height: 20px;
    padding: 8px 0 8px 10px;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
}
.answer:hover,
.yesNo:hover {
    border-color: #8391a5;
}
.el-upload__tip{ width:250px; display:block}
.submit{font-size: 16px;margin-left: 358px;}
.reset{font-size: 16px;margin-left: 120px;}
.el-button+.el-button{margin-left: 110px;}
.location{margin:0px auto;width: 1260px;}
.el-textarea .el-textarea__inner{ resize:none;}
.upload__input {font-size:0px;opacity: 0;cursor: pointer;position: absolute; width: 70px; height: 30px; margin-top: 2px; }
</style>
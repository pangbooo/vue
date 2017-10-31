/** 
 * 文档描述: 建议登记
 * 作者: 杨闯 
 * 创建时间: 2017-09-22 11:37:11 
 * 最后修改人: 杨闯 
 * 最后修改时间: 2017-09-22 11:37:11 
 */
<template>
<!-- 我要建议 -->
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="location">
        <idt-breadcrumb :page="page"></idt-breadcrumb>
    </div>
    <div class="jy__title">
        <h1>我要建议</h1>
        <h2><i class="el-icon-information"></i>受理公众对全省各政府部门行政审批工作效能、工作态度的建议。</h2>
    </div>
    <div class="center">
        <el-form ref="ruleForm" class="form" :rules="rules" :model="ruleForm" label-width="80px" :inline="true">
            <el-form-item label="建议标题" prop="title">
                <el-input class="title" v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="建议内容" prop="content">
                <el-input class="content" :rows="3"  resize="none" type="textarea" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <!-- <el-form-item label="受理单位" prop="regiondw">
                <el-select class="select" v-model="ruleForm.regiondw" placeholder="请选择受理单位">
                    <el-option v-for="(item,index) in sldw" :key="index" :label="item.DWMC" :value="item.DWMC"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="受理单位" prop="regiondw">
                <el-autocomplete class="inline-input" v-model="ruleForm.regiondw" :fetch-suggestions="querySearch" placeholder="请填写咨询单位" @select="handleSelect"></el-autocomplete>
            </el-form-item>
            <el-form-item label="您的姓名" prop="name">
                <el-input class="name" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="您的电话" prop="phone">
                <el-input class="phone" v-model.number="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="您的邮箱" prop="qqaddress">
                <el-input class="qqaddress" v-model="ruleForm.qqaddress"></el-input>  
            </el-form-item>
            <el-form-item label="您的性别" prop="sex">
                <el-radio-group class="sex" v-model="ruleForm.sex">
                    <el-radio v-for="(item,index) in ndxb" :key="index" :label="item.text"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="答复方式" prop="answer">
                <el-radio-group class="answer" v-model="ruleForm.answer">
                    <el-radio v-for="(item,index) in dffs" :key="index" :label="item.text"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否公开" prop="yesNo">
                <el-radio-group class="yesNo" v-model="ruleForm.yesNo">
                    <el-radio v-for="(item,index) in sfgk" :key="index" :label="item.text"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="验证码" prop="checkCode">
                <el-input class="message" v-model="ruleForm.checkCode"></el-input>  
            </el-form-item>
            <el-form-item>
                <img @click="getCode()" class="code" :src="'data:image/png;base64,' + code"/>
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
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import loginmessage from '@/InternetPlus/common/loginmessage/loginmessage';
import quicklogin from '@/InternetPlus/common/quicklogin/quicklogin';
import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import { tableIds } from '@/api/tableId.js';
import { getCode } from '@/api/common.js';
import { tokenWhetherPast,getUserAndCompanyManagerInfo,webSaveMyForm } from '@/api/manage.js';
import { checkMobile,checkMail } from '@/lib/verify.js';
import { getTime } from '@/lib/publicFun.js';
export default{
    data() {
        var checkCompany = (rule, value, callback) => {
            setTimeout(() => {
                if (value==='') {
                    callback(new Error('受理单位不能为空'));
                }else{
                    var l = 0;
                    for(var i=0;i<this.sldw.length;i++){
                        if (value === this.sldw[i].DWMC) {
                            ++l;
                        }
                    }
                    if(l==0){
                        callback(new Error('请输入正确的受理单位'));
                    }else{
                        callback();
                    }
                    console.log(this.sldw);
                }
            }, 500);
        };
        return {
            restaurants: [],
            jydj:[],
            page:'jydj',
            code:'',
            sldw:'',
            ruleForm: {
                title: '',
                regiondw: '',
                content:'',
                name:'',
                phone:'',
                checkCode:'',
                qqaddress:'',
                answer: '',
                yesNo: '',
                sex:''
            }, 
            rules: {
                regiondw: [
                    { required: true, fieldName: '请填写正确的受理单位', validator: checkCompany ,trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择您的性别', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请输入建议标题', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请输入建议内容', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入您的姓名', trigger: 'change' }
                ],
                phone: [
                    {required: true, fieldName:'手机',validator: checkMobile , trigger: 'blur' }
                ],
                qqaddress: [
                    {required: true, fieldName:'邮箱', validator: checkMail , trigger: 'blur' }
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
            ndxb:[
                {id:1,text:"男",value:"男"},
                {id:2,text:"女",value:"女"},
                {id:1,text:"保密",value:"保密"}
            ],
            dffs:[
                {id:1,text:"电话回复",value:"电话回复"},
                {id:2,text:"网上回复",value:"网上回复"},
                {id:2,text:"不需要回复",value:"不需要回复"}
            ],
            sfgk:[
                {id:1,text:"是",value:"是"},
                {id:2,text:"否",value:"否"} 
            ],
            dialogVisible: false,
            logindialogVisible: false
        }
    },
    components:{
        'idt-header':idtheader,
        'idt-footer':idtfooter,
        'idt-navbar':idtnavbar,
        'idt-breadcrumb':idtbreadcrumb,
        'idt-loginmessage': loginmessage,
        'idt-quicklogin': quicklogin,
        'idt-floatbar': floatbar
    },
    watch:{
        sldw:function(){
            for(var key in this.sldw){
                this.sldw[key]["value"]=this.sldw[key].DWMC;
            }
            this.restaurants = this.sldw;
            console.log(this.restaurants);
        }
    },
    created() {
        tokenWhetherPast().then(res => {
            this.dialogVisible = res.status !== 'success' ? true : false;
        });
        let self = this;
        window.onkeypress = function(e){
            if(e.keyCode === 13){
                self.submitForm('ruleForm');
            }
        };
        this.getCode();
        this.xzqlqdlbleft();
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
                    console.log(res);
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
                    this.sldw = res.data;
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
                    tableId: tableIds.在线建议,
                    ownerColname: '登记人账户',
                    params: {
                        单位名称: this.ruleForm.regiondw,
                        建议标题: this.ruleForm.title,
                        建议内容: this.ruleForm.content,
                        您的姓名: this.ruleForm.name,
                        您的电话: this.ruleForm.phone,
                        checkCode: this.ruleForm.checkCode,
                        答复方式: this.ruleForm.answer,
                        您的邮箱: this.ruleForm.qqaddress,
                        是否公开: this.ruleForm.yesNo,
                        您的性别: this.ruleForm.sex,
                        表名:tableIds.在线建议,
                        添加时间: getTime()
                    }
                }
                webSaveMyForm(param).then(res => {
                    if(res.status === 'success'){
                        this.$message.success('恭喜您，提交成功！');
                        setTimeout(() => {
                            window.location.href = '/zxts/jylb/index.html';
                        }, 2000);
                    }else{
                        this.$message.error('验证码输入错误，请重试!');
                        this.getCode();
                    }
                }).catch(res => {
                    this.$message.error('网络连接异常，请检查网络连接！');
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getCode();
        },
        showLogin() {
            this.dialogVisible = false;
            this.logindialogVisible = true;
        }
    }
}
</script>
<style scoped>
/* 我要建议表单样式 */
.jy__title {
    width: 1000px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
}
.jy__title h1 {
    float: left;
    width: 110px;
    font-size: 16px;
    background: url('./img/icon-wyjy.png') 30px 0 no-repeat;
    padding-left: 100px;
    color: #48576a;
    font-weight: 600;
}
.jy__title h2 {
    float: left;
    font-size: 14px;
    color: #c2c2c2;
}
.jy__title h2 i {
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
.code{
    width:84px;
    height: 34px;
    border:1px solid #bfcbd9;
    border-radius: 4px;
}
.form {
    width: 900px;
    margin: 30px auto;
    padding-left: 100px;
}
.select,
.name,
.phone,.inline-input,.qqaddress{
    width: 305px;
}
.message {
    width: 205px;
}
.title,
.address,
.content {
    width: 705px;
}

.getCode {
    width: 116px;
}

.answer,
.sex,
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
.submit{font-size: 16px;margin-left: 280px;}
.reset{font-size: 16px;margin-left: 120px;}
.el-button+.el-button{margin-left: 110px;}
.location{margin:0px auto;width: 1260px;}
</style>
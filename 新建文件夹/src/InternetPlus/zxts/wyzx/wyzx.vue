/** 
 * 文档描述: 我要咨询
 * 作者: 杨闯 
 * 创建时间: 2017-09-21 18:44:04 
 * 最后修改人: 杨闯 
 * 最后修改时间: 2017-09-21 18:44:04 
 */
<template>
    <!-- 我要咨询 -->
    <div>
        <idt-header></idt-header>
        <idt-navbar></idt-navbar>
        <div class="location">
            <idt-breadcrumb :page="page"></idt-breadcrumb>
        </div>
        <div class="zx__title">
            <h1>在线咨询</h1>
            <h2><i class="el-icon-information"></i>受理公民、法人和其他组织在政务服务网办事过程中有关法规、政策和程序等问题的咨询。</h2>
        </div>
        <div class="center">
            <el-form ref="ruleForm" class="form" :rules="rules" :model="ruleForm" label-width="80px" :inline="true">
                <el-form-item label="咨询人" prop="name">
                    <el-input class="name" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="咨询单位" prop="regiondw">
                    <el-select class="select" v-model="ruleForm.regiondw" placeholder="请选择咨询单位">
                        <el-option v-for="(item,index) in zxdw" :key="index" :label="item.DWMC" :value="item.DWMC"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="咨询单位" prop="regiondw">
                    <el-autocomplete class="inline-input" v-model="ruleForm.regiondw" :fetch-suggestions="querySearch" placeholder="请填写咨询单位" @select="handleSelect"></el-autocomplete>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input class="title" v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input class="content" :rows="3"  resize="none" type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                
                <el-form-item label="联系电话" prop="phone">
                    <el-input class="phone" v-model.number="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="答复方式" prop="answer">
                    <el-radio-group class="answer" v-model="ruleForm.answer">
                        <el-radio v-for="(item,index) in dffs" :key="index" :label="item.text"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="家庭地址" prop="address">
                    <el-input class="address" v-model="ruleForm.address"></el-input>
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
import navbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import loginmessage from '@/InternetPlus/common/loginmessage/loginmessage';
import quicklogin from '@/InternetPlus/common/quicklogin/quicklogin';
import xzqlqdlbleft from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbleft';
import xzqlqdlbright from '@/services/InternetPlus/qlqd/xzqlqd/xzqlqdlbright';
import getzxll from '@/services/common/zxts/wyzx/zxll';
import { queryString } from '@/lib/publicFun.js';
import { tableIds } from '@/api/tableId.js';
import { getCode } from '@/api/common.js';
import { tokenWhetherPast,getUserAndCompanyManagerInfo,webSaveMyForm } from '@/api/manage.js';
import { getTime } from '@/lib/publicFun.js';
import { checkMobile } from '@/lib/verify.js';
export default {
    data() {
        var checkCompany = (rule, value, callback) => {
            setTimeout(() => {
                if (value==='') {
                    callback(new Error('咨询单位不能为空'));
                }else{
                    var l = 0;
                    for(var i=0;i<this.zxdw.length;i++){
                        if (value === this.zxdw[i].DWMC) {
                            ++l;
                        }
                    }
                    if(l==0){
                        callback(new Error('请输入正确的咨询单位'));  
                    }else{
                        callback();
                    }
                    console.log(this.zxdw);
                }
            }, 500);
        };
        return {
            restaurants: [],
            wyzx: [],
            zxdw: [],
            zxsx: [],
            uuid: '',
            code:'',
            page: 'wyzx',
            ruleForm: {
                title: '',
                regiondw: '',
                // regionsx: '',
                content: '',
                name: '',
                phone: '',
                checkCode: '',
                address: '',
                answer: '',
                yesNo: ''
            },
            rules: {
                regiondw: [
                    { required: true, fieldName: '请填写正确的咨询单位',validator: checkCompany ,trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请输入标题', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'change' }
                ],
                phone: [
                    { required: true, fieldName:'电话',validator: checkMobile , trigger: 'blur' }
                ],
                address: [
                    { required: false, message: '请输入家庭地址', trigger: 'change' }
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
            dffs: [
                { id: 1, text: "电话回复", value: "电话回复" },
                { id: 2, text: "网上回复", value: "网上回复" }
            ],
            sfgk: [
                { id: 1, text: "是", value: "是" },
                { id: 2, text: "否", value: "否" }
            ],
            dialogVisible: false,
            logindialogVisible: false
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-footer': idtfooter,
        'idt-navbar': navbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-loginmessage': loginmessage,
        'idt-quicklogin': quicklogin,
        'idt-floatbar': floatbar
    },
    // mounted() {
    //   this.restaurants = this.zxdw();
    // },
    watch:{
        zxdw:function(){
            for(var key in this.zxdw){
                this.zxdw[key]["value"]=this.zxdw[key].DWMC;
            }
            this.restaurants = this.zxdw;
            console.log(this.restaurants);
        }
    },
    created() {
        tokenWhetherPast().then(res => {
            this.dialogVisible = res.status !== 'success' ? true : false;
            // this.logindialogVisible = res.status !== 'success' ? true : false;
        });
        let self = this;
        window.onkeypress = function(e){
            if(e.keyCode === 13){
                self.submitForm('ruleForm');
            }
        };
        this.xzqlqdlbleft();
        this.uuid = queryString('WZID');
        if (this.uuid !== null) {
            this.getzxll();
        }
        this.getCode();
        this.judgeUserType();
    },
    methods: {
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
        // loadAll() {    
        //     return this.zxdw;
        // },
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
        changeTitle(msg) {
            if (msg == null) {
                return;
            } else {
                return msg.slice(0, 20);
            }
        },
        getzxll() {
            let params = {
                tableId: tableIds.事项基本信息,
                uuid: this.uuid
            };
            getzxll(params).then(res => {
                if (res.status === "success") {
                    this.ruleForm.regiondw = res.data.单位名称;
                    // this.ruleForm.regionsx = res.data.职权名称;
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
        xzqlqdlbleft() {
            xzqlqdlbleft().then(res => {
                if (res.status === "success") {
                    this.zxdw = res.data;
                    // alert(this.zxdw[0].DWMC);
                    // for(var i=0;i<this.zxdw.length;i++){
                    //     this.mydwmc[i].push({'value' : this.zxdw[i].DWMC});
                    // }
                } else {
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data => {
                this.$message.error('xzqlqdlbleft异常，请检查网络！')
            })
        },
        showLogin() {
            this.dialogVisible = false;
            this.logindialogVisible = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                        tableId: tableIds.在线咨询,
                        ownerColname: '登记人账户',
                        params: {
                            单位名称: this.ruleForm.regiondw,
                            咨询事项: this.ruleForm.regionsx,
                            咨询标题: this.ruleForm.title,
                            咨询内容: this.ruleForm.content,
                            咨询人姓名: this.ruleForm.name,
                            咨询人手机号: this.ruleForm.phone,
                            checkCode: this.ruleForm.checkCode,
                            答复方式: this.ruleForm.answer,
                            家庭地址: this.ruleForm.address,
                            是否公开: this.ruleForm.yesNo,
                            咨询时间: getTime(),
                            表名:tableIds.在线咨询,
                            咨询方式:'网上咨询',
                        }
                    }
                    webSaveMyForm(param).then(res => {
                        if (res.status === 'success') {
                            this.$message.success('恭喜您，提交成功！');
                            setTimeout(() => {
                                window.location.href = '/zxts/zxlb/index.html';
                            }, 2000);
                        } else {
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
        }
    }
}
</script>
<style scoped>
/* 我要咨询表单样式 */
.zx__title {
    width: 1000px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
}
.zx__title h1 {
    float: left;
    width: 110px;
    font-size: 16px;
    background: url('./img/icon-zxzx.png') 30px 0 no-repeat;
    padding-left: 100px;
    color: #48576a;
    font-weight: 600;
}
.zx__title h2 {
    float: left;
    font-size: 14px;
    color: #c2c2c2;
}
.zx__title h2 i {
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
.code{
    width:84px;
    height: 34px;
    border:1px solid #bfcbd9;
    border-radius: 4px;
}
.center:hover {
    box-shadow: 0 0 8px 0 rgba(204, 204, 204, 0.5), 0 2px 4px 0 rgba(204, 204, 204, 0.58);
}
.form {
    width: 900px;
    margin: 30px auto;
    padding-left: 100px;
}
.select,
.name,
.phone,.inline-input{
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
.submit {
    font-size: 16px;
    margin-left: 280px;
}

.reset {
    font-size: 16px;
    margin-left: 120px;
}

.el-button+.el-button {
    margin-left: 110px;
}

.location {
    margin: 0px auto;
    width: 1260px;
}
</style>
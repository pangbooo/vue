/*
 * @文档描述: 快速登录
 * @参数: back Boolean型 取消是否返回上一页 true(默认) 返回  false 不返回
 * @作者: 孔祥超 
 * @创建时间: 2017-09-29 15:56:59 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-10-18 11:14:33
 */
<template>
    <div class="quicklogin">
        <el-dialog :custom-class="'quicklogin__dialog'" top="25%" :visible.sync="dialogVisible" size="tiny" :close-on-press-escape="false" :show-close="false" :close-on-click-modal="false">
            <div v-if="loginways === 'account'" class="quicklogin__account">
                <div class="quicklogin__title" >
                    <div class="quicklogin__title__text">
                        <span class="quicklogin__title__text__main">账号登陆</span>
                        <span class="quicklogin__title__text__tip" @click="loginways='qrcode'">扫码登录更安全>></span>
                    </div>
                    <div class="quicklogin__title__switch" @click="loginways='qrcode'">
                        <i class="quicklogin__title__qrcode"></i>
                    </div>
                </div>
                
                <div class="quicklogin__form">
                    <el-form :model="formdj" :rules="formdjrules" ref="formdj"  class="demo-ruleForm" >
                        <el-form-item  prop="userName">
                            <el-input v-model="formdj.userName" placeholder="用户名/手机号码/身份证"></el-input>
                        </el-form-item>
                        <el-form-item  prop="password">
                            <el-input type="password" v-model="formdj.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item  prop="checkCode">
                            <el-input v-model="formdj.checkCode" class="login__input" placeholder="请输入验证码"></el-input>
                            <div class="login__yzm" @click="checkYZM">
                                <img :src="'data:image/png;base64,' + yzmbase64"/>
                            </div>      
                        </el-form-item>
                    </el-form>
                    <div class="quicklogin__link clr">
                        <el-checkbox v-model="autoLogin" class="quicklogin__link__autologin">下次自动登录</el-checkbox>
                        <a class="quicklogin__link__regist" href="/user/regist/index.html">注册账号</a>
                        <a class="quicklogin__link__forgetpsw" href="">忘记密码</a>
                    </div>
                    <div class="quicklogin__btn">
                        <el-button type="primary" :disabled="dengludisabled" @click="denglu('formdj')">立即登录</el-button>
                        <el-button type="danger" @click="closeDialog">暂不登录</el-button>
                    </div>
                </div>
            </div>
            <div v-if="loginways === 'qrcode'" class="quicklogin__qrcode">
                <div class="quicklogin__title" >
                    <div class="quicklogin__title__text">
                        <span class="quicklogin__title__text__main">扫码登录</span>
                        <span class="quicklogin__title__text__tip" @click="loginways='account'">账号登录>></span>
                    </div>
                    <div class="quicklogin__title__switch" @click="loginways='account'">
                        <i class="quicklogin__title__account"></i>
                    </div>
                </div>
                <div class="quicklogin__qrcode-login">
                    <div class="qrcode-main">
                        <div class="qrcode-img">
                            <img src="./img/qrcode.png">
                        </div>
                    </div>
                    <div class="qrcode-panel">
                        <ul>
                            <li class="fore1">
                                <span>打开</span>
                                <span class="red">手机APP</span></a>
                            </li>
                            <li>扫描二维码</li>
                        </ul>
                    </div>
                    <div class="coagent qr-coagent" id="qrCoagent">
                        <ul>
                            <li><b></b><em>免输入</em></li>
                            <li><b class="faster"></b><em>更快&nbsp;</em></li>
                            <li><b class="more-safe"></b><em>更安全</em></li>
                        </ul>
                    </div>
                    <div class="quicklogin__btn">
                        <el-button type="primary"  @click="regist()">立即注册</el-button>
                        <el-button type="danger" @click="closeDialog">暂不登录</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import denglu from '@/services/InternetPlus/user/Login.js';
import { getCode } from '@/api/common.js';
import md5 from 'js-md5';
export default {
    props: {
        back: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page: 'login',
            params: [],
            dengludisabled: false,
            formdj: {
                userName: '',
                password: '',
                checkCode: ''
            },
            formdjrules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            yzmbase64:'',

            autoLogin: false,
            loginways: 'account',
            dialogVisible: true
        }
    },
    components: {
    },
    created() {
        let self = this;
        // 回车键登录
        window.onkeypress = function(e){
            if(e.keyCode === 13){
                self.denglu('formdj');
            }
        };
        this.checkYZM();
        localStorage.removeItem('idt_App_token');
        localStorage.removeItem('idt_App_personInfo');
        localStorage.removeItem('idt_App_key');
    },
    methods: {
        // 获取验证码
        checkYZM(){
            getCode().then(res=>{
                if(res.status === "success"){
                    this.yzmbase64 = res.data.image;
                    localStorage.setItem("idt_App_key",res.data.key);
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
        // 登录
        denglu(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.formdj;
                    denglu(params).then(res => {
                        if (res.status === "success") {
                            // var index = res.data.fristPageList[0].INDEX_TEMPLATE;
                            let personinfo = {
                                username: res.data.userealname,
                                zh: res.data.userName,
                                zw: res.data.zw
                            }
                            this.dengludisabled = true;
                            localStorage.setItem('idt_App_token', res.data.token);
                            localStorage.setItem('idt_App_personInfo', JSON.stringify(personinfo));
                            this.$parent.logindialogVisible = false;
                            this.$root.$children[0].$children[0].$children[0].getUserInfo();
                            this.$emit('loginSuccess');
                            this.$message.success('登录成功!');
                        } else {
                            this.$message.error(res.message);
                            this.checkYZM();
                        }
                    }).catch(data => {
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                } else {
                    return false;
                }
            });
        },
        closeDialog() {
            this.back ? window.history.go(-1) : this.$parent.logindialogVisible = false;
        },
        regist() {
            window.open('/user/regist/index.html', '_self');
        }
    }
}
</script>

<style scoped>
.quicklogin__btn {
    margin-top: 20px;
    text-align: center;
}
.quicklogin__title {
    position: relative;
    width: 390px;
    overflow: hidden;
    margin: -20px 0 0 -20px;
}
.quicklogin__title__text {
    float: left;
    width: 350px;
    height: 40px;
    line-height: 40px;
    margin: 0 0 0 -20px;
    padding-left: 40px;
    font-size: 20px;
    color: #fbfdff;
    background-color: #48576a;
    transform: skew(45deg);
}
.quicklogin__title__text__tip {
    float: right;
    font-size: 14px;
    padding-right: 22px;
    transform: skew(-45deg);
    cursor: pointer;
}
.quicklogin__title__text__tip:hover {
    color: #cce9ff;
}
.quicklogin__title__text__main {
    float: left;
    width: 180px;
    transform: skew(-45deg);
}
.quicklogin__title__switch {
    width: 40px;
    height: 40px;
    position: absolute;
    background-color:#ff4949;
    top: 0;
    right: -20px;
    transform: skew(45deg);
    overflow: hidden;
    cursor: pointer;
}
.quicklogin__title__switch:hover {
    background-color: #1d90e6;
}

.quicklogin__title__qrcode {
    display: block;
    width: 40px;
    height: 40px;
    margin-left: -20px;
    transform: skew(-45deg);
    background: url('./img/erweima.png');
}
.quicklogin__title__account {
    display: block;
    width: 40px;
    height: 40px;
    margin-left: -20px;
    transform: skew(-45deg);
    background: url('./img/account.png');
}
.quicklogin__form {
    width: 350px;
    margin: 30px auto 0 auto;
}

.login__input {
    width: 262px;
}

.login__yzm {
    width: 80px;
    height: 34px;
    border: 1px solid #ccc;
    display: inline-block;
    margin-left: 5px;
    position: absolute;
    cursor: pointer;
    border-radius: 3px;
}
.login__yzm img{
    vertical-align: unset;
    width: 100%;
    height: 100%;
}
.quicklogin__link {
    width: 100%;
}
.quicklogin__link__autologin {
    float: left;
    padding-left: 20px;
}
.quicklogin__link__regist {
    color: #ff4949;
    float: left;
    padding-left: 75px;
}
.quicklogin__link__forgetpsw {
    color: #ff4949;
    float: right;
    padding-right: 20px;
}
.quicklogin__link__regist:hover,
.quicklogin__link__forgetpsw:hover {
    color: #20a0ff;
}
.quicklogin__qrcode-login {
    width: 100%;
    margin: 0 auto;
    text-align: center;
}
.qrcode-main {
    position: relative;
    height: 168px;
    margin-top: 40px;
}
.qrcode-img {
    border: 1px solid #f4f4f4;
    width: 150px;
    height: 150px;
    margin: 0 auto;
}
.qrcode-img img {
    width: 100%;
    height: 100%;
    background-size: 100%;
}
.qrcode-panel {
    width: 257px;
    margin:18px auto 14px;
    text-align: center;
}
.qrcode-panel li {
    display: inline-block;
    padding: 0 0 0 5px;
    margin: 0 5px 0 0;
}
.qrcode-panel .red {
    color: #e4393c;
}
.qr-coagent {
  background-color: #fff;
  font-family: "microsoft yahei";
  color: #999;
  border: none;
  padding: 0;
  line-height: 25px;
  margin-left: 50px;
  height: 20px;
  margin-bottom: 20px;
}

.qr-coagent li {
  text-align: left;
  position: relative;
  margin-right: 18px;
  float: left;
}
.qr-coagent li b {
  width: 25px;
  height: 25px;
  display: block;
  background: url(./img/qr-coagent.png) no-repeat;
  margin: 0 auto;
  position: absolute;
  left: 0
}
.qr-coagent li .faster {
  background-position: -27px
}

.qr-coagent li .more-safe {
  background-position: -54px
}

.qr-coagent li em {
  padding-left: 32px;
  *display: inline-block;
  _display: inline
}
</style>
<style>
.quicklogin .quicklogin__dialog {
    width: 390px;
    border-radius: 5px;
}
.quicklogin__dialog .el-dialog__body {
    padding: 10px 20px 20px;
}
</style>


<template>
    <div class="login-wrap">
        <div class="ms-title">
            <div class="logo"></div>
            <div class="biaodan">
                <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="80px" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="username" label="用户名">
                        <el-input v-model="ruleForm.username" placeholder="用户名" class="username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <el-input type="password" placeholder="密码" v-model="ruleForm.password"  class="username"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="YZM">
                        <el-input v-model="ruleForm.checkCode" class="login__input" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                        <div class="login__yzm" @click="resetCode" title="点击刷新"><img :src="'data:image/png;base64,' + yzmbase64" /></div>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')" class="denglu">登录</el-button>
                    </div>
                    <p style="position:absolute;margin-top:50px;margin-left:80px;font-size:12px;line-height:30px;color:#999;">提示 : 用户名和密码随便填。</p>
                </el-form>
            </div>
        </div>
        <div class="footer">版权所有©大连倚天软件股份有限公司</div>
    </div>
</template>

<script>
import login from '@/services/InternetPlus/user/Login.js';
import checkYzm from '@/services/InternetPlus/user/checkYzm.js';
export default {
    data() {
        return {
            labelPosition: 'right',
            yzmbase64:'',
            ruleForm: {
                username: '',
                password: '',
                checkCode: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },created(){
        this.checkYZM();
        //清除 localStrong
        localStorage.removeItem('idt_App_token');
        localStorage.removeItem('idt_App_businessName');
        localStorage.removeItem('idt_App_key');
    },
    methods: {
        resetCode(){
            this.checkYZM();
        },
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {};
                    param.userName = self.ruleForm.username;
                    param.password = self.ruleForm.password;
                    param.checkCode = self.ruleForm.checkCode;
                    login(param).then(res => {
                        if (res.status === "success") {
                            var index = res.data.fristPageList[0].INDEX_TEMPLATE;
                            this.dengludisabled = true;
                            let personinfo = {
                                username: res.data.userealname,
                                zh: res.data.userName,
                                zw: res.data.zw
                            }
                            localStorage.setItem('idt_App_personInfo', JSON.stringify(personinfo));
                            localStorage.setItem('idt_App_token', res.data.token);
                            localStorage.setItem('idt_App_businessName', res.data.businessName);
                            // alert(localStorage.getItem('ms_token'));
                            this.$message.success('登陆成功!2秒后跳到首页，请稍后。');
                            setTimeout(() => {
                                window.location.href = index;
                            }, 2000);
                        } else {
                            this.$message.error(res.message);
                             this.checkYZM();
                        }
                        //self.$router.push('/');
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
          checkYZM(){
            checkYzm().then(res=>{
                if(res.code === "idt-oApp-5000"){
                    this.yzmbase64 = res.data.image;
                    localStorage.setItem("idt_App_key",res.data.key);
                    // this.$message.success('注册成功!2秒后跳到登录页，请稍后。');
                    // setTimeout(() => {
                    //     window.location.href= '/user/login/index.html';
                    // }, 2000);
                }else{
                    this.$message.error('服务器异常，请联系管理员1！');
                }
            })
        },
    }
}
</script>

<style scoped>
.login-wrap {
    width: 100%;
    height: 100%;
    background: url(./img/login-bg.png) center no-repeat;
    max-width: 1366px;
    max-height: 640px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    /* IE 9 */
    -moz-transform: translate(-50%, -50%);
    /* Firefox */
    -webkit-transform: translate(-50%, -50%);
    /* Safari 和 Chrome */
    -o-transform: translate(-50%, -50%);
    /* Opera */
}

.logo {
    width: 355px;
    height: 50px;
    background: url(./img/logo_1.png) no-repeat;
    position: absolute;
    margin-left: 58%;
    margin-top: 10%;
}

.biaodan {
    position: absolute;
    margin-top: 14%;
    margin-left: 58%;
}

.username {
    width: 240px;
}

.login-btn {
    position: absolute;
    margin-top: 0px;
    margin-left: 25%;
}

.denglu {
    width: 240px;
}
.login__input {
    width: 100px;
}
.login__yzm {
    width: 80px;
    height: 34px;
    /*background: url('http://199.66.68.231:18080/idtservice/oApp/getCode');*/
    border: 1px solid #ccc;
    display: inline-block;
    margin-left: 5px;
    position: absolute;
}
.login__yzm img{
    vertical-align: unset;
}
.footer {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #03a9f5;
    font-family: 微软雅黑;
    position: absolute;
    bottom: 0;
    background-color: #f2f2f2;
}
</style>
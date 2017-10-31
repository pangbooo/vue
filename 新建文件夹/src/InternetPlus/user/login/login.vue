/*
 * @作者: rita.ma 
 * @创建时间: 2017-09-20 11:28:23 
 * @最后修改人:   李文达 
 * @最后修改时间: 2017-09-21 11:28:23 
 */
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div id="login" class="login">
        <div class="login__breadcrumb">
            <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
        </div>
        <div class="login__container clr">
            <div class="login__container_left">
                <div class="login__container_left__div">
                    <el-form :model="formdj" :rules="formdjrules" ref="formdj" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model="formdj.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="formdj.password"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="checkCode">
                            <el-input v-model="formdj.checkCode" class="login__input"></el-input>
                            <div class="login__yzm" @click="checkYZM" title="点击刷新">
                                <img :src="'data:image/png;base64,' + yzmbase64"/>
                            </div>      
                        </el-form-item>
                        <el-form-item>
                            <a class="login__returnsy" href="/index.html">返回首页</a>
                            <a class="login__forgetpsw" href="">忘记密码</a>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :disabled="dengludisabled" @click="denglu('formdj')">立即登录</el-button>
                            <el-button @click="resetdenglu('formdj')">重&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 登录信息结束 -->
            </div>
            <!-- 左侧区域结束 -->
            <!-- 右侧区域 -->
            <div class="login__container_right">
                <h1>温馨提示：</h1>
                <ul>
                    <li>一、初级认证可以任意浏览网站信息；</li>
                    <li>二、经过中级认证后，可以发布供求、物业报修、网友评论等相关信息；</li>
                    <li>三、经过高级认证后，可以在“一站式城市综合服务平台”上在线申报办政务大厅各单位审批事项，可以提交市民建议等，享受该网站为市民提供的衣、食、住、行等系列一站式综合服务 </li>
                </ul>
            </div>
            <!-- 右侧区域结束 -->
        </div>
        </div>
    <idt-footer></idt-footer>
</div>    
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header.vue';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtfooter from '@/InternetPlus/common/footer/footer.vue';

import denglu from '@/services/InternetPlus/user/Login.js';
import { getCode } from '@/api/common.js';
export default {
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
            yzmbase64:''
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar': idtnavbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-footer': idtfooter
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
                            let personinfo = {
                                username: res.data.userealname,
                                zh: res.data.userName,
                                zw: res.data.zw
                            }
                            var index = res.data.fristPageList[0].INDEX_TEMPLATE;
                            this.dengludisabled = true;
                            localStorage.setItem('idt_App_token', res.data.token);
                            localStorage.setItem('idt_App_personInfo', JSON.stringify(personinfo));
                            if(localStorage.getItem("history")){
                                window.location.href = localStorage.getItem("history");
                                this.$message.success('登录成功!');
                                localStorage.setItem("history",'');
                            }else{
                                this.$message.success('登录成功!2秒后跳到首页，请稍后。');
                                setTimeout(() => {
                                    window.location.href = index;
                                }, 2000);
                            }
                           
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
        // 重置
        resetdenglu(formName) {
            this.$refs[formName].resetFields();
        },
    }
}

</script>

<style scoped>
/* 
    css belong to login.vue
*/
.login__breadcrumb{
    width: 1250px;
    margin: 0 auto;
    
}
.login__container {
    position: relative;
    width: 1250px;
    min-height: auto;
    background: #FFFFFF;
    margin: 0 auto 20px auto;
    border: 1px solid #cccccc;
}

.login__returnsy {
    color: #4db3ff;
    float: left;
}

.login__input {
    width: 210px;
}

.login__yzm {
    width: 80px;
    height: 34px;
    border: 1px solid #ccc;
    display: inline-block;
    margin-left: 5px;
    position: absolute;
    cursor: pointer;
}
.login__yzm img{
    vertical-align: unset;
    width: 100%;
    height: 100%;
}

.login__forgetpsw {
    color: #4db3ff;
    float: right;
}

.login__container_left__div {
    width: 400px;
    margin: 65px auto 60px auto;;
}


/*左侧区域*/

.login__container_left {
    width: 670px;
    min-height: 405px;    
    margin: 30px 20px;
    float: left;
}

/*登录信息*/

.login__container_left_input {
    width: 420px;
    height: auto;
    margin: 0 auto;
}

.login__container_left_input ul {
    margin-top: 65px;
}

.login__container_left_input li {
    width: 420px;
    height: 25px;
    margin: 25px 0;
}

.login__container_left_input span {
    font-family: "Microsoft Yahei";
    font-size: 18px;
    color: #333333;
}

.login__container_left_input>a {
    font-family: "Microsoft Yahei";
    font-size: 14px;
    color: #3f96e7;
}

.login__container_left_input>a:nth-child(2) {
    float: left;
}

.login__container_left_input>a:nth-child(3) {
    float: right;
}

.login__container_left_input_button {
    width: 420px;
    height: 54px;
    background: #3e96e7;
    border: none;
    font-family: "Microsoft Yahei";
    font-size: 20px;
    color: #ffffff;
    margin: 30px 0;
}

.login__container_left_input>input:hover {
    cursor: pointer;
}

/*右侧区域*/

.login__container_right {
    width: 500px;
    min-height: 405px;
    float: right;
    border-left: 1px solid #7d7d7d;
    border-image: -webkit-linear-gradient(#ffffff, #7d7d7d, #ffffff) 0 1;
    border-image: -moz-linear-gradient( #ffffff, #7d7d7d, #ffffff) 0 1;
    border-image: linear-gradient( #ffffff, #7d7d7d, #ffffff) 0 1;
    margin: 30px 0;
}

.login__container_right h1 {
    font-family: "Microsoft Yahei";
    font-size: 20px;
    color: #fa791d;
    font-weight: bold;
    margin: 48px 0 30px 39px;
}

.login__container_right li {
    font-family: "Microsoft Yahei";
    font-size: 18px;
    color: #666666;
    width: 434px;
    line-height: 28px;
    margin-left: 39px;
}
</style>

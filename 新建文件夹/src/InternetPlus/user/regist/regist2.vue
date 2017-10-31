/* 
    描述：注册
    作者：李文达
    创建时间：2017年9月19日
    最后修改人：李文达
    最后修改时间：2017年9月19日
*/
<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div id="regist" class="regist">
        <div class="regist__crumbs">
            <span>欢迎注册倚天互联网+政务服务通行证</span>
        </div>
        <div class="regist__con clr">
    	<!-- 左侧表单begin-->
    	<div class="regist__l fl">
            <div class="regist__group">
            	<!-- 市民注册begin-->
                <div class="regist__formzhuce">
                    <el-form :model="formzhuce" :rules="formzhucerules" ref="formzhuce" label-width="100px">
                        <el-form-item label="注册类型" prop="YHLX">
                            <el-radio-group v-model="formzhuce.YHLX">
                                <el-radio label="市民">个人注册</el-radio>
                                <el-radio label="企业">法人注册</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="真实姓名" prop="NC">
                            <el-input v-model="formzhuce.NC"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="YHM">
                            <el-input v-model="formzhuce.YHM"></el-input>
                        </el-form-item> 
                        <el-form-item label="短信验证码">
                            <el-input placeholder="请输入内容" v-model="formzhuce.checkCode">
                                <el-button slot="append" :disabled="isNotsend" @click="showYzmdialog">{{yzmMsgBtn}}</el-button>
                            </el-input>
                        </el-form-item> 
                        <el-form-item label="密码" prop="MM">
                            <el-input type="password" @change="checkMMstrength()" v-model="formzhuce.MM" placeholder="由6-16位英文字母、数字或下划线组成"></el-input>
                        </el-form-item>
                        <div class="regist__mmqiangdu">
                            <span class="regist__input__dj">
                            	<i :class="level === 1 ? 'regist__input__dj__l' : ''"></i>
                                <i :class="level === 2 || level === 3 ? 'regist__input__dj__m' : ''"></i>
                                <i :class="level === 4 ? 'regist__input__dj__h' : ''"></i>
                            </span>
                            <span class="regist__input__djtext">
                            	<i>弱</i>
                                <i>中</i>
                                <i>强</i>
                            </span>
                        </div>
                        <el-form-item label="确认密码" prop="RMM">
                            <el-input type="password" v-model="formzhuce.RMM" placeholder="与密码相同"></el-input>
                        </el-form-item>
                        <el-form-item label="" class="regist__anniu">
                            <el-button type="primary" :disabled="zhucedisabled" @click="zhuCe('formzhuce')">立即注册</el-button>
                            <el-button @click="resetzhuce('formzhuce')">重&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <!-- 左侧表单end-->
        <!-- 右侧begin-->
        <div class="regist__r fr">
            <h2 class="regist__r__tip">温馨提示</h2>
            <ul>
           	    <li class="regist__r__li1">
                    <span></span>
               		如果您已注册倚天互联网+政务服务通行证，请直接<a href="/user/login/index.html">登录</a>
                </li>
                <li class="regist__r__li2">
                    <span></span>
               		倚天互联网+政务服务实名注册具有"5-3-1"的特征：5分钟即可完成注册与认证；提供初级、中级、高级3种认证安全级别，保护您的个人信息安全；不同级别可使用网站不同功能；1次登录，全网通行，方便快捷。
                </li>
                <li class="regist__r__li3">
                    <span></span>
                   市民注册成为网站会员并登陆后，初级认证可任意浏览网站信息；经过中级认证后，可以发布供求、物业报修、网友评论等相关信息；经过高级认证后，可以在"一站式城市综合服务平台"上在线申报办理政府大厅各单位审批事项，可以提交市民建议等，享受该网站为市民提供的衣、食、住、行等系列一站式综合服务。
                </li>
            </ul>
        </div>
        <!-- 右侧end-->
    </div>
    </div>
    <idt-footer></idt-footer>
    <el-dialog title="填写验证码" :visible.sync="dialogYzm" size="tiny" class="waitDealWrap__dialog">
        <el-form :model="YZM" ref="formzhuce" label-width="55px" >
            <el-form-item label="验证码" prop="checkCode" style="width: 356px;margin: 0 auto;">
                <el-input v-model="YZM.checkCode" class="regist__input"></el-input>
                <div class="regist__yzm" @click="resetCode"><img :src="'data:image/png;base64,'+yzmbase64"/></div>                            
            </el-form-item> 
        </el-form> 
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="checkCode()">确 定</el-button>
        </div>
    </el-dialog>
    <idt-dialogmsg v-if="dialogVisible" @quickLogin="showLogin"></idt-dialogmsg>
</div>
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header.vue';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtfooter from '@/InternetPlus/common/footer/footer.vue';
import dialogmsg from '@/InternetPlus/common/dialogmsg/dialogmsg';

import { register,getCode,webSendCode,webCheckCode } from '@/api/common.js';
import checkYHMUnique from '@/services/InternetPlus/user/checkYHMUnique.js';
import { checkMobile } from '@/lib/verify.js'
export default{
    components:{
        'idt-header':idtheader,
        'idt-navbar':idtnavbar,
        'idt-footer':idtfooter,
        'idt-dialogmsg': dialogmsg,
    },
    data(){
        var validateYHM1 = (rule, value, callback) => {
            this.checkYHMUnique().then(() => {
                if((this.tempcount+"") === "0"){
                   this.yzmMsgBtn = "点击获取验证码"
                    return callback();
                }else{
                    return callback(new Error('用户名已存在，请重新输入！'));
                }
            });
        };
        var validateMM = (rule, value, callback) => {
            let yhm = /^([a-zA-Z0-9]|[_]){6,16}$/;
            if(yhm.test(this.formzhuce.MM)){
                return callback();                
            }else{
                return callback(new Error('密码中不能出现除了数字、字母、下划线以外的字符'));
            }
        };
        var validateRMM = (rule, value, callback) => {
            if(this.formzhuce.RMM === this.formzhuce.MM){
                return callback();            
            }else{
                return callback(new Error('确认两次密码相同'));
            }
        };
        var validateYZM = (rule, value, callback) => {
            return callback();
        };
        return {
            zhucedisabled: false,
            formzhuce:{
                NC: '',
                YHM: '',
                DXYZM:'',
                MM: '',
                RMM: '',                
                YHLX: '市民',
                checkCode: '',
            },
            YZM :{
               checkCode:'' 
            },
            jyyzm:'',
            yzmMsgBtn:'请先填写手机号',
            isNotsend:false,
            formzhucerules:{
                NC: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
                YHM: [
                    { required: true, fieldName:'手机号', validator: checkMobile, trigger: 'blur' },
                    { validator: validateYHM1, trigger: 'blur' }
                ],
                MM: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' },
                    { validator: validateMM, trigger: 'blur' }
                ],
                RMM: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' },
                    { validator: validateRMM, trigger: 'blur' }                                                            
                ],
                checkCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            tempcount: "0",
            level: 0,
            yzmbase64:'',
            dialogVisible: false,
            dialogYzm:false,
            key:'',
            time:60
        }
    },
    created(){
        this.checkYZM();
        localStorage.removeItem('idt_App_token');
        localStorage.removeItem('idt_App_personInfo');
        localStorage.removeItem('idt_App_key');
    },
    methods: {
        checkMMstrength(){
            // 匹配是否存在数字
            let reg0 = /\d+/;
            // 匹配是否存在大写字母
            let reg1 = /[A-Z]+/;
            // 匹配是否存在小写字母            
            let reg2 = /[a-z]+/;
            let i = 0;
            if(reg0.test(this.formzhuce.MM)){
                i++;
            }else{

            }
            if(reg1.test(this.formzhuce.MM)){
                i++;
            }else{

            }
            if(reg2.test(this.formzhuce.MM)){
                i++;
            }else{
                
            }
            if(this.formzhuce.MM.indexOf('_') > -1){
                i++;
            }else{

            }
            this.level = i;
        },
        // 检测用户名唯一性
        checkYHMUnique(){
            var self = this;
            let params = { YHM: this.formzhuce.YHM,YHLX: this.formzhuce.YHLX };
            return checkYHMUnique(params).then(res => {
                if(res.status==="success"){
                    self.tempcount = 0;
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            }).catch(data =>{
                this.$message.error('网络连接异常，请检查网络！')
            }); 
        },
        //注册
        zhuCe(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.formzhuce;
                    let res = { 
                        'yhmc': params.YHM, 
                        'tel': params.YHM,
                        'mm': params.MM, 
                        'manageType': params.YHLX, 
                        'nc': params.NC, 
                        checkCode: params.checkCode 
                    };

                    register(res).then(res => {
                        if(res.status === "success"){
                            let personinfo = {
                                username: res.data.userealname,
                                zw: res.data.zw
                            }
                            var index = res.data.fristPageList[0].INDEX_TEMPLATE;
                            localStorage.setItem('idt_App_token', res.data.token);
                            localStorage.setItem('idt_App_personInfo', JSON.stringify(personinfo));
                            this.dialogVisible = true;
                        }else{
                            this.$message.error(res.message);
                        }
                    }).catch(data =>{
                        this.$message.error('网络连接异常，请检查网络！')
                    });
                } else {
                    return false;
                }
            });
        },
        //重置表单
        resetzhuce(formName) {
            this.$refs[formName].resetFields();
        },
        //发送验证码
        sendCode(){
            let params={};
            params.tel=this.formzhuce.TEL;
            webSendCode(params).then(res => {
                localStorage.setItem("idt_App_key",res.data.key);
                this.dialogYzm = true;
            });
        },
        showLogin() {
            let zw = JSON.parse(localStorage.idt_App_personInfo).zw;
            
            if(zw==='市民'){
                window.location.href="/user/smrz/index.html"
            }else{
                window.location.href="/user/smrzfr/index.html"
            }
        },
        //获取验证码
        checkYZM(){
            getCode().then(res=>{
                if(res.status==="success"){
                    this.yzmbase64 = res.data.image;
                    localStorage.setItem("idt_App_key",res.data.key);
                }else{
                    this.$message.error('服务器异常，请联系管理员！');
                }
            })
        },
        //重置验证码
        resetCode(){
            this.checkYZM();
        },
        //获取手机号码
        showYzmdialog(){
            if(this.yzmMsgBtn !== "点击获取验证码"){
                return false;
            }
            this.dialogYzm = true;
        },
        checkCode(){
            let params = {}
            params.checkCode = this.YZM.checkCode;
            params.codeKey = localStorage.idt_App_key;
            webCheckCode(params).then(res => {
                if(res.status==="success"){
                    this.dialogYzm = false;
                    this.send();
                }else{
                    this.$message.error('验证码错误，请重新输入');
                    this.checkYZM();
                }
            }).catch(data =>{
                this.$message.error('网络连接异常，请检查网络！')
            }); 
        },
        send() {
            let _self = this;
            this.isNotsend = true;
            let interval = window.setInterval(function() {
             if ((_self.time--) <= 0) {
              _self.time = 60;
              _self.isNotsend = false;
              window.clearInterval(interval);
              _self.yzmMsgBtn = "点击获取验证码"
             }else{
                _self.yzmMsgBtn = _self.time+"后可点击重新发送"
             }
            }, 1000);
        }
    }
}
</script>

<style scoped>
/* regist.vue*/
.regist{width: 1250px;margin: 0 auto;}
.regist__crumbs{padding-left:50px;height:48px; border-bottom:4px solid #3d96e6; background:url(./img/icon.png) 0 12px no-repeat;}
.regist__crumbs span{display:block;color:#3f96e6; font-size:20px;line-height:58px;}
.regist__con{ width:100%; margin:24px 0 50px;}

/*左侧表单*/
.regist__l{ width:695px; height:479px; border:1px solid #ddd; padding:32px;}
.regist__formzhuce{width: 400px;margin: 0 auto;}
.regist__input__dj,
.regist__input__djtext{ font-size:0; display:block; margin-top:15px; width:174px; height:12px; border:1px solid #bab5b9; border-radius:8px}
.regist__input__djtext{ border:none; margin-top:0px;}
.regist__input__dj i,
.regist__input__djtext i{ width:31%; display:inline-block; height:8px; margin:2px;}
.regist__input__djtext i{ font-size:12px; color:#6f6f6f; text-align:center;}
.regist__input__dj__l{ background:#ed3500; border-radius:8px 0 0 8px}
.regist__input__dj__m{ background:#f38313;}
.regist__input__dj__h{ background:#6d9e06; border-radius:0 8px 8px 0}
.regist__mmqiangdu{height: 40px;margin-left: 110px;}

/*右侧*/
.regist__r{ width:428px; height:473px; padding:30px 20px; border:6px solid #ddd; background:url(./img/bg.jpg) no-repeat;}
.regist__r__tip{ color:#ff6600; font-size:18px; margin-bottom:42px;}
.regist__r li{position:relative;margin-top:17px; height:auto; border-bottom:1px dashed #d0d0d0; padding-left:45px; line-height:24px; min-height:36px; padding-bottom:20px; }
.regist__r span{position: absolute;left: 0;top:0;display:block;width:40px;height:40px;background:url(./img/icon.png) 0 -416px no-repeat;}
.regist__r a{ text-decoration:underline; color:#ff6600;}
.regist__r__li2 span{ background-position:0 -504px;}
.regist__r__li3 span{ background-position:0 -662px; border:none;}
.regist__yzm{width: 60px;height: 34px;border: 1px solid #ccc;display: inline-block;margin-left: 5px;position: absolute;right:0;top:0;}
.regist__yzm img{vertical-align: initial;width: 100%;height: 100%;}
.regist__input{width: 230px;}

.waitDealWrap__pj{padding-top:6px;}
.waitDealWrap__pj .el-rate__text{vertical-align: bottom;}
.waitDealWrap__dialog .el-dialog__body {padding-bottom: 20px;}
.waitDealWrap__dialog h3{font-size: 16px;line-height: 32px;text-align: center;padding-bottom: 10px;}
.waitDealWrap__dialog dl{margin: 0 auto;}
.waitDealWrap__dialog dt{width: 200px;line-height: 32px;font-weight: bold;float: left;clear: left;}
.waitDealWrap__dialog dd{display:block;margin: 10px auto;}
.wdclimg{display: block;width: 100%;}
</style>
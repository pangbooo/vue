/* 
    描述：个人中心-个人信息组件
    作者：李文达
    创建时间：2017年9月21日
    最后修改人：李文达
    最后修改时间：2017年9月21日
*/
<template>
  <div class="personInfo">
    <div class="personInfo__info--box">
      <div class="personInfo__info--title">
        <span>账号信息</span>
        <a href="javascript:;" @click="logOut" title="退出"><img src="./img/zx.png" class="img2"></a>
        <a href="javascript:;" @click="dialogFormVisible = true" title="修改密码"><i class="modifypassword el-icon-setting"></i></a>
      </div>
      <div class="personInfo__tx">
        <img src="./img/null.jpg">
      </div>
      <div class="personInfo__info-xm">
        <p>您好！{{user.DISPLAYNAME}}</p>
        <span v-if="false">积分&nbsp;:&nbsp;100</span>
      </div>
      <div class="personInfo__detail">
        <p>账号名称&nbsp;:&nbsp;{{user.DISPLAYNAME}}</p>
        <p>手机号码&nbsp;:&nbsp;{{user.YDDH}}</p>
        <p>实名认证&nbsp;:&nbsp;已认证<a :href="zw=='市民'?'/user/smrz/index.html':'/user/smrzfr/index.html'" title="我要认证"><img src="./img/jl.png"></a></p>
        <p class="personInfo__email" :title="user.EMAIL">邮箱地址&nbsp;:&nbsp;{{user.EMAIL?user.EMAIL:'已绑定邮箱'}}<a href=""><img src="./img/jl.png"></a></p>
        <p>安全级别&nbsp;&nbsp;:低<a href=""><img src="./img/jl.png" title="我要升级"></a></p>
        <div class="personInfo__prosess">
            <span class="personInfo__r"></span>
        </div>
      </div>
    </div>
    <div class="left-navbox">
      <div class="left-nav">
        <a href="/user/personcenter/index.html">我的首页</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="/zxts/myzxlb/index.html">我的咨询</a>
      </div>
      <div class="left-nav">
          <a href="/zxts/mytslb/index.html">我的投诉</a>&nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="javascript:;">我的纠错</a>
      </div>
      <div class="left-nav">
          <a href="javascript:;">我的材料</a>&nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="/zxts/myjylb/index.html">我的建议</a>
      </div>
      <div class="left-nav">
          <a href="/wsbs/mpjlb/index.html" >我的评价</a>&nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="/qlqd/wdsclb/index.html" >我的收藏</a>
      </div>
      <div class="left-nav">
          <a href="/wsbs/mybjgslb/index.html">我的办件</a>&nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="/qtfw/wdkd/index.html">我的快递</a>
      </div>
    </div>
    <el-dialog :custom-class="'modifyPasword__dialog'"  title="修改密码" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form :model="form" ref="changePsdForm" :rules="rules" >
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPsw">
          <el-input type="password" v-model="form.oldPsw" auto-complete="off" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPsw">
          <el-input type="password" v-model="form.newPsw" auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rePsw">
          <el-input type="password" v-model="form.rePsw" auto-complete="off" placeholder="请重复输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendChange('changePsdForm')">确 定</el-button>
        <el-button @click="cancleChange('changePsdForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import { modifyPwd,logOut,getUserAndCompanyManagerInfo } from '@/api/manage.js';
    import { queryString } from '@/lib/publicFun.js';
    import { LMIDS } from '@/api/lmManage.js';
    export default {
        data() {
            var validateMM = (rule, value, callback) => {
                let yhm = /^([a-zA-Z0-9]|[_]){6,16}$/;
                if(yhm.test(this.form.newPsw)){
                    return callback();                
                }else{
                    return callback(new Error('密码中不能出现除了数字、字母、下划线以外的字符'));
                }
            };
            var validateRMM = (rule, value, callback) => {
                if(this.form.rePsw === this.form.newPsw){
                    return callback();            
                }else{
                    return callback(new Error('确认两次密码相同'));
                }
            };
            return {
                user: {}, // 用户信息
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                  oldPsw: '',
                  newPsw: '',
                  rePsw: '',
                },
                formLabelWidth: '80px',
                rules: {
                  oldPsw: [
                      { required: true, message: '请输入原密码', trigger: 'blur' },
                  ],
                  newPsw: [
                      { required: true, message: '请输入密码', trigger: 'blur' },
                      { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' },
                      { validator: validateMM, trigger: 'blur' }
                  ],
                  rePsw: [
                      { required: true, message: '请再次输入密码', trigger: 'blur' },
                      { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' },
                      { validator: validateRMM, trigger: 'blur' }       
                  ]
                },
                zw:'市民'
            }
        },
        created() {
            getUserAndCompanyManagerInfo().then(res => {
                this.user = res.data;
            });
            
            this.zw = JSON.parse(localStorage.idt_App_personInfo).zw;
        },
        methods:{
            cancleChange(formName){
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
            },
            logOut(){
                let params = {
                  userName : this.user.XMPY
                }
                logOut(params).then(res => {
                    if (res.status === "success") {
                        localStorage.clear();
                        window.location.href= '/index.html';
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(data =>{
                    this.$message.error('logOut异常，请检查网络！')
                });
            },
            sendChange(formName){
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    let params = {
                      oldPwd : this.form.oldPsw,
                      newPwd : this.form.newPsw,
                      repeatPwd : this.form.rePsw
                    }
                    modifyPwd(params).then(res => {
                        if (res.status === "success") {
                            this.dialogFormVisible = false;
                            this.$message.success('密码修改成功! 请使用新密码重新登录');
                            setTimeout(() => {
                                this.logOut()
                            }, 2000);
                        } else {
                            this.$message.error(res.message);
                            this.$refs[formName].resetFields();
                        }
                    }).catch(data =>{
                        this.$message.error('modifyPwd异常，请检查网络！')
                    });
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
            }
        }
    }
</script>

<style scoped> 
/*personcenter.vue*/
.personInfo{
    width: 235px;
    float: left;
}
.personInfo__info--box{
    background-color: #fdfdfd;
    border: 1px solid #D4d4d4;
}
.personInfo__info--title{
    height: 18px;
    line-height: 18px;
    padding: 19px 10px;
    overflow: hidden;
    background-color: #8695a5;
}
.personInfo__info--title span{
    font-size: 16px;
    color:#fff;
    font-weight: bold;
    float: left;
}
.personInfo__info--title a{
    float: right;
}
.personInfo__info--title img{
    vertical-align: baseline;
    margin-left: 8px;
}
.personInfo__info--borderline{
    width: 100%;
    height: 3px;
    background: url(./img/85.png) center no-repeat;
}   
.personInfo__tx {
    width: 105px;
    height: 105px;
    margin: 15px auto;
    overflow: hidden;
}
.personInfo__tx img{
    display: block;
    width: 100%;
}
.personInfo__info-xm{
    width: 90%;
    margin:0 auto;
    border-bottom: 1px solid #BABBBE;
    text-align: center;
    padding-bottom: 10px;
}
.personInfo__info-xm p{
    font-size: 16px;
    color:#48576a;
    padding-bottom: 8px;
}
.personInfo__info-xm span{
    color: #1a80dc;
}
.personInfo__detail{
    width: 84%;
    margin:0 auto;
    padding:8px 0;
}
.personInfo__detail p{
    line-height: 16px;
    padding: 5px 0;
    color: #48576a;
}
.personInfo__detail a{
    margin-left: 10px;
}
.personInfo__prosess{
    width: 100%;
    height: 5px;
    margin:8px auto;
    border-radius:2px;
    overflow: hidden; 
    background-color: #ccc;
}
.personInfo__prosess span{display: block;width: 33%;height: 5px;border-radius:2px;}
.personInfo__r{
    background: red;
}
.personInfo__y{
    background: yellow;
}
.personInfo__g{
    background: green;
}
.modifypassword {
    font-size: 17px;
    color: #fff;
}
.dialog-footer {
    text-align: center;
}
.left-navbox{
    background-color: #fdfdfd;
    border: 1px solid #D4d4d4;
    border-top:none;
    padding: 10px 0;
}
.left-nav{
    background: rgba(29, 56, 86, 0.53);
    width: 190px;
    height: 30px;
    margin: 10px auto;
    font-size: 16px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    transform: skew(10deg);
}
.left-nav a {
    display: inline-block;
    transform: skew(-10deg);
}
.left-nav a:hover{ 
    color: #1f2d3d;
}

.pcnenter__center .el-dialog__body{
  padding:30px 95px; 
}
.personInfo__email {
    width:211px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
<style>
.personInfo .modifyPasword__dialog {
    width: 390px;
    border-radius: 5px;
}

</style>

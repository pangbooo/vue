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
      <div class="personInfo__tx">
        <img src="./img/null.jpg">
      </div>
      <div class="personInfo__info-xm">
        <p>您好！张三</p>
        <span>积分&nbsp;:&nbsp;{{user.scores}}</span>
      </div>
    </div>
    <el-menu default-active="2" class="el-menu-custom" :unique-opened="true" :default-active="'1'"  @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>个人业务</template>
          <el-menu-item index="1-1">我的办件</el-menu-item>
          <el-menu-item index="1-2">我的咨询</el-menu-item>
          <el-menu-item index="1-3">我的投诉</el-menu-item>
          <el-menu-item index="1-4">我的建议</el-menu-item>
          <el-menu-item index="1-5">我的证照</el-menu-item>
          <el-menu-item index="1-6">我的收藏</el-menu-item>
          <el-menu-item index="1-7">我的纠错</el-menu-item>
          <el-menu-item index="1-8">我的快递</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>账户信息</template>
          <el-menu-item index="2-1">基本信息</el-menu-item>
          <el-menu-item index="2-2">账户安全</el-menu-item>
          <el-menu-item index="2-3">密码管理</el-menu-item>
          <el-menu-item index="2-4">身份认证</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
    import { queryString } from '@/lib/publicFun.js';
    import { LMIDS } from '@/api/lmManage.js';
    export default {
        data() {
            return {
                user: {}, // 用户信息
            }
        },
        created() {
            // this.user = JSON.parse(localStorage.personinfo);
        },
        methods: {
            handleOpen() {

            },
            handleClose() {

            }
        }
    }
</script>

<style scoped> 
/*personcenter.vue*/
.personInfo{
    width: 235px;
    /* float: left; */
}
.personInfo__info--box{
    background-color: #fbfbfb;
    border: 1px solid #ddd;
}
.personInfo__info--title{
    height: 18px;
    line-height: 18px;
    padding: 19px 10px;
    overflow: hidden;
}
.personInfo__info--title span{
    font-size: 16px;
    color:#0073da;
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
    background: url(./img/null.jpg) center no-repeat;
}   
.personInfo__tx{
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
    color:#393a3b;
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
    color: #393a3b;
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
.left-navbox{
    background-color: #f9f9f9;
    border: 1px solid #D4d4d4;
    border-top:none;
    padding: 10px 0;
}
.left-nav{
    background: url(./img/ss.png) 20px center no-repeat;
    width: 100%;
    height: 30px;
    margin: 10px 0;
    font-size: 16px;
    color: #444547;
    line-height: 30px;
    text-align: center;
}
.left-nav a:hover{
    color: #0073da;
}
</style>
<style>
.personInfo .el-menu-custom {
    background-color: #fbfbfb;
}
</style>

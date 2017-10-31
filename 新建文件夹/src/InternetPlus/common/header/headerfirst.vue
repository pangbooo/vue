/**
 * 通用header
 * 注：header无背景，需要在父组件中设置
 * author:kxc
 * 2017-08-07
 */
<template>
  <div class="zwfw-header clr">
    <div class="zwfw-header__wrap clearfix">
      <div class="zwfw-header__wrap__logo"></div>
      <div class="zwfw-header__wrap__plat">
        <ul class="zwfw-header__plat__title">
          <li class="zwfw-header__plat__title--top">互联网</li>
          <li class="zwfw-header__plat__title--bottom">综合政务服务</li>
        </ul>
      </div>
      <div class="zwfw-header__wrap__nav">
        <ul class="clr">
          <li class="zwfw-nav__login" v-show="dengluflag">
            <a href="/user/login/index.html">登录</a>
          </li>
          <li class="zwfw-nav__rigist" v-show="dengluflag">
            <a href="/user/regist/index.html">注册</a>
          </li>
          <li :class="['zwfw-nav__center', personVisiable ? 'active' : '']" v-show="dengluflag==false" @mouseover="personVisiable=true" @mouseleave="personVisiable=false">
            <a href="/user/personcenter/index.html" class="username"><span class="showname nbr" :title="user.DISPLAYNAME">{{user.DISPLAYNAME}}</span><span class="nbr">，您好！<i class="el-icon-arrow-down"></i></span></a>
            <div class="personinfo" v-if="personVisiable">
              <div class="personInfo__tx">
                <a href="/user/personcenter/index.html"><img src="./img/null.jpg"></a>
              </div>
              <div class="personInfo__btn">
                <a href="javascript:void(0);">账号管理</a>
                <i>|</i>
                <a href="javascript:void(0);" @click="logOut">退出</a>
              </div>
              <div class="personInfo__points" v-if="false">
                <span>积分&nbsp;:&nbsp;100</span>
              </div>
              <div class="personcenter">
                <a href="/user/personcenter/index.html">查看您的个人业务</a>
              </div>
            </div>
          </li>
          <li :class="['zwfw-nav__phone', qrcodeVisiable ? 'active' : '']"  @mouseover="qrcodeVisiable=true" @mouseleave="qrcodeVisiable=false">
            <a href="javascript:void(0);" class="app">手机APP <i class="el-icon-arrow-down"></i></a>
            <div class="qrcode" v-if="qrcodeVisiable">
              <div class="qrcode-img">
                <img src="./img/qrcode.png">
              </div>
              <div class="qrcode-panel">
                <h1>扫码下载<span class="red">手机APP</span></h1>
              </div>
            </div>
          </li>
          <li class="zwfw-nav__help">
            <a href="#">帮助中心</a>
          </li>
        </ul>
        <weather></weather>
      </div>
    </div>
  </div>
</template>

<script>
import weather from '@/components/weather/weather.vue';
import { modifyPwd, logOut, getUserAndCompanyManagerInfo } from '@/api/manage.js';
export default {
  data() {
    return {
      dengluflag: true,
      user: {},
      personVisiable: false,
      qrcodeVisiable: false
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      if (localStorage.getItem('idt_App_token')) {
        this.dengluflag = false;
        getUserAndCompanyManagerInfo().then(res => {
          this.user = res.data;
        });
      }
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
    }
  },
  components: {
    weather
  }
}
</script>

<style scoped>
/**
 * 通用header
 * css belong to header.vue
 * author:kxc
 * 2017-08-07
 */

.zwfw-header {
  width: 100%;
  height: 150px;
  margin: 0px auto;
}

.zwfw-header__wrap {
  width: 100%;
  height: 150px;
}

.clearfix:after {
  content: "";
  display: block;
  height: 0;
  font-size: 0;
  visibility: hidden;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.zwfw-header__wrap__logo {
  background: url("./img/idt-logo.png") no-repeat;
  width: 297px;
  height: 87px;
  margin: 40px 0px;
  float: left;
}

.zwfw-header__wrap__plat {
  width: 168px;
  height: 59px;
  float: left;
  margin: 52px 22px;
  border-left: 1px solid #000;
  padding: 0px 22px;
}

.zwfw-header__wrap__nav {
  width: 456px;
  height: 150px;
  float: right;
}

.zwfw-header__wrap__nav ul {
  margin: 25px 10px;
  float: right;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  box-shadow: 1px 2px 3px 2px rgba(151, 168, 190, 0.42), 0 0 0 0 #eee;
}

.zwfw-header__wrap__nav ul li {
  float: left;
}

.zwfw-header__wrap__nav ul li a {
  color: #242120;
  font-size: 15px;
}

.zwfw-header__wrap__nav ul li a:hover {
  color: #fa791e;
}

.zwfw-nav__login,
.zwfw-nav__rigist {
  width: 48px;
  padding: 0 10px;
  margin-left: 10px;
  height: 30px;
  border-right: 1px solid rgba(151, 168, 190, 0.42);
  background: url("./img/login.png") no-repeat 0px 7px;
  text-indent: 16px;
}

.zwfw-nav__rigist {
  width: 48px;
  padding: 0 10px;
  height: 30px;
  border-right: 1px solid rgba(151, 168, 190, 0.42);
  background: url("./img/regist.png") no-repeat 0px 7px;
}

.zwfw-nav__center {
  width: auto;
  padding: 0 10px;
  height: 30px;
  border-right: 1px solid rgba(151, 168, 190, 0.42);
  position: relative;
  border-top-left-radius: 5px;
}
.zwfw-nav__center.active {
  background-color: #fff;
}
.zwfw-nav__center.active .username {
  color: #fa791e;
}
.zwfw-nav__phone.active {
  background-color: #fff;
}
.zwfw-nav__phone.active .app {
  color: #fa791e;
}
.zwfw-nav__help {
  width: auto;
  padding: 0 10px;
  height: 30px;
  background: url("./img/icon_help.png") no-repeat 5px 6px;
  text-indent: 16px;
}

.zwfw-nav__phone {
  width: auto;
  padding: 0 10px;
  height: 30px;
  border-right: 1px solid rgba(151, 168, 190, 0.42);
  position: relative;
}

.zwfw-header__plat__title {
  width: 164px;
  height: 60px;
  border: 1px solid #ee6e14;
}

.zwfw-header__plat__title--top {
  text-align: center;
  color: #ef6f15;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.zwfw-header__plat__title--bottom {
  text-align: center;
  background-color: #ef6f15;
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
.username span {
  display: inline-block;
}
.username .showname {
  max-width: 100px;
}
.personinfo {
    width: 200px;
    position: absolute;
    top: 30px;
    left: 0;
    /* border: 1px solid #ccc; */
    background-color: #fff;
    zoom: 1;
    z-index: 1;
    border-radius: 5px;
    border-top-left-radius: 0;
    box-shadow: 1px 3px 1px 2px rgba(151, 168, 190, 0.42), 0 0 0 0 #eee;
    z-index: 9999;
}
.personInfo__tx {
    float: left;
    border-radius: 50%;
    overflow: hidden;
    width: 80px;
    height: 80px;
    margin: 5px;
}
.personInfo__tx img {
    width: 80px;
    height: 80px;
    background-size: 100%;
}
.personcenter {
    float: left;
    width: 160px;
    height: 24px;
    line-height: 24px;
    margin-left: 20px;
    margin-bottom: 10px;
    text-align: center;
    background-color: #ef6f15;
    border-radius: 3px;
}
.personInfo__btn {
    margin-top: 5px;
}
.personinfo .personInfo__btn a {
    font-size: 13px;
}
.personInfo__points {
  text-align: center;
  font-size: 13px;
}
.personinfo .personcenter a {
    color: #fff;
    font-size: 13px;
}
.personinfo .personcenter a:hover {
    color: #eef1f6;
}
.qrcode {
    width: 160px;
    position: absolute;
    top: 30px;
    left: 0;
    /* border: 1px solid #ccc; */
    background-color: #fff;
    zoom: 1;
    z-index: 1;
    border-radius: 5px;
    border-top-left-radius: 0;
    box-shadow: 1px 3px 1px 2px rgba(151, 168, 190, 0.42), 0 0 0 0 #eee;
    z-index: 9999;
}
.qrcode-img {
  width: 140px;
  height: 140px;
  margin: 10px auto 0;
}
.qrcode-img img {
  width: 100%;
  height: 100%;
  background-size: 100%;
}
.qrcode-panel {
  text-align: center;
}
.qrcode-panel .red {
  color: #ff4949;
}
</style>
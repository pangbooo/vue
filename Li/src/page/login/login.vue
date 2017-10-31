<template>
  <div class="null-warp">
    <div id="header" class="header">
      <div class="h-center">
        <div class="center clr" style="padding-top:40px;">
              <el-button type="primary"><router-link to='/login/children'>点我跳传登录视图子路由</router-link></el-button>
              <el-button type="success"><router-link to='/login/children2'>点我跳传登录视图子路由2</router-link></el-button>
              <el-button type="primary"><router-link to='/'>点我回首页</router-link></el-button>
         </div>
      </div>
    </div>
      <!-- top-header-end -->
    <!--register-->
    <div class="register center">
      <div class="re-banner" id="re-banner">
        <img src="./img/3.jpg" alt="banner" />
      </div>
      <div class="re-info">
        <h3 class="reinfo-title">用户登录 <a class="go-login" href="register.html">注册</a></h3>
        <form action="" id="login-form" class="form1">
          <div class="field">
            <label for="cellphone"> <i class="iconfont" title="手机号"></i></label>
            <input type="text" name="cellphone" id="cellphone" class="re-input" value="" maxlength="11" tabindex="1" placeholder="手机号">
          </div>
          <div class="field">
            <label id="password-label" for="password"><i class="iconfont2 iconfont" title="这支密码"></i></label> 
            <input type="password" aria-labelledby="password-label" name="password" id="password" class="re-input" maxlength="28" tabindex="2" autocomplete="off" placeholder="设置密码">
          </div>
          <div class="field yanzheng-field">
            <input type="text" aria-labelledby="yanzhengma-label" name="yanzhengma" id="yanzheng" class="re-input re-yanzheng" maxlength="28" tabindex="3" autocomplete="off" placeholder="验证码">
            <div class="yanimg"><img src="./img/4.jpg" alt="yanzhengma" /></div>
            <b class="re-change">换一张</b>
          </div>
          <input type="submit" name="re-btn" id="lo-btn" class="form1-btn" value="立即登录" />
          <div class="field yanzheng-field">
            <span class="lo-nagreeicon" id="lo-nagreeicon" data-status="1"></span>
            <span class="lo-text" >记住我</span>
            <span class="lo-nagreeicon" id="lo-nagreeicon2" data-status="1"></span>
            <span class="lo-text">记住密码</span>
            <a href="" class="lo-text fgtpsw bold">忘记密码</a>
          </div>
        </form>
        <div class="other-login">
          <h5>无需注册，即可立即登录</h5>
          <a href="" class="ologin qqlogin">QQ登录</a>
          <a href="" class="ologin wxlogin">微信登录</a>
          <a href="" class="ologin wblogin">微博登录</a>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'sads'
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{ width: 100%; }
.h-center{ width: 100%; height: 120px; }
.logo{ width: 265px; height: 69px; overflow: hidden; float: left; padding-top: 25px; padding-right: 150px; }
.center{ width: 1200px; margin: 0 auto; }
img{ width:100%; vertical-align: bottom; }
/*register*/
.register{ overflow: hidden; }
.re-banner{ width: 622px; height: 500px; float: left; }
.re-banner img{ vertical-align: middle; }
.re-info{ width: 442px; border: 1px solid #dddede; float: left; margin-left: 80px; }
.reinfo-title{ width: 94%; height: 60px; border-bottom: 1px solid #dddede; font-size: 28px; color: #595757; line-height: 60px; font-weight: bold; padding-left: 6%; position: relative; }
.go-login{ font-size: 14px; font-weight: normal; position: absolute; right: 6%; top: 0; }
.form1{ width: 88%; overflow: hidden; margin: 27px auto 0; border-bottom: 1px solid #dddede; }
.field { width:99%; height: 32px; border:1px solid #dddede; margin-bottom: 15px; position: relative; }
.field-dxyz{ width:189px; }
.yanzheng-field{ border: none; }
.form1 label { display: block; width: 32px; height: 32px; line-height: 32px; color: #fff; text-align: center; position: absolute; left: 1px; top: 1px; outline: 0; }
.iconfont{ width: 32px; height: 32px; display: block; background: url(./img/sprite4.png) no-repeat; }
.iconfont2{ background-position: 0 -32px; }
.re-input{ position: absolute; left: 32px; top:1px; padding: 0; margin: 0; border: none; width: 352px; line-height: 30px; height: 30px; font-size: 14px; font-family: "微软雅黑"; }
.re-yanzheng{ display: inline-block; border: 1px solid #dddede; padding-left:8px; width: 148px; height: 30px; left:0}
.re-yanzheng2{ left:32px; border:none; }
.yanimg{ display: inline-block; border: 1px solid #dddede; width: 79px; height: 32px; position:absolute; left: 165px; top: 1px; }
.re-change{ display: inline-block; width: 79px; height: 32px; line-height:32px; position:absolute; left: 258px; top: 1px; }
.form1-btn{ font-family: "微软雅黑"; display:block; width: 220px; height: 34px; line-height: 32px; border: 1px solid #dddede; background-color: #231815; color: #fff; text-align: center; margin-bottom: 15px; }
.yuedu{ padding-left: 32px; line-height: 32px; height: 34px; }
.re-agreeicon,.re-nagreeicon{ position: absolute; left:0; top:0; width: 32px; height: 32px; background: url(./img/sprite.jpg); }
.re-nagreeicon{ background-position: 0 -32px; }
.other-login{ margin: 15px auto; width: 88%; overflow: hidden; }
.other-login h5{ padding-left: 8px; line-height: 32px; height: 32px; }
.ologin{ float:left; display: block; width: 88px; height: 32px; border: 1px solid #dddede; margin: 9px; overflow: hidden; line-height: 32px; padding-left: 20px; text-align: center; background: url(./img/sprite5.png) no-repeat; background-position: 0 -5px; }
.ologin:hover{ border: 1px solid #281d1b; }
.qqlogin{ background-position: -38px -42px; }
.wblogin{ background-position: -76px -85px; }
.yanimg2{ width: 100px; height: 30px; line-height: 30px; text-align: center; position: absolute; top:0; right:-120px; background-color: #888785; color: #fff; border: 1px solid #dddede; cursor: pointer; }

/*login*/
.lo-areeicon,.lo-nagreeicon{ float:left; width: 32px; height: 32px; background: url(./img/sprite.jpg) no-repeat; }
.lo-nagreeicon{ background-position: 0 -32px; }
.lo-text{ float:left; display:block; line-height: 32px; }
.fgtpsw{ float: right; }
</style>

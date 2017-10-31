<template>
<div>
  <div class="webHeader">
    <div class="webHeader_co">
      <div class="webHeader_le">
        <router-link to="/main">
            <img src="../../assets/logo_1.png" class="img">
        </router-link>
      </div>
		  <div class=" right webHeader_ri">
			  <input class="search_text" type="text" placeholder="请输入受理部门/受理事项名称/申报人(单位)进行查询">
			  <input class="search_btn" value="搜 索" type="button">
		  </div>
    </div>
  </div>
  <div class="center">
    <div class="center-body">
      <div class="center-body-left">
        <div class="left-top">
          <div class="left-top-a">
            <span>账号信息</span>
            <img src="./img/sz.png" class="img1">
            <img src="./img/zx.png" class="img2">
          </div>
          <img class="img3" src="./img/85.png">
          <div class="left-top-tx">
            <img src="./img/87.png">
          </div>
          <div class="left-top-xm">
            <p><span class="text-a">您好！{{user.displayName}}</span></p>
            <span class="text-b">积分&nbsp;:&nbsp;{{user.scores}}</span>
          </div>
          <div class="line2"></div>
          <div class="left-top-xx">
            <span class="xx-text">账号名称&nbsp;:&nbsp;{{user.username}}</span>
            <p><span class="xx-text2">手机号码&nbsp;:&nbsp;{{user.phoneNumer}}</span></p>
            <p><span class="xx-text3">实名认证&nbsp;:&nbsp;未认证<img src="./img/jl.png"></span></p>
            <p><span class="xx-text4">邮箱地址&nbsp;:&nbsp;未绑定邮箱<img src="./img/jl.png"></span></p>
            <p><span class="xx-text5">安全级别&nbsp;&nbsp;:低<img src="./img/jl.png"></span></p>
            <img src="./img/77.png" class="xx-img1">
            <img src="./img/89.png" class="xx-img2">
          </div>
        </div>
        <div class="left-bottem">
          <div class="left-bottem-a">
            <span class="left-bottem-text">
            <a href="javascript:;">我的首页</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="javascript:;" class="fortab" @click="dblb='wdzx'"><span tit="wdzx">我的咨询</span></a>
            </span>
          </div>
          <div class="left-bottem-b">
            <span class="left-bottem-text">
              <a href="javascript:;" class="fortab" @click="dblb='wdts'"><span tit="wdts">我的投诉</span></a>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="javascript:;" class="fortab" @click="dblb='wdjc'"><span tit="wdjc">我的纠错</span></a>
            </span>
          </div>
          <div class="left-bottem-c">
            <span class="left-bottem-text">
              <a href="javascript:;" class="fortab" @click="dblb='wdzz'"><span tit="wdzz">我的证照</span></a>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="javascript:;" class="fortab" @click="dblb='wdjy'"><span tit="wdjy">我的建议</span></a>
            </span>
          </div>
          <div class="left-bottem-d">
            <span class="left-bottem-text">
              <a href="javascript:;" >我的足迹</a>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="javascript:;" >我的收藏</a>
            </span>
          </div>
          <div class="left-bottem-e">
            <span class="left-bottem-text">
              <a href="javascript:;" class="fortab" @click="dblb='wdbj'"><span tit="wdbj">我的办件</span></a>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="javascript:;">我的快递</a>
            </span>
          </div>
        </div>
      </div>
      <div class="center-body-right">
        <div class="right-top">
          <myCollections></myCollections>
        </div>
        <div class="right-center">
          <waitDealList :activedTab="dblb"></waitDealList>
        </div>
        <div class="right-bottem">
          <div class="right-bottem-left">
            <span class="right-bottem-text">推荐服务</span>
          </div>
          <div class="right-bottem-center">
            <div class="bottem-center-a">
              <a href="javascript:;">我的补助</a>
            </div>
            <div class="bottem-center-b">
              <a href="javascript:;">我的社保</a>
            </div>
            <div class="bottem-center-c">
              <a href="javascript:;">我的公积金</a>
            </div>
            <div class="bottem-center-d">
              <a href="javascript:;">房屋权属证明</a>
            </div>
            <div class="bottem-center-e">
              <a href="javascript:;">我的签名</a>
            </div>
          </div>
          <div class="right-bottem-right">
            <div class="bottem-right-left">
              <span class="bottem-right-text">我的消息</span>
            </div>
            <div class="bottem-right-right">
              <p><span class="bottem-right-span">已读:&nbsp;&nbsp;&nbsp;1条</span></p>
              <span class="bottem-right-span1">未读:&nbsp;&nbsp;&nbsp;2条</span>
            </div>
            <img src="./img/94.png" class="img-a">
            <img src="./img/95.png" class="img-b">
            <img src="./img/54.png" class="img-c">
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <footerlogin></footerlogin>
  </div>
</template>

<script>
  import footerlogin from '@/components/common/footerlogin';
  import waitDealList from '@/internetPlus/waitDealList';
  import myCollections from '@/internetPlus/myCollections';
  import getPersonCenterData from '@/services/getPersonCenterData.js';
  export default {
    data() {
      return {
        user: null, // 用户信息
        dblb: 'wdbj' // 代办类别
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.user = this.$store.getters.getUser;
        getPersonCenterData().then(data => {
          this.dataList = data;
        });
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      }
    },
    components: {
      waitDealList, myCollections, footerlogin
    }
  }
</script>

<style scoped> 
.blue{ color:#0073da; font-size:16px;}
.border{ border:1px solid #d3d3d3}
.right{ float:right;}
.head{ height:65px; min-height:65px;  float:left; position:absolute; z-index:9999}

.web{ width:100%; float:left;}
.webContent{ width:1000px; margin:0 auto;}
.webHeader{ width:100%; margin-bottom:20px;min-width:1000px; height:65px; border-bottom:1px solid #d2d2d2; border-top: 10px solid #0073da;}
.webHeader_co{margin:0 auto;}
.webHeader_le{float:left; position:relative; left:5%;}
.webHeader_ri{ height:32px; width:420px; position:absolute; top:25px; right:5%;border:1px solid #c9c9c9;border-radius: 5px;overflow:hidden;}
.search_text{float: left;display: block; width:310px; height: 28px; border: none;background: rgba(256, 256, 256, .6);   padding-left: 8px; line-height: 28px; color: #666;}
.search_btn{ width: 75px; height: 32px; background-color: #3c94eb; color: #fff; margin-left:20px;text-align: center; line-height: 28px;border: 0; float:right; cursor:pointer}
.banner_1{ height:70px; background:url(./img/banner_1.jpg) no-repeat center #0b98df; position:relative}
.homepage a:hover{
    color:#0033FF;
}
.position{
    line-height: 50px;    
    overflow: hidden;
    zoom: 1;
    position: relative;    
    font-size: 14px;
}
.header-icon {
    height: 18px;
    width: 18px;
    float: left;
    background:url(./img/home.png) no-repeat;
    margin:15px 5px 0px 175px;
}
.line{
    width:1000px;
    border-bottom: 1px solid #CCCCCC;
    margin:auto;
}
.center{
    width: 1003px;
    height: auto;
    margin: 0 auto; 
}
.center .center-header{
    margin-top: 35px;
}
.center .center-header img{
	margin-left: 10px;
}
.center .center-header span{
	position: relative;
	font-size: 16px;
	margin-left: 5px;
	bottom: 2px;
}
.line{
 	height:1px;
 	width:100%;
 	background:#e0e0e0;
 	overflow:hidden;
	 margin-top: 22px;
}
.center-body{
    width: 100%;
    height: 700px;
    margin-top: 23px;
    
}
.center-body .center-body-left{
    width: 235px;
    height: 700px;
    float: left;
}
.left-top{
    width: 100%;
    height: 440px;
    background-color: #e4e5ea;
    border: 1px solid #D4d4d4;
}
.left-top-a{
    position: relative;
    /*width: 100%;*/
    height: 37px;
    left: 22px;
    top: 14px;
}
.left-top span{
    font-size: 16px;
    color:#0073da;
    font-weight: bold;
    font-family: 微软雅黑;
}
.img1{
    position: relative;
    margin-left: 90px;
    top: 2px;
}
.img2{
    position: relative;
    margin-left: 10px;
    top: 2px;
}
.img3{
    padding: 0 5px 0 5px;
}   
.left-top-tx{
    height: 105px;
}
.left-top-tx img{
    padding: 15px 78px 15px 78px;
}
.left-top-xm{
    height: 65px;
    text-align: center;
}
.left-top-xm .text-a{
    font-size: 16px;
    color:#393a3b;
}
.left-top-xm .text-b{
    font-size: 14px;
    color: #1a80dc;
    position: relative;
    top: 13px;
}
.line2{
    height:1px;
 	width:190px;
 	background:#BABBBE;
 	overflow:hidden;
	margin-left: 22px;
    margin-top: 5px;
}
.left-top-xx{
    height: 210px;
}
.left-top-xx .xx-text{
    position: relative;
    color: #393a3b;
    font-size: 14px;
    margin-left: 30px;
    top: 20px;
}
.left-top-xx .xx-text2{
    position: relative;
    color: #393a3b;
    font-size: 14px;
    margin-left: 30px;
    top: 33px;
}
.left-top-xx .xx-text3{
    position: relative;
    color: #393a3b;
    font-size: 14px;
    margin-left: 30px;
    top: 46px;
}
.left-top-xx .xx-text4{
    position: relative;
    color: #393a3b;
    font-size: 14px;
    margin-left: 30px;
    top: 59px;
}
.left-top-xx .xx-text5{
    position: relative;
    color: #393a3b;
    font-size: 14px;
    margin-left: 30px;
    top: 72px;
}
.left-top-xx span img{
    position: relative;
    left:10px;
    top: 3px;
}
.xx-img1{
    position: relative;
    margin-left: 30px;
    top: 80px;
}
.xx-img2{
    position: relative;
    margin-left: 30px;
    top: 60px;
}
.left-bottem{
    background-color: #f9f9f9;
    width: 100%;
    height: 260px;
    text-align: center;
    border: 1px solid #D4d4d4;
    cursor: pointer;
}
.left-bottem-a{
    background: url(./img/ss.png) 20px center no-repeat;
    position: relative;
    width: 100%;
    height: 40px;
    top:25px; 
}
.left-bottem-text{
    position: relative;
    font-size: 16px;
    color: #444547;
    top: 9px;
}
.left-bottem-b{
    background: url(./img/ss.png) 20px center no-repeat;
    position: relative;
    width: 100%;
    height: 40px;
    top:28px; 
}
.left-bottem-c{
    background: url(./img/ss.png) 20px center no-repeat;
    position: relative;
    width: 100%;
    height: 40px;
    top:31px; 
}
.left-bottem-d{
    background: url(./img/ss.png) 20px center no-repeat;
    position: relative;
    width: 100%;
    height: 40px;
    top:34px; 
}
.left-bottem-e{
    background: url(./img/ss.png) 20px center no-repeat;
    position: relative;
    width: 100%;
    height: 40px;
    top:37px; 
}
.center-body-right{
    width: 755px;
    height: 700px;
    margin-left: 13px;
    float: left;
}
.right-top{
    width: 100%;
    background-color: #f3f3f3;
    position: relative;
}
.right-top-header{
    width: 100%;
    height: 50px;
}
.header-text{
    position: relative;
    font-size: 16px;
    color: #0073da;
    top: 20px;
    left: 30px;
}
.header-text1{
    position: relative;
    float: right;
    font-size: 14px;
    right: 20px;
    top: 22px;
    color: #989898;
}
.right-top-center{
    width: 100%;
    height: 150px;
}
.center-table{
    margin-top: 17px;
    margin-left: 30px;
    font-size: 14px;
    /*height: 150px;*/
    color: #5b5c5e;
}
.table-tr{
    height: 35px;
}
.table-a{
    width:555px;
}
.table-b{
    width: 110px;
}
.center-jc{
    position: relative;
    width: 100%;
    /*bottom: 62px;*/
}
.right-bottem-left{
    width: 28px;
    height: 100%;
    text-align: center;
    float: left;
    background: url(./img/lbx.png) repeat-y;
}

.right-bottem-text{
    font-size: 16px;
    color: #fefefe;
    display: block;
    line-height: 33px;
}
.right-bottem-center{
    width: 465px;
    height: 100%;
    float: left;
    margin-left: 8px;
    background-color: #f9f9f9;
}
.bottem-center-a{
    margin-left: 10px;
    position: relative;
    bottom: 10px;    
    width: 90px;
    height: 130px;
    float: left;
    background: url(./img/bz.png) 20px no-repeat;
}
.bottem-center-b{
    position: relative;
    bottom: 10px;  
    width: 90px;
    height: 100%;
    float: left;
    background: url(./img/sb.png) 20px no-repeat;
}
.bottem-center-c{
    position: relative;
    bottom: 10px;   
    width: 90px;
    height: 100%;
    float: left;
    background: url(./img/gjj.png) 20px no-repeat;
}
.bottem-center-d{
    position: relative;
    bottom: 10px;   
    width: 90px;
    height: 100%;
    float: left;
    background: url(./img/fc.png) 20px no-repeat;
}
.bottem-center-e{
    position: relative;
    bottom: 10px;   
    width: 90px;
    height: 100%;
    float: left;
    background: url(./img/qm.png) 20px no-repeat;
}
.right-bottem-center a{
 font-size: 14px;
 color: #4d5052;
 position: relative;
 left: 15px;
 top: 100px;
}
.right-bottem-right{
    background-color: #f9f9f9;
    width: 225px;
    height: 100%;
    float: right;
}
.bottem-right-left{
    width: 29px;
    height: 124px;
    text-align: center;
    margin-top: 4px;
    margin-left: 8px;
    float: left;
    background: url(./img/dbx2.png) repeat-y;
}
.bottem-right-text{
    font-size: 16px;
    color: #5b5c5e;
    display: block;
    line-height: 31px;
}
.bottem-right-right{
    margin-left: 70px;
}
.bottem-right-right .bottem-right-span{
    position: relative;
    font-size: 14px;
    color: #666769;
    top: 30px;
}
.bottem-right-span1{
    position: relative;
    font-size: 14px;
    color: #666769;
    top: 45px;
}
.
.right-center-center{
    position: relative;
    top: 40px;
    height: 245px;
    width: 100%;
    border: 1px solid #D4d4d4;
}
.center-center-top{
    position: relative;
    bottom: 40px;
    width: 100%;
    height: 40px;
    background-color: #f0f7f8;
    float: left;
}
.center-top-span{
    position: relative;
    left: 32px;
    color: #5b5c5e;
    font-size: 14px;
}
.center-top-span1{
    position: relative;
    left: 50px;
    color: #5b5c5e;
    font-size: 14px;
}
.center-center-center{
    width: 100%;
    height: 205px;
    margin-top: 40px;
}
.center-table1{
    position: relative;
    bottom: 20px;
    margin-left: 10px;
    font-size: 14px;
    color: #5b5c5e;
}
.table-tr1{
    position: relative;
    height: 35px;
}
.table-1{
    width:75px;
    text-align: center;
}

.table-2{
    width: 310px;
}
.table-3{
    width:90px;
    text-align: center;
}
.table-4{
    width: 120px;
    text-align: center;
}
.table-5{
    width:60px;
    text-align: center;
}
.table-6{
    width: 110px;
    text-align: center;
}
.img-a{
    position: relative;
    left: 140px;
    bottom: 60px;
}
.img-b{
    position: relative;
    left: 110px;
    bottom: 20px;
}
.img-c{
    position: relative;
    left: 45px;
    top: 25px;
    /*bottom: 60px;*/
}   


.header-img{
    position: relative;
    left: 10px;
    top: 23px;
}


.img-2{
    position: relative;
    float: left;
    left: 230px;
    bottom: 6px;
}

.right-center{
    width: 100%;
    height: 285px;
    margin-top: 25px;
}


.right-bottem{
    width: 100%;
    height: 130px;
    margin-top: 30px;
}

.pagination{
    position: relative;
    float: right;
    top: 14px;
}
.paginations{
    position: relative;
    float: right;
    bottom: 5px;
}
.layui-laypage-total{
    background-color: #f3f3f3;
}

.hidedomdiv{
    display: none
}
</style>
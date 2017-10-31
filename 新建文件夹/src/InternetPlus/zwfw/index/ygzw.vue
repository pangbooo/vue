/**
 * 政务服务-首页-阳光政务
 * author:kxc
 * 2017-08-10
 */
<template>
  <div class="zwfw-ygzw">
    <div class="zwfw-ygzw__list">
      <div class="zwfw-ygzw__list__title">
        <img src="./img/title-bg2.png">
        <span>阳光政务</span>
      </div>
      <div class="zwfw-ygzw__list__content">
        <div class="zwfw-ygzw__list__first clr">
          <a href="/zwfw/ygzw/index.html" ><img src="./img/icon-1.png"><span>权力清单</span></a>
          <a href="/qlqd/zrqdlb/index.html" ><img src="./img/icon-2.png"><span>责任清单</span></a>
          <a href="/qlqd/xzqlqdlb/index.html" ><img src="./img/icon-3.png"><span>公共服务清单</span></a>
        </div>
        <div class="zwfw-ygzw__list__second clr">
          <a href="/zwfw/ygzw/fmqd/index.html" ><img src="./img/icon-4.png"><span>企业资产负面清单</span></a>
          <a href="/zwfw/ygzw/zxqd/zyzf/index.html" ><img src="./img/icon-5.png"><span>财政专项资金管理清单</span></a>
        </div>
      </div>
    </div>
    <div class="zwfw-ygzw__nav">
      <ul class="clr">
        <li><a href="/wsbs/bjgslb/index.html" ><img src="./img/icon-7.png"><span>办件公示</span><img src="./img/arrow.png"></a></li>
        <li><a href="/qlqd/xzqlqdlb/index.html" ><img src="./img/icon-8.png"><span>办事指南</span><img src="./img/arrow.png"></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
/**
 * 政务服务-首页-阳光政务
 * css belong to ygzw.vue
 * author:kxc
 * 2017-08-10
 */
  .zwfw-ygzw__list{
    width:550px;
    height:350px;
  }
  .zwfw-ygzw__list__title img {
    vertical-align: bottom;
  } 
  .zwfw-ygzw__list__title{
    width:550px;
    height:50px;
    border-bottom:5px solid #3d96e6;
  }
  .zwfw-ygzw__list__title img{
    margin-bottom:10px;
  }
  .zwfw-ygzw__list__title span{
    line-height:50px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 18px;
    color: #000000;
  }
  .zwfw-ygzw__list__content{
    width:550px;
    height:250px;
  }
  .zwfw-ygzw__list__first{
    width:550px;
    height:105px;
    margin-top:20px
  }
  .zwfw-ygzw__list__second{
    width:550px;
    height:125px;
    margin-top:20px;
  }
  .zwfw-ygzw__list__first a{
    display:block;
    float:left;
    width:156px;
    height:105px;
    background:#3d96e6;
    border-radius:2px;
  }
  .zwfw-ygzw__list__first a:hover,
  .zwfw-ygzw__list__second a:hover {
    box-shadow:0 0 8px 0 #ccc, 0 2px 4px 0 #ccc;
    background: #20a0ff;
  }
  .zwfw-ygzw__list__second a{
    display:block;
    float:left;
    width:248px;
    height:126px;
    background:#3d96e6;
    border-radius:2px;
  }
  .zwfw-ygzw__list__first a img,.zwfw-ygzw__list__second a img{
    display:block;
    margin:20px auto 0 auto;
    
  }
  .zwfw-ygzw__list__first a span,.zwfw-ygzw__list__second a span{
    display:block;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 16px;
    color: #ffffff;
    text-align:center;
    margin:0 auto;
  }
  .zwfw-ygzw__list__first a:nth-child(2){
    margin:0 41px;
  }
  .zwfw-ygzw__list__second a:nth-child(2){
    margin-left:54px;
  }
  .zwfw-ygzw__nav{
    width:550px;
    height:106px;
    margin-top:20px;
  }
  .zwfw-ygzw__nav ul li{
    display:block;
    float:left;
    border:1px solid #dddddd;
    text-align:center;
    width:250px;
    height:104px;
  }
  .zwfw-ygzw__nav ul li:hover {
    box-shadow:0 0 8px 0 #ccc, 0 2px 4px 0 #ccc;
  }
  .zwfw-ygzw__nav ul li span{
    font-family: "Microsoft YaHei";
    font-size: 24px;
    color: #000000;
    line-height:104px;
  }
  .zwfw-ygzw__nav ul li img{
    vertical-align:middle;
    margin:0 10px 9px 10px;
  }
  .zwfw-ygzw__nav ul li:nth-child(2){
    margin-left:46px;
  }
</style>
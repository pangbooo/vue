/* 
    描述：专项清单-部门预算
    作者：马丽欣
    创建时间：2017年9月26日
    最后修改人：马丽欣
    最后修改时间：2017年9月26日
*/
<template>
<div>
  <idt-header></idt-header>
  <idt-navbar></idt-navbar>
  <div class="bmys">    
    <div class="bmys_wrap">
      <idt-breadcrumb :page="page" ></idt-breadcrumb>
      <bmysleft></bmysleft>
      <bmyslist></bmyslist>
    </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
  </div>
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import bmysleft from '@/InternetPlus/zwfw/ygzw/zxqd/bmysleft/bmysleft.vue';
import bmyslist from '@/InternetPlus/zwfw/ygzw/zxqd/bmys/bmyslist.vue';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
  export default{
    components: {
      'idt-header': idtheader,
      'idt-navbar':idtnavbar,
      'idt-footer': idtfooter,
      'idt-breadcrumb': idtbreadcrumb,
     'idt-floatbar': floatbar,
      bmysleft,bmyslist
    },
    props: {
      
    },
    data(){
      return {
        page: 'bmys'
      }
    },
    created(){
    },
    methods: {
    }
  }
</script>

<style scoped>
  .bmys_wrap{overflow: hidden;}
  .bmys {
    width: 1250px;
    margin: 0px auto;
  }

  .bmys_sel {
    float: right;
    margin-right: 20px;
  }

  .bmys_input {
    float: right;
  }

  .bmys_pagination {
    margin-top: 30px;
    text-align: center;
    margin-bottom: 30px;
  }

  .bmys::after {
    content: '';
    display: block;
    clear: both;
  }

  .bmys_left {
    width: 292px;
    height: auto;
    float: left;
  }

  .bmys_left--top {
    width: 292px;
    height: 94px;
    border-top: 6px solid #ff6e00;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    line-height: 94px;
    text-indent: 70px;
    background: #0095e4 url("img/pay.png") no-repeat 32px 34px;
  }
  .bmys_left--center .bmys_left--center__li{
    background: #f1f6f9 url("img/pay-list1.png") no-repeat 32px 20px;    
  }

  .bmys_left--bottom {
    width: 292px;
    border-top: 10px solid #ff6e00;
    margin-top: 20px;
    background: #f1f6f9;
  }

  .bmys_left--bottom p {
    padding: 30px 25px;
    text-indent: 2em;
    line-height: 200%;
    text-align: justify;
  }

  .bmys_right {
    width: 914px;
    float: right;
  }

  .bmys_right--top {
    width: 914px;
    height: 50px;
  }

  .bmys_right--top::after {
    content: '';
    display: block;
    clear: both;
  }

  .bmys_right--top h1 {
    font-size: 25px;
    float: left;
    font-weight: normal;
    border-left: 20px double #0095e4;
    padding: 0px 15px;
    height: 30px;
    line-height: 30px;
  }

  .bmys_right--top select {
    float: left;
    width: 162px;
    height: 46px;
    margin-left: 75px;
    border: 1px solid #e1dfda;
  }

  .bmys_right--top input {
    float: right;
    width: 195px;
    height: 44px;
    border: 1px solid #e1dfda;
    text-indent: 20px;
  }

  .bmys_right--top a {
    float: right;
    width: 56px;
    height: 44px;
    border: 1px solid #e1dfda;
    border-left: none;
    background: url("img/pay-search.png") no-repeat 15px 6px;
  }

  .bmys_right--center {
    width: 914px;
  }
  .bmys_right_fenye{
    float: right;
    margin: 10px 10px 10px 0;
  }
  .bmys_left--center > ul > li {
    width: 292px;
    list-style: none;
    line-height: 60px;
    border-bottom: 1px solid #b5e4ff;
    text-indent: 72px;
    background: #f1f6f9 url("img/paylist.png") no-repeat 34px 21px;
  }

  .bmys_left--center > ul > li > a {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: #000000;
    width: 292px;
    height: 60px;
    display: block;
  }
  .bmys_left--center .bmys_left--select{
    color: #ff6e00;
  }
</style>

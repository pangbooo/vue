/* 
    描述：专项清单-转移支付
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
      <zyzfleft></zyzfleft>
      <zyzflist></zyzflist>
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
import zyzfleft from '@/InternetPlus/zwfw/ygzw/zxqd/zxzfleft/zxzfleft.vue';
import zyzflist from '@/InternetPlus/zwfw/ygzw/zxqd/zyzf/zyzflist.vue';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
  export default{
    components: {
      'idt-header': idtheader,
      'idt-navbar':idtnavbar,
      'idt-footer': idtfooter,
      'idt-breadcrumb': idtbreadcrumb,
      'idt-floatbar': floatbar,
      zyzfleft,zyzflist,
      
    },
    props: {
      
    },
    data(){
      return {
        page: 'zyzf',
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
  
</style>

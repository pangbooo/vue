/**
 * 智慧辽源-政务服务-首页-新闻
 * author:kxc
 * 2017-08-10
 */
<template>
  <div class="zwfw-news">
    <div class="zwfw-list__title">
      <i :class="['zwfw-list__title__icon', 'zwfw-list__icon'+titleclass]"></i>
      <span>{{lmmc}}</span>
      <a :href="'/zwfw/zwfwlb/index.html?UUID=' + puuid + '&LMID=' + uuid" >更多>></a>
    </div>
    <list :data="listData" :lmid="uuid" :uuid="puuid"></list>
  </div>
</template>

<script>
  import list from './list';
  import getlist from '@/services/InternetPlus/zwfw/index/zwfwlist';
  export default {
    props: {
      uuid: {
        type: String,
        default: ''
      },
      puuid: {
        type: String,
        default: ''
      },
      lmmc: {
        type: String,
        default: ''
      },
      // lmdm: {
      //   type: String,
      //   default: ''
      // },
      titleclass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        listData: []
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let params = { puuid: this.uuid,nowpage: 1,pagesize: 7,zyxOrDjl: 'zyx' };
        getlist(params).then(data => {
          if(data.code === "idt-oApp-5000"){
            this.listData = data.data.DataList;
          }else{
            this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(data =>{
            this.$message.error('网络连接异常，请检查网络！')
        });
      }
    },
    components: {
      list
    }
  }
</script>

<style scoped>
  .zwfw-list__title{
    width:100%;
    height:50px;
    border-bottom:5px solid #dddddd;
  }
  .zwfw-list__title span{
    display:block;
    float:left;
    width:75px;
    line-height:50px;
    height:50px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 18px;
    color: #000000;
    border-bottom:5px solid #3d96e6;
    text-align:center;
  }
  
  .zwfw-list__title__icon{
    display:block;
    float:left;
    width: 28px;
    height: 28px;
    margin-top:13px;
    margin-right:10px;
  }
  .zwfw-list__icon1 {
    background: url('./img/title-bg3.png');
  }
  .zwfw-list__icon2 {
    background: url('./img/title-bg4.png');
  }
  .zwfw-list__icon3 {
    background: url('./img/title-bg5.png');
  }
  .zwfw-list__icon4 {
    background: url('./img/title-bg6.png');
  }
  .zwfw-list__title a{
    display:block;
    float:right;
    line-height:50px;
    height:55px;
    font-family: "Microsoft YaHei";
    font-size: 14px;
    color: #000000;
  }
</style>
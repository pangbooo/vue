/**
 * 智慧辽源-政务服务-首页-列表
 * author:kxc
 * 2017-08-09
 */
<template>
  <div class="zwfw-list">
    <slot name="title"></slot>
    <div class="zwfw-list__content">
      <ul v-show='data.length!==0'>
        <li v-for="item in data" :key="item.UUID">
          <a :href="'/zwfw/zwfwdetail/index.html?UUID=' + uuid + '&LMID='+ lmid +'&WZID=' + item.UUID"  :title="item.WZBT">{{ item.WZBT | subString}}</a><span>[{{ format(item.FBSJ) }}]</span>
        </li>
      </ul>
      <div class="nullinfo" v-show='data.length===0'>
          <img src="/static/img/data-null.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { subString } from '@/lib/publicFun';

  export default {
    props: {
      data: {
        type: Array,
        default: function(){
          return []
        }
      },
      lmid: {
        type: String,
        default: ''
      },
      uuid: {
        type: String,
        default: ''
      }
    },
    created() {
      
    },
    filters: {
      subString: function (val) {
        return subString(val,25)
      }
    },
    methods: {
      add0(m){return m<10?'0'+m:m },
      format(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth()+1;
        let d = time.getDate();
        // let h = time.getHours();
        // let mm = time.getMinutes();
        // let s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d);
      }
    },
    computed: {
        
    }
  }
</script>

<style scoped>
/**
 * 智慧辽源-政务服务-首页-列表
 * css belong to list.vue
 * author:kxc
 * 2017-08-09
 */
  .zwfw-list{
    width:100%;
    /* height:290px; */
  }
  .zwfw-list__content{
    width:100%;
    /* height:300px; */
  }
  
  .zwfw-list__content li{
    width: 100%;
    line-height:40px;
    height:40px;
    border-bottom:1px dashed #dddddd;
    font-family: "Microsoft YaHei";
    font-size: 15px;
    color: #505050;
  } 
  .zwfw-list__content li:nth-child(7){
    border:none;
  }
  .zwfw-list__content li:hover {
    background-color: #eef1f6;
  }
  .zwfw-list__content li a {
    float: left;
    width: 80%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }
  .zwfw-list__content li span{
    float:right;
    font-size:14px;
  }
  .zwfw-list__content__li--null {
    text-align: center;
    color: #505050;
  }
  .nullinfo{text-align:center;padding: 50px 0 50px 0;}
</style>
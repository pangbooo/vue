/* 
    描述：负面清单
    作者：马丽欣
    创建时间：2017年9月26日
    最后修改人：马丽欣
    最后修改时间：2017年9月26日
*/
<template>
  <div class="fmqd">
    <idt-header></idt-header>
  <idt-navbar></idt-navbar>
    <div class="fmqd_wrap">
      <idt-breadcrumb :page="page" ></idt-breadcrumb>
      <fmqdlist></fmqdlist>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
  </div>
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtfooter from '@/InternetPlus/common/footer/footer';
import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import fmqdlist from '@/InternetPlus/zwfw/ygzw/fmqd/fmqdlist.vue';


// import list from '@/services/InternetPlus/zwfw/ygzw/fmqd/list.js'
  export default{
    components: {
      'idt-header': idtheader,
      'idt-navbar':idtnavbar,
      'idt-footer': idtfooter,
      'idt-floatbar': floatbar,
      'idt-breadcrumb': idtbreadcrumb,
      fmqdlist
    },
    data(){
      return {
        page:'fmqd'
      }
    },
    created(){
    },
    methods: {
      changeArea(item){
        let uuid = item.uuid;
        for(let i = 0;i < this.area.length;i++){
          this.area[i].checked = false;
          if(this.area[i].uuid == uuid){
            this.area[i].checked = true;
            this.type = this.area[i].children;
            // console.log(this.type)
          }
        }
      },
      changeType(item){
        let uuid = item.uuid;
        for(let i = 0;i < this.type.length;i++){
          this.type[i].checked = false;
          if(this.type[i].uuid == uuid){
            this.type[i].checked = true;
            this.content = this.type[i].children;
          }
        }
      },
      getList(){
        list().then(data=>{
          this.area = data.resultList;
          this.type = this.area[0].children;
          this.content = this.type[0].children;
        })
      }
    }
  }
</script>

<style scoped>
/**
 * 智慧辽源-生活服务-负面清单
 * author:lwd
 * 2017-08-17
 */
  .footer .link a{ color:#8b8b8b}
  /* 负面清单 */
  .fmqd_wrap{width:1250px;margin:0 auto; font-size:16px;}
  
</style>

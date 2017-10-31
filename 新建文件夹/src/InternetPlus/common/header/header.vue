/**
 * 通用header
 * 注：除主页外其他页面均调用此组件
 * author:kxc
 * 2017-08-11
 */
<template>
  <div :class="['idt-header', 'idt-header--'+ state]">
      <div class="idt-header__wrap">
        <idt-header></idt-header>
      </div>
    </div>
</template>

<script>
  import header from './headerfirst'
  export default {
    data() {
      return {
        headername:''
      }
    },
    mounted() {
        
    },
    computed: {
      state() {
        let hours = new Date().getHours();
        let state = (hours >= 7 && hours <= 19) ? 'day' : 'night';
        let href=location.href;
        if(href.indexOf('/yzly/')>-1){
            state = 'yzly';
        }
        if(href.indexOf('/shzb/')>-1){
            state = 'shzb';
        }
        return state;
      }
    },
    components: {
      'idt-header': header
    }
  }
</script>

<style scoped>
/**
 * 通用header
 * css belong to idt-header.vue
 * author:kxc
 * 2017-08-11
 */
  .idt-header {
    position:relative;
    width:100%;
    height: 150px;
  }
  .idt-header--day {
    background:url("./img/top-bg2.png") no-repeat;
    background-size:100% 100%;
  }
  .idt-header--night {
    background:url("./img/top-bg.png") no-repeat;
    background-size:100% 100%;
  }
  .idt-header__wrap {
    width: 1250px;
    margin: 0 auto;
  }
  .idt-header--yzly {
    background:url("./img/top-bg2-yzly.png") no-repeat;
    background-size:100% 100%;
  }
   .idt-header--shzb {
    background:url("./img/top-bg2-shzb.png") no-repeat;
    background-size:100% 100%;
  }

</style>
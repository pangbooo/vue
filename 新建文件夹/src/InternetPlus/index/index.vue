/**
 * 首页
 * author:kxc
 * 2017-08-08
 */
<template>
  <div class="sy-banner">
    <div class="sy-banner__wrap" id="banner-show">
      <div class="sy-banner__wrap__box"><img class="sy-banner__img" src="/static/img/banner1.jpg" width="1920" height="746"></div>
      <div class="sy-banner__wrap__box hidden"><img class="sy-banner__img" src="/static/img/banner2.jpg" width="1920" height="746"></div>
      <div class="sy-banner__wrap__box hidden"><img class="sy-banner__img" src="/static/img/banner3.jpg" width="1920" height="746"></div>
      <!-- <div class="sy-banner__wrap__box"><img src="./img/banner4.jpg" width="1920" height="746"></div> -->
      <div class="sy-banner__mag">
        <idt-header></idt-header>
        <div class="sy-importnews__wrap">
          <import-news></import-news>
        </div>
        <div class="sy-hotsearch">
          <hot-search></hot-search>
        </div>
        <div class="sy-centernav">
          <center-nav></center-nav>
        </div>
      </div>
      <!-- <div class="sy-importnews">
        <div class="sy-importnews__wrap">
          <import-news></import-news>
        </div>
      </div> -->
      <div class="sy-focusnews">
        <focus-news></focus-news>
      </div>
    </div>
    <div class="sy-importnews">
        
      </div>
    <div class="sy-footer">
      <idt-footer></idt-footer>
    </div>
    <idt-floatbar></idt-floatbar>
  </div>
</template>

<script>
  import header from '@/InternetPlus/common/header/headerfirst.vue';
  import floatbar from '@/InternetPlus/common/floatbar/floatbar.vue';
  import navbar from '@/InternetPlus/common/navbar/navbar.vue';
  import hotsearch from './hot-search.vue';
  import centernav from './center-nav.vue';
  import importnews from './import-news.vue';
  import focusnews from './focus-news.vue';
  import footer from '@/InternetPlus/common/footer/footer.vue';
  export default {
    data() {
      return {
      }
    },
    mounted() {
      this.scroll();
    },
    methods: {
      scroll() {
        let timer=5000;
	      let showtime = 1000;
        let inbox = $('.sy-banner__wrap__box');
	      let size = inbox.length;
        let num = 0;
        function moveDay() {
          num ++;
          num = num === size ? 0 : num;
          inbox.fadeOut(showtime);
          inbox.eq(num).fadeIn(showtime);
        }
        setInterval(moveDay, timer);
      }
    },
    components: {
      'idt-header': header,
      'idt-navbar': navbar,
      'hot-search': hotsearch,
      'center-nav': centernav,
      'import-news': importnews,
      'focus-news': focusnews,
      'idt-footer': footer,
      'idt-floatbar': floatbar
    }
  }
</script>

<style scoped>
/**
 * 首页
 * css belong to index.vue
 * author:kxc
 * 2017-08-08
 */
  .sy-banner{ min-width:980px; position:relative; height:1054px;margin:0 auto; overflow:hidden; z-index:1;}
  .sy-banner__wrap{ width:100%; text-align:center; height:1004px; overflow:hidden; position:relative;}
  .sy-banner__wrap__box{ position:absolute; left:0; top:0; width: 100%;}
  .sy-banner__mag{width:1250px;height:746px;position:absolute; overflow:hidden;left:50%;top:0px;margin-left:-624px;text-align:left;z-index:99;}
  .sy-hotsearch {
    margin: 138px auto 0;
  }
  .sy-centernav {
    height: 172px;
    margin: 75px auto 0;
  }
  .sy-importnews {
    background: rgba(0,0,0,0.8);width: 1920px;height: 50px;position:absolute;left:50%;top:150px;margin-left:-960px;text-align:left;z-index:3;
  }
  .sy-importnews__wrap {
    width: 1250px;height: 50px;margin: -17px auto -34px;line-height: 50px;
  }
  .sy-focusnews {
    position:absolute; top:746px; width:1250px;left:50%;margin-left:-624px; z-index:99;
  }
  .sy-navbar {
    width: 1920px;height: 50px;background: #4c4b4a;position:absolute;left:50%;top:150px;margin-left:-960px;text-align:left;z-index:99;
  }
  .hidden {
    display: none;
  }
  .sy-footer {
    
  }
</style>
/**
 * 智慧辽源-首页-重要新闻公告
 * author:kxc
 * 2017-08-08
 */
<template>
  <div class="import-news_wrap">
    <span>重要公告：</span>
    <div class="auto-scroll" id="auto-scroll">
      <ul>
        <li v-for="item in newsData" :key="item.UUID">
          <a :href="item.url">{{item.WZBT}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import getImportnews from '@/services/InternetPlus/index/getImportnews';
  import {LMIDS} from '@/api/lmManage.js';
  export default {
    data() {
      return {
        newsData: {
          text: '',
          url: ''
        }
      }
    },
    created() {
      this.getData();
    },
    mounted() {
      
      var timer;
      $('#auto-scroll').hover(function(){
          clearInterval(timer); 
      }, function(){ 
          timer = setInterval(function() {
            $('#auto-scroll').find("ul:first").animate({
              marginTop: "-60px"
            }, 2000, function (){
              $(this).css({ marginTop: "-10px" }).find("li:first").appendTo(this);
            });
          }, 5000) ;
      }).trigger('mouseleave'); 
    },
    methods: {
      getData() {
        getImportnews({lmid: LMIDS.通知通告}).then(res => {
          if(res.status === 'success' && res.data.DataList.length > 0) {
            res.data.DataList.forEach((item, index) => {
              item.url = 'zwfw/zwfwdetail/index.html?UUID=' + LMIDS.政务服务 + '&LMID=' + LMIDS.通知通告 + '&WZID=' + item.UUID
            })
            this.newsData = res.data.DataList;
          }
        })
      }
    },
    components: {
    }
  }
</script>

<style scoped>
/**
 * 智慧辽源-首页-重要新闻公告
 * css belong to import-news.vue
 * author:kxc
 * 2017-08-08
 */
  .import-news_wrap{width: 100%;height: 50px;background:url("./img/import.png") no-repeat 26px 14px;margin: 0px auto;line-height: 50px;font-size: 16px;font-weight: bold;color: #ff5c00;}
  .import-news_wrap a{color: #fff;font-weight: normal;}
  .import-news_wrap a:hover{color: #50bfff;}
  .import-news_wrap span {
    width: 100px;
    float: left;
    margin-left: 56px;
  }
.import-news_wrap .auto-scroll {
    position: relative;
    width: 900px;
    float: left;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    margin: 10px 0;
}
.import-news_wrap .auto-scroll ul {
  margin-top: -10px;
}
.import-news_wrap .auto-scroll ul li {
    height: 50px;
    line-height: 50px;
}
</style>
<template>
    <div class="search-box">
        <form action="/index.php/goods" method="post" id="search">
            <input name="keywords" type="text" placeholder="这里是search组件" class="s-tex" id="keywords"><input name="" type="submit" class="s-but" value="搜索">
        </form>
        <span class="hot-search clr">热门搜索： <router-link v-for="item in keywordslist" :to="item.title" >{{item.title}}</router-link></span>
    </div>
</template>

<script>
export default {
  data () {
    return {
      hotwords: []
    }
  },
  props: {
    keywordslist: {
      type: Array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #search{ clear: right; display: block; overflow: hidden; color: #cccdcd; }
  .hot-search{ padding-top: 10px; font-size: 14px; width: 525px; display: block; }
  .search-box{ width: 550px; height: 85px; float: left; padding-top: 25px; }
  #keywords,#keyword{ float: left; width: 419px; height: 40px; border: 1px solid #c9caca; border-right:none; padding-left: 18px; vertical-align: top;font-size: 14px; }
  .s-but{ float: left; width: 100px; height: 40px; border: 1px solid #231815; background-color:#231815; color: #fff; font-size: 16px; line-height: 40px; text-align: center; cursor: pointer; padding: 0; margin: 0; }
  #search{ clear: right; display: block; overflow: hidden; color: #cccdcd; }
  .hot-search{ padding-top: 10px; font-size: 14px; width: 525px; display: block; }
  .hot-search a{padding-right:10px;}
</style>

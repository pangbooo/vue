/**
 * 智慧辽源-首页-热门搜索
 * author:kxc
 * 2017-08-08
 */
<template>
  <div> 
    <div class="hot-search__input">
      <div class="hot-search__input__content">
        <input type="text" v-model="keyword" placeholder="请输入搜索内容" @keyup.enter="open"/>
        <a href="javascript:void(0)" @click="open"></a>
      </div>
    </div>
    <div class="hot-search__key">
      <div class="hot-search__key__content hot-search--night">
        <span>热门搜索：</span>
        <ul>
          <li v-for="word in hotwords" :key="word">
            <a href="javascript:void(0)" @click="quickOpen(word)">{{word}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
        hotwords: ['公积金', '医保', '社保', '办事', '物业缴费', '手机开户']
      }
    },
    methods: {
      quickOpen(word) {
        this.keyword = word;
        window.open(encodeURI('/search/searchlist/index.html?keyword=' + this.keyword))
      },
      open() {
        if (!$.trim(this.keyword)) {
          this.$message.error('请输入搜索内容');
          this.keyword = '';
        } else {
          window.open(encodeURI('/search/searchlist/index.html?keyword=' + this.keyword))
        }
      }
    }
  }
</script>

<style scoped>
/**
 * 智慧辽源-首页-热门搜索
 * css belong to hot-search.vue
 * author:kxc
 * 2017-08-08
 */
  .hot-search__input {min-width: 800px;height: 66px;margin: auto;}
  .hot-search__input__content input{width: 476px;height: 49px;border-radius: 8px;font-size: 16px;color: #5c5b56;text-indent: 20px;margin: 8px;border:1px solid #ccddf1;outline: none;}
  .hot-search__input__content a{display: block;width: 63px;height: 51px;background: url("./img/search.png") no-repeat;position: absolute;right: 8px;top: 8px;background-color: #cdd5e9;}
  .hot-search__input__content{width: 550px;height: 66px;background: url("./img/searchk.png");margin: auto;position: relative;}
  .hot-search__key {min-width: 800px;height: 21px;margin: 30px auto 0;}
  .hot-search__key__content{width: 550px;height: 24px;line-height:24px;margin: 0px auto;position: relative;color: #000;background-color: rgba(0,0,0,.42);border-radius: 10px;}
  .hot-search__key__content span{font-size: 16px;margin: 0px 0px 0px 40px;}
  .hot-search__key__content ul{position: absolute;left: 110px;top: 0px;}
  .hot-search__key__content ul li{float: left;padding: 0px 12px;font-size: 16px;border-right: 1px solid #000;}
  .hot-search__key__content ul li:last-child{border-right: none;}
  .hot-search__key__content ul li a{color: #000;}
  .hot-search__key__content ul li a:hover{color: #fa791e;}
  .hot-search__key__content.hot-search--night {
    color: #fff;
  }
  .hot-search__key__content.hot-search--night ul li {border-right: 1px solid #fff}
  .hot-search__key__content.hot-search--night ul li:last-child {border-right: none}
  .hot-search__key__content.hot-search--night ul li a {color: #fff}
  .hot-search__key__content.hot-search--night ul li a:hover {color: #fa791e}
</style>
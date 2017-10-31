<template>
  <div id="header" class="header">
    <div class="h-topnav">
      <div class="center clr">
        <p class="welcome">Hi,欢迎您~ </p>
        <router-link to="/login" class="ml m-login" style="color:orange;padding:0 20px;">点我跳转到-登录视图</router-link>
        <p @click="sendParent" style="color:blue;" class="welcome">点我给父组件传值</p>
        <div class="topshopcar fr">
          <span class="shoplogo"></span> 
          <p class="tsp">购物车-<b>0</b>件商品结算</p>
          <span class="tsx"></span>
        </div>
      </div>
    </div>
    <div class="h-center">
      <div class="center clr">
        <div class="logo">
          Hi,这里是被index.vue引入的header组件
          <br><br>
          这里是传入的变量user:{{user}}
        </div>
          <v-search :keywordslist='keywordslist'></v-search>
          <div class="erwei">
            <div class="erweima"><img src="./img/er.jpg" alt=""></div>
            <p>柚子客户端</p>
          </div>
       </div>
    </div>
    <div class="h-bottom">
      <div class="center">
          <ul class="nav clr" id="nav">
              <li class="navli clr" v-for="(item,index) in nav" :key="index" @mouseleave="item.open=!item.open">
                <router-link to="" class="nava" @mouseenter="item.open=!item.open" >
                {{item.title}}
                </router-link>
                <span class="line"></span>
                <ul class="subnav" v-show="item.open">
                  <li class="snavli nbr" v-for="(item2, index) in item.children">
                    <span class="snavl">></span>
                    <router-link to="" class="snava">{{item2}}</router-link>
                  </li>
                </ul>
              </li>
          </ul>
       </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/search/search'

export default {
  components: {
    'v-search': search
  },
  props: {// 获取传入的值
    user: {
      type: String,
      default: ''
    },
    radio: {
      type: Object,
      default () {
        return {}// 对象返回方法 跟data一个道理
      }
    }
  },
  data () {
    return {
      nav: [{
        'title': '美睫品牌',
        'children': ['产品类目1', '产品类目2', '产品类目3'],
        'open': false
      },
      {
        'title': '美睫品牌2',
        'children': ['产品类目1', '产品类目2'],
        'open': false
      },
      {
        'title': '美睫品牌3',
        'children': ['产品类目1', '产品类目2'],
        'open': false
      }],
      keywordslist: [
        {
          'title': '一洗而尽',
          'url': 'javascript:;'
        },
        {
          'title': '超值面膜组',
          'url': 'javascript:;'
        },
        {
          'title': '韩式秋冬装',
          'url': 'javascript:;'
        },
        {
          'title': '男士专属',
          'url': 'javascript:;'
        }
      ]
    }
  },
  watch: {
    radio: {
      handler: function (val, oldval) {
        alert('我检测到传入的radio对象属性值改值了:' + oldval + '---' + val)
      },
      deep: true// 对象内部的属性监听，也叫深度监听 不加对象属性值改变是不触发的
    },
    user: function (val, oldval) {
      console.log(this.user)
    }
  },
  methods: {
    navhover: function () {
      alert(1)
    },
    sendParent: function () {
      this.$emit('msg', '嗨,美女。有空一起吃饭啊~')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header .center{width: 1200px;margin:0 auto;}
  .header{ width: 100%; }
  .header .h-topnav{  width: 100%; height: 41px; background-color: #efefef; line-height: 41px; font-size: 12px;}
  .header .welcome,.ml,.ol,.shoplogo,.tsp,.tsx{ float: left; display: block; }
  .header .ml{ margin-right: 8px; }
  .header .ml span{ padding-left: 5px; }
  .header .ml:hover{ color: #231815; }
  .header .ol,.shoplogo,.tsx{ width: 24px; height: 24px; margin-top: 9px; background: url(./img/sprite.png) no-repeat; }
  .header .wxl{ background-position: 0 -24px; }
  .header .wbl{ background-position: 0 -46px; }
  .header .shoplogo{ padding-right: 5px; margin-top: 8px; background: url(./img/shopcar.png) no-repeat; }
  .header .tsx{ background: url(./img/xia.png) no-repeat 50%; }
  .header .h-center{ width: 100%; height: 120px; }
  .header .logo{ width: 265px; height: 69px; overflow: hidden; float: left; padding-top: 25px; padding-right: 150px; }
  .header .search-box{ width: 550px; height: 85px; float: left; padding-top: 25px; }
  .header #keywords,#keyword{ float: left; width: 419px; height: 40px; border: 1px solid #c9caca; border-right:none; padding-left: 18px; vertical-align: top;font-size: 14px; }
  .header .s-but{ float: left; width: 100px; height: 40px; border: 1px solid #231815; background-color:#231815; color: #fff; font-size: 16px; line-height: 40px; text-align: center; cursor: pointer; padding: 0; margin: 0; }
  .header .erwei{ width: 74px; height: 88px; border: 1px solid #efefef; float: right; margin-top: 14px; }
  .header .erweima{ width: 100%; }
  .header .erwei p{ width: 100%; text-align: center; color: #595757; font-size: 12px;}
  .header .h-bottom{ width: 100%; height: 120px; background-color: #231815; height: 51px; }
  .header .nav{ margin: 0 auto; }
  .header .navli{ float: left; display: block; width: 136px; position: relative; }
  .header .nava{ display: block; width: 135px; height: 51px; text-align: center; font-size: 15px; line-height: 51px; color: #fff; float: left; }
  .header .nava:hover{ background: #b3985b; width: 136px; }
  .header .line{ width: 1px; height: 24px; display: block; float: left; margin-top: 14px; background-color: #fff; }
  .header .navli:last-child .line{ display: none; }
  .header .subnav{position: absolute; top: 51px; left: -100px; z-index: 99; width: 465px; background: #3e3a39; padding: 20px 0 20px 40px; overflow: hidden; color: #fff; }
  .header .subnav-r{ left: inherit; right: -50px; }
  .header .snavli{ display: block; float: left; width: 155px; height: 30px; line-height: 30px; }
  .header .snavl{ color: #727171; padding-right: 10px; }
</style>

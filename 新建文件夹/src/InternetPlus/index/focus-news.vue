/**
 * 智慧辽源-首页-焦点新闻轮播
 * author:kxc
 * 2017-08-08
 */
<template>
  <div class="focus-news">
    <el-carousel :interval="3000" :arrow="groupNum > 1 ? 'always' : 'never'" indicator-position="none"   >
      <el-carousel-item v-for="item in groupNum" :key="item" class="focus-news__content" >
        <ul class="fix" name="focus-news__slide">
          <li v-for="(data, index) in listData" :key="data.name" v-if="(index >= (item -1) * showNum && index < item * showNum)" >
            <a :href="data.path" >
              <i :class="['focus-news__icon','focus-news__icon__'+data.icon]"></i>
              <h1>{{data.name}}</h1>
              <!--<p>{{data.text}}</p>-->
            </a>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import {LMIDS} from '@/api/lmManage.js';
  export default {
    props: {
      
    },
    data() {
      return {
        listData: [
          {name: '结婚登记预约', text: '结婚登记预约', path: '/wsbs/hyyydj/index.html', icon: 'pic1'},
          {name: '社保查询', text: '社保查询', path: '', icon: 'pic2'},
          {name: '公积金查询', text: '公积金查询', path: '', icon: 'pic3'},
          {name: '办事进度查询', text: '办事进度查询', path: '/wsbs/bjgslb/index.html', icon: 'pic4'},
          {name: '行政处理查询', text: '行政处理查询', path: '', icon: 'pic5'},
          {name: '小企业服务', text: '小企业服务', path: '', icon: 'pic6'},
          {name: '医疗预约挂号', text: '医疗预约挂号', path: '', icon: 'pic7'},
          {name: '行驶驾驶补证', text: '行驶驾驶补证', path: '', icon: 'pic8'},
          {name: '出境入境', text: '出境入境', path: '', icon: 'pic9'},
          {name: '房屋权属', text: '房屋权属', path: '', icon: 'pic10'},
          {name: '个人纳税', text: '个人纳税', path: '', icon: 'pic11'},
          {name: '违章查询', text: '违章查询', path: '', icon: 'pic12'}// ,
          // {name: '会计证申办', text: '会计证申办', path: '', icon: 'pic13'},
          // {name: '企业纳税', text: '企业纳税', path: '', icon: 'pic14'}
        ],
        showNum: 6,
        groupNum: 1,
        changeStart: false
      }
    },
    created() {
      this.groupNum = Math.ceil(this.listData.length / this.showNum);
    },
    mounted() {
      
    },
    methods: {
      change(index) {
        if (this.changeStart) {
          let arrayA = []
          arrayA = this.listData.splice(this.showNum, this.showNum);
          this.listData = arrayA.concat(this.listData);
        } else {
          this.changeStart = true;
        }
      }
    },
    components: {
    }
  }
</script>

<style scoped>
/**
 * 智慧辽源-首页-焦点新闻轮播
 * css belong to focus-news.vue
 * author:kxc
 * 2017-08-08
 */
  .focus-news{height:282px; color:#fff; padding:0px; width:100%;
 }
  .focus-news__tabs__prev{ width:35px; height:48px;cursor:pointer; background:url(./img/left.png)  no-repeat;position: absolute;left: 0px;top: 116px;}
  .focus-news__tabs__next{ width:35px; height:48px;cursor:pointer; background:url(./img/right.png)  no-repeat;position: absolute;right:0px;top:116px;}
  .focus-news__content{ float:left; width:1140px;height: 180px;margin: 50px 55px;text-align: center;overflow: hidden;}
  .focus-news__content ul {width: 300%;}
  .focus-news__content ul li{ float:left; width:190px;}
  .focus-news__content ul li a h1{ color: #4b4c4a;text-align: center;font-size: 18px;margin: 25px 0px 18px;}
  .focus-news__content ul li a p{ font-size:14px;text-align: center;color: #4b4c4a;}
  .focus-news__content ul.hide{ display:none;}
  .focus-news__icon {
    display: block;
    margin: 0 auto;
    width: 64px;
    height: 64px;
  }

  .focus-news__icon__pic1 {
    background:url(./img/pic1.png)  no-repeat
  }
  .focus-news__icon__pic2 {
    background:url(./img/pic2.png)  no-repeat
  }
  .focus-news__icon__pic3 {
    background:url(./img/pic3.png)  no-repeat
  }
  .focus-news__icon__pic4 {
    background:url(./img/pic4.png)  no-repeat
  }
  .focus-news__icon__pic5 {
    background:url(./img/pic5.png)  no-repeat
  }
  .focus-news__icon__pic6 {
    background:url(./img/pic6.png)  no-repeat
  }
  .focus-news__icon__pic7 {
    background:url(./img/pic7.png)  no-repeat
  }
  .focus-news__icon__pic8 {
    background:url(./img/pic8.png)  no-repeat
  }
  .focus-news__icon__pic9 {
    background:url(./img/pic9.png)  no-repeat
  }
  .focus-news__icon__pic10 {
    background:url(./img/pic10.png)  no-repeat
  }
  .focus-news__icon__pic11 {
    background:url(./img/pic11.png)  no-repeat
  }
  .focus-news__icon__pic12 {
    background:url(./img/pic12.png)  no-repeat
  }
  .focus-news__icon__pic13 {
    background:url(./img/pic13.png)  no-repeat
  }
  .focus-news__icon__pic14 {
    background:url(./img/pic14.png)  no-repeat
  }
  .focus-news__icon__pic15 {
    background:url(./img/pic15.png)  no-repeat
  }
  .focus-news__icon__pic16 {
    background:url(./img/pic16.png)  no-repeat
  }
  .focus-news__icon__pic17 {
    background:url(./img/pic17.png)  no-repeat
  }
  .focus-news__icon__pic18 {
    background:url(./img/pic18.png)  no-repeat
  }
  .focus-news__slide-enter-active {
    transform: translate(0);
    transition: all 1s ease;
  }
  .focus-news__slide-leave-active {
    transform: translate(-100%);
    transition: all 1s ease;
  }
  .focus-news__slide-enter {
    transform: translate(100%);
  }
  .focus-news__slide-leave {
    transform: translate(0);
  }
</style>
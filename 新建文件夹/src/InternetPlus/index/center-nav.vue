/**
 * 首页-中心导航
 * author:kxc
 * 2017-08-08
 */
<template>
  <div class="center-nav__list">
    <ul>
      <li v-for="item in data" :key="item.id">
        <a :href="item.path" :class="[item.id, 'animated fadeIn']" :name="item.name" :target="item.path && item.path.indexOf('http') > -1 ? '_blank' : '_self'"></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { LMIDS } from '@/api/lmManage.js';
export default {
  data() {
    return {
      data: [
        { id: 'a1', name: "个人办事", path: '/qlqd/xzqlqdlb/index.html?fwlb=grbs' },
        { id: 'a2', name: "法人办事", path: '/qlqd/xzqlqdlb/index.html?fwlb=frbs' },
        { id: 'a3', name: "公共服务", path: '/qlqd/xzqlqdlb/index.html?fwlb=ggfw' },
        { id: 'a4', name: "便民服务", path: '/zwfw/ygzw/bmfw/index.html' },
        { id: 'a5', name: "阳光政务", path: '/zwfw/index.html' },
        { id: 'a6', name: "数据开放", path: 'javascript:void(0)' },
        { id: 'a7', name: "公共资源交易", path: 'javascript:void(0)' },
      ]
    }
  },
  mounted() {
    setTimeout(function() {
      fadein($('.a1'))
    }, 0);
    setTimeout(function() {
      fadein($('.a2'))
    }, 300);
    setTimeout(function() {
      fadein($('.a3'))
    }, 600);
    setTimeout(function() {
      fadein($('.a4'))
    }, 900);
    setTimeout(function() {
      fadein($('.a5'))
    }, 1200);
    setTimeout(function() {
      fadein($('.a6'))
    }, 1500);
    setTimeout(function() {
      fadein($('.a7'))
    }, 1800);
    function fadein(el) {
      el.animate({ opacity: 1 }, 600)
    }
  },
  methods: {

  },
  components: {
  }
}
</script>

<style scoped>
/**
 * 首页-中心导航
 * css belong to center-nav.vue
 * author:kxc
 * 2017-08-08
 */

.center-nav__list {
  width: 1250px;
  height: 160px;
  margin: 0px auto;
}

.center-nav__list ul li {
  float: left;
  margin-left: 10px;
}

.center-nav__list ul li:first-child {
  margin-left: 105px;
}

.center-nav__list ul li .a1,
.center-nav__list ul li .a2,
.center-nav__list ul li .a3,
.center-nav__list ul li .a4,
.center-nav__list ul li .a5,
.center-nav__list ul li .a6,
.center-nav__list ul li .a7 {
  display: block;
  opacity: 0;
  width: 140px;
  height: 160px;
  background: #ff1f13;
  transition-property: all;
  transition-duration: 1s;
  transition-timing-function: initial;
  transition-delay: initial;
}

.center-nav__list ul li .a1 {
  background: url("./img/icon1.png") no-repeat;
}

.center-nav__list ul li:hover .a1 {
  background: url("./img/icon1h.png") no-repeat;
  transform: rotateY(180deg);
}

.center-nav__list ul li .a2 {
  background: url("./img/icon2.png") no-repeat;
}

.center-nav__list ul li:hover .a2 {
  background: url("./img/icon2h.png") no-repeat;
  transform: rotateY(180deg);
}

.center-nav__list ul li .a3 {
  background: url("./img/icon3.png") no-repeat;
}

.center-nav__list ul li:hover .a3 {
  background: url("./img/icon3h.png") no-repeat;
  transform: rotateY(180deg);
}

.center-nav__list ul li .a4 {
  background: url("./img/icon4.png") no-repeat;
}

.center-nav__list ul li:hover .a4 {
  background: url("./img/icon4h.png") no-repeat;
  transform: rotateY(180deg);
}

.center-nav__list ul li .a5 {
  background: url("./img/icon5.png") no-repeat;
}

.center-nav__list ul li:hover .a5 {
  background: url("./img/icon5h.png") no-repeat;
  transform: rotateY(180deg);
}

.center-nav__list ul li .a6 {
  background: url("./img/icon6.png") no-repeat;
}

.center-nav__list ul li:hover .a6 {
  background: url("./img/icon6h.png") no-repeat;
  transform: rotateY(180deg);
}

.center-nav__list ul li .a7 {
  background: url("./img/icon7.png") no-repeat;
}

.center-nav__list ul li:hover .a7 {
  background: url("./img/icon7h.png") no-repeat;
  transform: rotateY(180deg);
}
</style>
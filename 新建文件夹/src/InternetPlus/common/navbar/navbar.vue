/**
 * 通用导航
 * author:kxc
 * 2017-08-07
 */
<template>
  <div class="navbar clr">
    <div class="navbar__wrap">
      <ul class="clr">
        <!-- <li class="navbar__li--first"><a href="/index.html">首页</a></li> -->
        <li v-for="(navItem,index) in navData"  :key="index" :class="navData.length > 8 ? ((navData.length > 10)?'navber_inner--many_1':'navber_inner--many') : ''" @mouseenter="navItem.show = true" @mouseleave="navItem.show = false">
          <a :href="navItem.path" :target="navItem.path && navItem.path.indexOf('http') > -1 ? '_blank' : '_self'">{{navItem.lmmc}}</a>
          <div :class="navItem.children&&navItem.children.length > 4 ? 'navbar__inner navbar__inner--large' : 'navbar__inner'" v-show="navItem.children && navItem.show && false">
            <div class="navbar__inner__img">
              <a :href="navItem.subpath" :class="'navbar__inner__img__icon'+(index)" :target="navItem.subpath && navItem.subpath.indexOf('http') > -1 ? '_blank' : '_self'"></a>
            </div>
            <div class="navbar__inner__text">
              <a :href="navItem.subpath" class="navbar__inner__texttitle" :target="navItem.subpath && navItem.subpath.indexOf('http') > -1 ? '_blank' : '_self'">{{navItem.subtitle}}</a>
              <a :href="navItem.subpath" :target="navItem.subpath && navItem.subpath.indexOf('http') > -1 ? '_blank' : '_self'">
                <p>{{navItem.text}}</p>
              </a>
            </div>
            <div class="navbar__inner__list">
              <ul>
                <li v-for="item in navItem.children" :key="item.lmmc">
                  <a :href="item.path" v-html="item.lmmc" :target="item.path && item.path.indexOf('http') > -1 ? '_blank' : '_self'"></a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import getNavbar from '@/services/InternetPlus/index/getNavbar';
import {LMIDS} from '@/api/lmManage.js'
import { queryString } from '@/lib/publicFun.js';
export default {
  name: 'navbar',
  data() {
    return {
      navData: [],
      zpxxUUID: LMIDS.招骋信息
    }
  },
  beforeCreate() {

  },
  created() {
    this.getData();
  },
  mounted() {
  },
  methods: {
    getData() {
      getNavbar().then(res => {
        // alert(JSON.stringify(data));
        // console.log(data);
        if (res.status === 'success') {
          this.navData = res.data
        }
      })
    },
    queryStringUUID() {
      return queryString("UUID");
    }

  },
  computed: {

  },
  components: {

  }
}
</script>

<style scoped>
/**
 * 通用导航
 * css belong to navbar.vue
 * author:kxc
 * 2017-08-07
 */

.navbar {
  width: 100%;
  height: 50px;
  background: #4c4b4a;
}

.navbar__wrap {
  width: 1250px;
  height: 50px;
  margin: 0px auto;
  background: #4c4b4a;
}

.navbar__wrap ul li {
  float: left;
  width: 138px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-right: 1px solid #2a2a2a;
  position: relative;
}

.navbar__wrap ul li:first-child {
  border-left: 1px solid #2a2a2a;
}

.navbar__wrap ul li.navber_inner--many {
  width: 110px;
}

.navbar__wrap ul li.navber_inner--many_1 {
  width: 100px;
}

.navbar__wrap ul li:hover {
  background-color: #000;
}

.navbar__wrap a {
  color: #fff;
  font-size: 18px;
}

.navbar__inner {
  width: 398px;
  height: 150px;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 0px;
  top: 50px;
  z-index: 100;
  color: #fff;
}

.navbar__inner.navbar__inner--large {
  width: 520px;
}

.navbar__inner__img {
  width: 118px;
  height: 150px;
  float: left;
}

.navbar__inner__img a {
  display: block;
  margin: 38px 24px;
  width: 74px;
  height: 74px;
}

.navbar__inner__img__icon1 {
  background: url('./img/nav-yc1.png') no-repeat
}

.navbar__inner__img__icon2 {
  background: url('./img/nav-yc2.png') no-repeat
}

.navbar__inner__img__icon3 {
  background: url('./img/nav-yc3.png') no-repeat
}

.navbar__inner__img__icon4 {
  background: url('./img/nav-yc4.png') no-repeat
}

.navbar__inner__text {
  width: 160px;
  height: 150px;
  float: left;
  position: relative;
}

.navbar__inner__texttitle {
  font-size: 18px;
  position: absolute;
  left: 2px;
  top: 20px;
}

.navbar__inner__text p {
  font-size: 14px;
  position: absolute;
  left: 2px;
  top: 62px;
  line-height: 120%;
  text-align: left;
  color: #a9a5a0;
}

.navbar__inner__list {
  width: 120px;
  height: 150px;
  float: left;
}

.navbar__inner--large .navbar__inner__list {
  width: 240px;
}

.navbar__inner__list ul {
  margin: 29px 0px;
}

.navbar__inner__list ul li {
  font-size: 15px;
  width: 118px;
  height: 22px;
  line-height: 22px;
}

.navbar__inner__list ul li:hover {
  font-size: 15px;
  background: rgba(0, 0, 0, 0.6);
}

.navbar__inner__list ul li a {
  font-size: 15px;
}

.navbar__li--select {
  background: url("./img/rolw.png") no-repeat 110px 20px;
}
</style>
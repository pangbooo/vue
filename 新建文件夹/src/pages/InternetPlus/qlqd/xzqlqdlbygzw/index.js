// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from '@/InternetPlus/qlqd/xzqlqd/xzqlqdlb_ygzw.vue';
import $ from 'jquery';
import elementui from 'element-ui';
// 资源文件配置(国际化)
import VueI18n from 'vue-i18n';
import __lang from '@/config/resource';
import store from '@/store';
import 'element-ui/lib/theme-default/index.css';
import '@/lib/libImport';// 加载lib

Vue.config.productionTip = false;
Vue.use(elementui);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhCN', // set locale
  messages: __lang // set locale messages
});
/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  store,
  i18n,
  template: '<App/>',
  components: { App }
});


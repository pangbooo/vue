/**
 * vuex状态管理模块
 * 该模块主要管理用户的基本信息及用户的个性设置信息
 * 个人基本信息与个性设置信息可进行扩展
 * 前期为了阅读方便，***暂不按照模块编写***。
 * 作者：yyz
 * 2017-6-6
 */
import Vue from 'vue';
import Vuex from 'vuex';
import dev from './modules/dev';
import jsgl from './modules/jsgl';
import wzgl from './modules/wzgl';
import breadcrumb from './modules/breadcrumb.js';
Vue.use(Vuex);
// 解决IE不能访问的问题
import 'babel-polyfill';
var appdata = new Vuex.Store({
      state: {
            token: null,
            user: {
                  yhmc: '',
                  zsxm: '',
                  sjh: ''
            },
            address: [
                  '用户管理',
                  '个人中心'
            ],
            adminuser: {
                  username: ''
            },
            // 个性设置
            setting: {
                  // 是否加载过路由
                  isLoadRoutes: false,
                  fontSize: '', // 字体大小
                  rownum: 30   // 列表默认行数vue
            }
      },
      mutations: {
            setToken: (state, object) => {
                  state.token = object;
            },
            setUser: (state, object) => {
                  state.user = object;
            }
      },
      getters: {
            getUser: (state) => {
                  return state.user;
            },
            address: (state) => {
                  return state.address;
            },
            getNewFlag: (state) => {
                  return state.newFlag;
            },
            getToken: (state) => {
                  return state.token;
            }
      },
      modules: {
            dev,
            jsgl,
            wzgl,
            breadcrumb
      }
});

export default appdata;

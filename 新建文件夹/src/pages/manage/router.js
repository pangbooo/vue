/**
* 文件说明：全局路由配置文件,本路由主要配置基本的登录、主页、待办页、404、500等页面。
* 其他路由信息全部通过操作集进行动态获取。
* requiresAuth 需要进行验证
* author:yyz
* 2017-06-01
*/
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
Vue.use(Router);
const routes = {
  mode: 'history',
  base: '/manage',
  routes: [
    {
      path: '/index.html',
      component: resolve => require(['@/manage/Login.vue'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['@/manage/index.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['@/manage/Home.vue'], resolve),
          children: [
            {
              path: '/',
              component: resolve => require(['@/manage/welcome.vue'], resolve),
              meta: { bigtitle: '管理系统', childtitle: '系统首页' }
            },
            {
              path: 'yhgl',
              component: resolve => require(['@/manage/yhgl/yhglindex.vue'], resolve),
              meta: { bigtitle: '用户管理', childtitle: '用户管理' }
            },
            {
              path: 'yhgllb',
              component: resolve => require(['@/manage/yhgl/yhglAdmin.vue'], resolve),
              meta: { bigtitle: '用户管理', childtitle: '用户列表' }
            },
            {
              path: 'wyzx',
              component: resolve => require(['@/manage/wyzx.vue'], resolve),    // 我要咨询
              meta: { bigtitle: '个人中心', childtitle: '我要咨询' }
            },
            {
              path: 'hyyy',
              component: resolve => require(['@/manage/hyyy/hyyy.vue'], resolve),    // 婚姻预约
              meta: { bigtitle: '婚姻预约', childtitle: '婚姻预约' }
            },
            {
              path: 'wyts',
              component: resolve => require(['@/manage/wyts.vue'], resolve),    // 我要咨询
              meta: { bigtitle: '个人中心', childtitle: '我要投诉' }
            },
            {
              path: 'wyjy',
              component: resolve => require(['@/manage/wyjy.vue'], resolve),
              meta: { bigtitle: '个人中心', childtitle: '我要建议' }    // 建议
            },
            {
              path: 'lmgl',
              component: resolve => require(['@/manage/lmgl/lmgl.vue'], resolve),
              meta: { bigtitle: '网站管理', childtitle: '栏目管理' }
            },
            {
              path: 'wzgl',
              component: resolve => require(['@/manage/wzgl/wzgl.vue'], resolve),    // 文章管理
              meta: { bigtitle: '网站管理', childtitle: '文章管理' }
            },
            {
              path: 'tpgl',
              component: resolve => require(['@/manage/tpgl/tpgladmin.vue'], resolve),    // 文章管理
              meta: { bigtitle: '交互管理', childtitle: '投票管理' }
            },
            {
              path: 'tpflgl',
              component: resolve => require(['@/manage/tpgl/tpgltype.vue'], resolve),    // 文章管理
              meta: { bigtitle: '交互管理', childtitle: '投票分类管理' }
            },
            {
              path: 'zyzgl',
              component: resolve => require(['@/manage/zyzgl/zyzAdmin.vue'], resolve),    // 文章管理
              meta: { bigtitle: '志愿者管理', childtitle: '志愿者列表' }
            },
            {
              path: 'zrqdadmin',
              component: resolve => require(['@/manage/qdgl/zrqdadmin.vue'], resolve),    // 文章管理
              meta: { bigtitle: '清单管理', childtitle: '责任清单' }
            },
            {
              path: 'qyzcfmqdadmin',
              component: resolve => require(['@/manage/qdgl/qyzcfmqdadmin.vue'], resolve),    // 文章管理
              meta: { bigtitle: '清单管理', childtitle: '企业资产负面清单' }
            },
            {
              path: 'czzjglzxqdadmin',
              component: resolve => require(['@/manage/qdgl/czzjglzxqdadmin.vue'], resolve),    // 文章管理
              meta: { bigtitle: '清单管理', childtitle: '财政资金管理专项清单' }
            },
            {
              path: 'sxqdgl',
              component: resolve => require(['@/manage/qdgl/sxqdgladmin.vue'], resolve),    // 文章管理
              meta: { bigtitle: '清单管理', childtitle: '事项清单' }
            },
            {
              path: 'jsgl',
              component: resolve => require(['@/manage/jsgl/jsgl.vue'], resolve),    // 角色管理
              meta: { bigtitle: '权限管理', childtitle: '角色管理' }
            },
            {
              path: 'zxhfzxgl',
              component: resolve => require(['@/manage/zxgl/zxgl_zxhf.vue'], resolve),    // 咨询回复
              meta: { bigtitle: '咨询管理', childtitle: '咨询回复' }
            },
            {
              path: 'whfzxgl',
              component: resolve => require(['@/manage/zxgl/zxgl_whf.vue'], resolve),    // 咨询管理
              meta: { bigtitle: '咨询管理', childtitle: '未回复' }
            },
            {
              path: 'yhfzxgl',
              component: resolve => require(['@/manage/zxgl/zxgl_yhf.vue'], resolve),    // 咨询管理
              meta: { bigtitle: '咨询管理', childtitle: '已回复' }
            },
            {
              path: 'wcltsgl',
              component: resolve => require(['@/manage/tsgl/tsgl_wcl.vue'], resolve),    // 投诉管理
              meta: { bigtitle: '投诉管理', childtitle: '未处理' }
            },
            {
              path: 'ycltsgl',
              component: resolve => require(['@/manage/tsgl/tsgl_ycl.vue'], resolve),    // 投诉管理
              meta: { bigtitle: '投诉管理', childtitle: '已处理' }
            },
            {
              path: 'tshftsgl',
              component: resolve => require(['@/manage/zxgl/zxgl_tshf.vue'], resolve),    // 投诉管理
              meta: { bigtitle: '投诉管理', childtitle: '投诉回复' }
            },
            {
              path: 'jyhfzxgl',
              component: resolve => require(['@/manage/zxgl/zxgl_jyhf.vue'], resolve),    // 咨询管理
              meta: { bigtitle: '建议管理', childtitle: '建议回复' }
            }
          ]
        },
        {
          path: 'login',
          component: resolve => require(['@/manage/Login.vue'], resolve)
        }
      ]
    }
  ]
};

const router = new Router(routes);
// 进入中心的登录控制
/**
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/manage') > -1 && to.path.indexOf('/manage/login') < 0) {
    if (store.state.adminuser.username !== '') {
      store.commit('setbreadcrumnb_bigtitle', to.meta.bigtitle);
      store.commit('setbreadcrumnb_childtitle', to.meta.childtitle);
      next();
    } else {
      next('/manage/login/');
      return;
    }
  }
});
 */
router.beforeEach((to, from, next) => {
  // alert(localStorage.getItem('idt_App_token'));
  if (localStorage.getItem('idt_App_token')) {
    store.state.token = localStorage.getItem('idt_App_token');
  }
  if (to.path.indexOf('/') > -1 && to.path.indexOf('/login') < 0 && to.path.indexOf('/index.html') < 0) {
    if (store.state.token !== '') {
      store.commit('setbreadcrumnb_bigtitle', to.meta.bigtitle);
      store.commit('setbreadcrumnb_childtitle', to.meta.childtitle);
      next();
    } else {
      next('/index.html');
      return;
    }
  }
  if (store.state.token && to.path.indexOf('/index.html') >= 0) {
    next('/');
  }
  if (to.meta.requiresAuth) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login', query: { toredirect: to.path }
      });
    }
  } else {
    next();
  }
});
/*
// 每个页面的title设置
router.afterEach(route => {
  if (route.meta.title) {
    document.title = route.meta.title;
  }
});
*/
export default router;

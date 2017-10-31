/**
* 文件说明：全局路由配置文件,本路由主要配置基本的登录、主页、待办页、404、500等页面。
* 其他路由信息全部通过操作集进行动态获取。
* requiresAuth 需要进行验证
* author:yyz
* 2017-06-01
*/
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);
const routes = {
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: resolve => require(['../InternetPlus/index/index.vue'], resolve),
      meta: { title: '倚天互联网+政务服务' }
    }, {
      path: '/personcenter',
      component: resolve => require(['../InternetPlus/personcenter/index.vue'], resolve),
      meta: { requiresAuth: true, title: '个人中心' }
    }, {
      path: '/tzgg',
      component: resolve => require(['../InternetPlus/tzgg/index.vue'], resolve),
      meta: { title: '通知公告' }
    }, {
      path: '/tzgg_detail',
      component: resolve => require(['../InternetPlus/tzgg/detail/tzgg_detail.vue'], resolve),
      meta: { title: '通知公告详情' }
    }, {
      path: '/manage',
      component: resolve => require(['../manage/index.vue'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['../manage/Home.vue'], resolve),
          children: [
            {
              path: '/',
              component: resolve => require(['../manage/yhgl/yhglAdmin.vue'], resolve)

            },
            {
              path: 'basetable',
              component: resolve => require(['../manage/yhgl/yhglAdmin.vue'], resolve)

            },
            {
              path: 'companytable',
              component: resolve => require(['../manage/yhgl/yhglCompany.vue'], resolve)

            },
            {
              path: 'baseform',
              component: resolve => require(['../manage/BaseForm.vue'], resolve)
            },
            {
              path: 'drag',
              component: resolve => require(['../manage/DragList.vue'], resolve)    // 拖拽列表组件
            },
            {
              path: 'wyzx',
              component: resolve => require(['../manage/wyzx.vue'], resolve)    // 我要咨询
            },
            {
              path: 'hyyy',
              component: resolve => require(['../manage/hyyy.vue'], resolve)    // 婚姻预约
            },
            {
              path: 'wyts',
              component: resolve => require(['../manage/wyts.vue'], resolve)    // 我要咨询
            },
            {
              path: 'wyjy',
              component: resolve => require(['../manage/wyjy.vue'], resolve)    // 我要咨询
            },
            {
              path: 'wzgl',
              component: resolve => require(['../manage/wyjy.vue'], resolve)    // 我要咨询
            },
            {
              path: 'lmgl',
              component: resolve => require(['../manage/wyjy.vue'], resolve)    // 我要咨询
            }
          ]
        },
        {
          path: 'login',
          component: resolve => require(['../manage/Login.vue'], resolve)
        }

      ]
    }, {
      path: '/login',
      component: resolve => require(['../InternetPlus/login/index.vue'], resolve),
      meta: { title: '登录' }
    }, {
      path: '/bjgs',
      component: resolve => require(['../InternetPlus/bjgs/bjgs.vue'], resolve),
      meta: { title: '办件公示' }
    }, {
      path: '/xnjc',
      component: resolve => require(['../InternetPlus/xnjc/index.vue'], resolve),
      meta: { title: '效能监察' }
    }, {
      path: '/register',
      component: resolve => require(['../InternetPlus/register/register.vue'], resolve),
      meta: { title: '注册' }
    },
    {
      path: '/zcfg',
      component: resolve => require(['../InternetPlus/zcfg/index.vue'], resolve),
      meta: { title: '政策法规' }
    }, {
      path: '/zcfg_detail',
      component: resolve => require(['../InternetPlus/zcfg/detail/zcfg_detail.vue'], resolve),
      meta: { title: '政策法规详情' }
    }, {
      path: '/bsjd',
      component: resolve => require(['../InternetPlus/bsjd/bsjd.vue'], resolve),
      meta: { title: '办事进度' }
    },
    {
      path: '/grbsfrbs',
      component: resolve => require(['../InternetPlus/grbsfrbs/index.vue'], resolve),
      meta: { title: '个人办事-法人办事' }
    },
    {
      path: '/ygzw',
      component: resolve => require(['../InternetPlus/ygzw/index.vue'], resolve),
      meta: { title: '阳光政务' }
    },
    {
      path: '/xzqlqd',
      component: resolve => require(['../InternetPlus/xzqlqd/index.vue'], resolve),
      meta: { title: '行政权力清单' }
    },
    {
      path: '/xzqlqddetail',
      component: resolve => require(['../InternetPlus/xzqlqddetail/index.vue'], resolve),
      meta: { title: '行政权力清单' }
    },
    {
      path: '/wyzx',
      component: resolve => require(['../InternetPlus/wyzx/index.vue'], resolve),
      meta: { title: '我要咨询' }
    },
    {
      path: '/wyzxdj',
      component: resolve => require(['../InternetPlus/wyzxdj/index.vue'], resolve),
      meta: { requiresAuth: true, title: '我要咨询' }
    },
    {
      path: '/hyyydj',
      component: resolve => require(['../InternetPlus/hyyydj/index.vue'], resolve),
      meta: { requiresAuth: true, title: '结婚登记预约' }
    },
    {
      path: '/developer',
      component: resolve => require(['../InternetPlus/developer/index.vue'], resolve),
      meta: { title: '开发平台' }
    },
    {
      path: '/wyts',
      component: resolve => require(['../InternetPlus/wyts/index.vue'], resolve),
      meta: { requiresAuth: true, title: '我要投诉' }
    },
    {
      path: '/wytslb',
      component: resolve => require(['../InternetPlus/wytslb/index.vue'], resolve),
      meta: { title: '我要投诉列表' }
    },
    {
      path: '/demo',
      component: resolve => require(['../components/demo/index.vue'], resolve),
      meta: { title: '开发平台' }
    },
    {
      path: '/wyjy',
      component: resolve => require(['../InternetPlus/wyjy/index.vue'], resolve),
      meta: { requiresAuth: true, title: '我要建议' }
    },
    {
      path: '/wyjylb',
      component: resolve => require(['../InternetPlus/wyjylb/index.vue'], resolve),
      meta: { title: '我要建议列表' }
    }
  ]
};

const router = new Router(routes);
// 进入中心的登录控制
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/manage') > -1 && to.path.indexOf('/manage/login') < 0) {
    if (store.state.adminuser.username !== '') {
      next();
    } else {
      next('/manage/login/');
      return;
    }
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
// 每个页面的title设置
router.afterEach(route => {
  if (route.meta.title) {
    document.title = route.meta.title;
  }
});
export default router;

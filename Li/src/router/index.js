import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/page/index/index'], resolve)
const Login = resolve => require(['@/page/login/login'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'children',
          component: Login
        },
        {
          path: 'children2',
          component: Home
        }
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import GoodsList from './../views/GoodsList.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	{
    	path : '/',
    	name : 'GoodsList',
    	component : GoodsList
    }
  ]
})

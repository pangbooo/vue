import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import GoodsList from './../views/GoodsList'
import title from '@/views/Title'
import image from '@/views/image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/goods',
      name: 'GoodsList',
      components: {
        default : GoodsList,
        title : title,
        image : image
      },
      /*children : [
      	{path : 'title', component : title},
      	{path : 'image', component : image}
      ]*/
    },
    {
      name : 'cart',
      path : '/cart/:cartId',
      component : Cart
    }
  ]
})

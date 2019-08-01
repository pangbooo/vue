import Vue from 'vue';
import VueRouter from 'vue-router'
import TodoList from '@/components/TodoList.vue'
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', component: TodoList, name: 'TodoList' }
    ]
})
import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'
import { SET_TOKEN, SET_USER } from './config'
Vue.use(Vuex)

const moduleA = {
  state: {
    count: 0
  },
  getters: {
    getToken: (state) => {
      return state.count
    }
  },
  mutations: {
    [SET_TOKEN]: (state) => {
      state.count++
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
const moduleB = {
  state: {
    user: {
      yhmc: '',
      zsxm: '',
      sjh: ''
    }
  },
  mutations: {
    [SET_USER]: (state, object) => {
      state.user = object
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    }
  }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
export default store

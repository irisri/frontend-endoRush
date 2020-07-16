import Vue from 'vue'
import Vuex from 'vuex'
import eventoStore from './modules/eventoStore'
import userStore from './modules/userStore'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    eventoStore, 
    userStore
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'


Vue.use(Vuex)
const req = require.context('./modules', false, /\.js$/)
const Arr1 = req.keys().map(item => item.split('./')[1]).map(item => item.split('.js')[0])
const Arr2 = req.keys().map(req)
const modules = {}
Arr1.forEach((item, index) => {
  modules[item] = Arr2[index].default
})
console.log(modules);

const store = new Vuex.Store({
  modules,
  getters,
})

export default store

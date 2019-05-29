import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    printerList: [],
    version: ''
  },
  mutations: {
    changeTitle (stale, title) {
      stale.title = title
    },
    updatePrinterList (stale, printerList) {
      stale.printerList = printerList
    },
    setVersion (stale, version) {
      stale.version = version
    }
  },
  actions: {}
})

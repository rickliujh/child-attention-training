import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerTitle: '',
    printerList: [],
    version: '',
    leftDrawerOpen: false
  },
  mutations: {
    changeHeaderTitle (stale, headerTitle) {
      stale.headerTitle = headerTitle
    },
    updatePrinterList (stale, printerList) {
      stale.printerList = printerList
    },
    setVersion (stale, version) {
      stale.version = version
    },
    changeLeftDrawerOpen (stale) {
      stale.leftDrawerOpen = !stale.leftDrawerOpen
    }
  },
  actions: {}
})

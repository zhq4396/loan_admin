import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //页面标题
    pageTitle: "",
  },
  mutations: {
    modifyPageT(state, val) {
      state.pageTitle = val;
    },
  },
  actions: {},
  modules: {},
});

import { User } from '@/interface/users-interface';
import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth-module';
Vue.use(Vuex);

//seprate actions/mutations name file

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});

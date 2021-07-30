import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth-module';
import items from './modules/items-module';
import cart from './modules/cart-module';
import order from './modules/order-module';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage= new VuexPersist({
  storage:window.localStorage
})
//seprate actions/mutations name file

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    items,
    cart,
    order,
  },
  plugins:[vuexLocalStorage.plugin]
});

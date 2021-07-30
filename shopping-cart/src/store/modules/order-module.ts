// import { Order } from '@/interface/order-interface';
import uniqid from 'uniqid';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    orders: [
      {
        orderId: '',
        contactDetails: {},
        items: {},
        cardDetails: {},
        paymentMode: '',
        deliveryDate: '',
        returnValid: '',
        payment: {
          subTotal: '',
          tax: '',
          shipping: '',
          total: '',
        },
        orderStatus: false,
      },
    ],
  },

  mutations: {
    ADD_ORDER(state: any, payload: any) {
      const currentDate = new Date();
      const deliveryDate = currentDate.setDate(currentDate.getDate() + 7);
      const returnValid = currentDate.setDate(currentDate.getDate() + 15);
      const orderObject = {
        orderId: uniqid('orderId-'),
        contactDetails: payload.user,
        items: payload.items,
        cardDetails: payload.cardDetails,
        paymentMode: payload.paymentMode,
        deliveryDate: deliveryDate,
        returnValid: returnValid,
        payment: payload.payment,
        orderStatus: false,
      };
      state.orders.push(orderObject);
      // console.log(state.orders);
    },
  },
  actions: {
    addOrder(context: any, payload: any) {
      context.commit('ADD_ORDER', payload);
    },
  },
};

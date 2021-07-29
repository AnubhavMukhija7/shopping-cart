import { Order } from '@/interface/order-interface';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store= new Vuex.Store({
    state:{
        orderDetails:{
            address:{
                fullName:'',
                mobileNo:0,
                flatNo:'',
                area:'',
                landmark:'',
                city:'',
                state:'',
                country:'',
                pinCode:0,
                addressType:'',
            },
            paymentDetails:{
                paymentOption:'',
                paymentMode:'',
                card:0,
                cardType:'',
                cardExpiry:{
                    month:0,
                    year:0
                }
            },
            delieveryDate:'',
        } as Order
    }
})
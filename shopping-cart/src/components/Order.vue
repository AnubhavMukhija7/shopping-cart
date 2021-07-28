<template>
    <div id="Order">
        <div v-if="!orderPlaced">
            <Payment></Payment>
            <add-address></add-address>
            <cart-details></cart-details>
        </div>
        <div v-else>
            <p>Your order has been placed successfully</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Payment from './PaymentOptions.vue';
import Address from './Address.vue';
import {addressesType, Order} from '../interface/order-interface';
import {CartItems} from '../interface/cart-items-interace';
export default Vue.extend({
    name:'order',
    components:{
        Payment,
        'add-address': Address
        'cart-details':Cart
    },
    data(){
        return {
        userAddresses:[] as addressesType,
        paymentOptions:['debitCard','creditCard','netBanking',"UPI",'pay on Delivery'],
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
        } as Order,
        delieveryDate : '',
        paymentOptionSelected:false,
        addressSelected:false,
        }
    },
    methods:{
        paymentSelected(){
            this.paymentOptionSelected=true;
        },
        delieveryAddressSelected(){
            this.addressSelected=true;
        }
    }
})
</script>

<style>

</style>
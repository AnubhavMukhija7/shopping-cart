<template>
    <div id="Order">
        <payment></payment>
        <!--<div v-if="!paymentOptionSelected">
            <label>Select Payment Option</label>
            <div v-for="(option,index) in paymentOptions" :key="index" id="checkboxes">
                <input type = "checkbox" v-model="orderDetails.paymentDetails.paymentOption" />
                <label>{{option}}</label>
            </div>
            <button v-on="paymentSelected">Continue</button>
        </div>-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import payment from './PaymentOptions.vue';
import {addresses, order} from '../interface/order-interface';
import {CartItems} from '../interface/cart-items-interace';
export default Vue.extend({
    name:'order',
    components:{
        payment
    },
    data(){
        return {
        userAddresses:[] as addresses,
        paymentOptions:['debitCard','creditCard','netBanking',"UPI",'pay on Delivery'],
        orderDetails:{
            address:{
                fullName:'',
                mobileNo:0,
                pinCode:0,
                FlatNo:'',
                Area:'',
                landmark:'',
                town:'',
                state:'',
                country:'',
                addressType:'',
            },
            paymentDetails:{
                paymentOption:'',
            },
            delieveryDate:'',
        } as order,
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
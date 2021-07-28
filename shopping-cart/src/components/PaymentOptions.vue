<template>
    <div id="payment-details">
        <div v-if="!paymentOptionSelected">
            <label>Select Payment Option</label>
            <select v-model="paymentChoice" @change="paymentOpted">
                <option v-for="(choice,index) in paymentOptions" :key="index" >{{choice}}</option>
            </select>    
        </div>
        <div v-if="paymentOptionSelected && paymentNotCash">
            <form v-if="!submitted">
                <label>Enter Card Number</label>
                <input v-model="paymentDetails.cardNumber" required/>
                <br>
                <label>Enter Cvv</label>
                <input v-model="paymentDetails.cardCvv" required/>
                <br>
                <label>Enter Expiry Date</label>
                <input v-model="paymentDetails.cardExpiry.month" required/><p>/</p>
                <input v-model="paymentDetails.cardExpiry.year" required/>
                <br>
                <button v-on.prevent="submittedCard">Submit Card</button>
            </form>
            <div v-if="submitted">
                <p>payment details entered successfully</p>
            </div>
        </div>
        <div v-if="paymentOptionSelected && (!paymentNotCash || submitted)">
            <div id="details-entered">
                <p>payment Mode: {{paymentChoice}}</p>
                <div v-if="paymentChoice!=='COD'">
                    <p>card Number: {{paymentDetails.cardNumber}}</p>
                    <p>card Expiry: {{paymentDetails.cardExpiry.month/paymentDetails.cardExpiry.year}}</p>
                </div>
            </div>
            <button v-on="detailsEntered">Continue</button>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{
            paymentOptions:['Debit Card','Credit Card','COD'],
            paymentDetails:{
                paymentMode:'',
                cardNumber:'',
                cardCvv:0,
                cardExpiry:{
                    month:0,
                    year:0
                },
            },
            paymentChoice:'',
            paymentOptionSelected:false,
            paymentNotCash:true,
            submitted:false,
        }
    },
    methods:{
        paymentOpted(){
            // console.log('1');
            if(this.paymentChoice==='COD'){
                this.paymentNotCash= false;
                this.paymentDetails.paymentMode='COD'
            }
            else{
                this.paymentDetails.paymentMode=this.paymentChoice;
            }
            this.paymentOptionSelected=true;
        },
        submittedCard(){
            if(this.paymentDetails.cardNumber.length!==16 && this.paymentDetails.cardNumber.startsWith('0')){
                alert('enter card details again');
                this.paymentDetails.cardNumber='';
            }else if(this.paymentDetails.cardExpiry.month<7 && this.paymentDetails.cardExpiry.year<2021){
                alert('Your card has been expired Try with another card');
                this.paymentDetails.cardNumber='';
                this.paymentDetails.cardExpiry.month=0;
                this.paymentDetails.cardExpiry.year=0;
            }else{
                this.submitted=true;
                this.paymentOptionSelected=true;
                console.log(this.paymentDetails);
            }
        },
        changePaymentMethod(){
            this.paymentOptionSelected=false;
        },
        // detailsEntered(){
        //     this.$emit()
        // }
    }

})
</script>

<style>

</style>
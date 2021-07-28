<template>
    <div id="cart" class="cart-page">
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Colour</th>
                <th>Subtotal</th>
            </tr>
            <tr v-for="(product,index) from cartProducts" :key="index">
                <td><div id="prodarrayuct-name">{{product.title}}</div></td>
                <td><input type="number" v-model="product.quantity"></td>
                <td><div id = "product-colour">{{product.colour}}</div></td>
                <td><div id="product-sub-total">{{product.quantity*product.price}}</div></td>
            </tr>
        </table>
        <div id="total">
            <label> Total Price:- </label>
            <input type="text" v-model="totalPrice"/>
        </div>
        <br>
        <router-link :to="`/order`"><button >Place an Order</button></router-link>
    </div>
</template>

<script lang="ts">
import {CartItem, CartItems, productObj} from '../interface/cart-items-interace';
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{
            cartProducts: [] as CartItems,
            totalPrice : 0 as number,
        }
    },
    methods:{
        subTotalCalc(priceEach:number,quantity:number):number{
            return priceEach*quantity;
        },
        totalPriceCalc(productArray:CartItem[]):number{
            let total=0;
            productArray.forEach((product) => {
                total+=product.price*product.quantity;
            });
            return total;
        }
    },
    computed(){
        this.totalPrice=this.totalPriceCalc(this.cartProducts);
    }
});
</script>

<style>
.cart-page{
    margin: 80px auto;

}
table{
    width:100%;
    border-collapse: collapse;
}
</style>
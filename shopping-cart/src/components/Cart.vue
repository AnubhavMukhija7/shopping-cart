<template>
    <div id="cart" class="cart-page">
        <table id="product-details">
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Colour</th>
                <th>Subtotal</th>
            </tr>
            <tr v-for="product in cartProducts" :key="product.id">
                <td><div id="product-name">{{product.name}}</div></td>
                <td><input type="number" v-model="product.quantity" @input="totalPriceCalc(cartProducts)"/></td>
                <td><input type ="text" v-model="product.size"/></td>
                <td><div id = "product-colour">{{product.colour}}</div></td>
                <td><div id="product-sub-total">{{product.quantity*product.price}}</div></td>
                <td><button @click="deleteProduct(product.id)">delete this product</button></td>
            </tr>
        </table>
        <div class="total-price">
            <table>
                <tr>
                    <td>subTotal</td>
                    <td>{{subTotalPrice}}</td>
                </tr>
                <tr>
                    <td>tax:</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
        <br>
        <router-link :to="`/order`"><button >Place an Order</button></router-link>
    </div>
</template>

<script lang="ts">
import {CartItem, CartItems} from '../interface/cart-items-interace';
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{
            cartProducts: [{
                id:1,
                name:'reebok-t-shirt',
                quantity:0,
                price:450,
                size:'L',
                colour:'black',
            },{
                id:1,
                name:'reebok-lower',
                quantity:0,
                price:600,
                size:'L',
                colour:'black',
            }] as CartItems,
            subTotalPrice : 0 as number,
        }
    },
    methods:{
        subTotalCalc(priceEach:number,quantity:number):number{
            return priceEach*quantity;
        },
        totalPriceCalc(productArray:CartItem[]){
            let total=0;
            productArray.forEach((product) => {
                total+=product.price*product.quantity;
            });
            this.totalPrice=total;
        },
        deleteProduct(productId:number){
            this.cartProducts= this.cartProducts.filter((product:CartItem) => product.id!== productId);
        }
    },
    computed:{
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
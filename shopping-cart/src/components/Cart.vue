<template>
    <div id="cart" class="cart-page">
        <h2>Cart</h2>
        <table id="product-details">
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Colour</th>
                <th>Subtotal</th>
            </tr>
            <tr v-for="product in cartProducts" :key="product.id">
                <td><div id="product-name">{{product.name}}</div></td>
                <td><input type="number" v-model="product.quantity" @change="update"/></td>
                <td><input type ="text" v-model="product.size" @change="update"/></td>
                <td><div id = "product-colour">{{product.colour}}</div></td>
                <td><div id="product-sub-total">{{product.quantity*product.price.value}} {{product.price.currency}}</div></td>
                <td><button @click="deleteProduct(product.id)">delete this product</button></td>
            </tr>
        </table>
        <div class="total-price">
            <table id="price-details">
                <tr>
                    <td>subTotal</td>
                    <td>{{subTotal}}</td>
                </tr>
                <tr>
                    <td>tax:</td>
                    <td>{{taxOnCart}}</td>
                </tr>
                <tr>
                    <td>Total Cart Price</td>
                    <td>{{totalCartPrice}}</td>
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
    methods:{
        subTotalCalc(priceEach:number,quantity:number):number{
            return priceEach*quantity;
        },
        deleteProduct(productId:number){
            this.$store.dispatch('deleteProduct',productId);
        },
        update(){
            this.$store.dispatch('updateProducts',this.cartProducts);
        }
    },
    computed:{
        cartProducts(){
            return this.$store.state.cart.cartItems;
        },
        subTotal(){
            return this.$store.state.cart.subTotalPrice;
        },
        taxOnCart(){
            return this.$store.state.cart.tax;
        },
        totalCartPrice(){
            return this.$store.state.cart.totalPrice;
        }
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
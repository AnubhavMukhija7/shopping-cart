<template>
    <div id="cart" class="cart-page">
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
                <td><div id="product-sub-total">{{product.quantity*product.price}}</div></td>
                <td><button @click="deleteProduct(product.id)">delete this product</button></td>
            </tr>
        </table>
        <div class="total-price">
            <table id="price-details">
                <tr>
                    <td>subTotal</td>
                    <td>{{subTotalPrice}}</td>
                </tr>
                <tr>
                    <td>tax:</td>
                    <td>{{tax}}</td>
                </tr>
                <tr>
                    <td>Total Cart Price</td>
                    <td>{{totalPrice}}</td>
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
            cartProducts: [] as CartItems,
        }
    },
    methods:{
        getCartDetails(){
            this.cartProducts = this.$store.state.cart.cartItems;
            console.log(this.cartProducts);
        },
        subTotalCalc(priceEach:number,quantity:number):number{
            return priceEach*quantity;
        },
        totalPriceCalc(productArray:CartItem[],){
                let total=0;
                productArray.forEach((product) => {
                    if(product.quantity>0){
                        total+=product.price*product.quantity;
                    }else{
                        alert('enter the quantity in positive value');
                        product.quantity=1;
                    }
                });
                this.subTotalPrice=total;
                this.tax = Number((12/100)*total);
                this.totalPrice = this.subTotalPrice+this.tax;
        },
        deleteProduct(productId:number){
            this.cartProducts= this.cartProducts.filter((product:CartItem) => product.id!== productId);
        },
        update(){
            this.$store.dispatch('updateProducts',this.cartProducts)
        }
    },
    created(){
        this.getCartDetails();
    },
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
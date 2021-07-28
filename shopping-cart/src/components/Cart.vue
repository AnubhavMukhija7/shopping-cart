<template>
    <div id="cart" class="cart-page">
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
            <tr v-for="">
                <td><div id="Product-name">{{}}</div></td>
                <td><input type="number" value="1"></td>
                <td></td>

            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import {Items} from '../interface/items-interface';
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{
            cartitems:[] as Items
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
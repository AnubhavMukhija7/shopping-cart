<template>
  <div id="cart" class="cart-page">
    <h2>Cart</h2>
    <br />
    <div v-if="cartProducts.length < 1">
      <p>You have no items in your cart</p>
      <p>Add Items to cart first</p>
      <router-link to="/items">Go To Home</router-link>
    </div>
    <div v-else>
      <table id="product-details">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Size</th>
          <th>Color</th>
          <th>Subtotal</th>
          <th>Remove from cart</th>
        </tr>
        <tr v-for="product in cartProducts" :key="product.id">
          <td>
            <div id="product-name">{{ product.title }}</div>
          </td>
          <td>
            <input
              type="number"
              v-model="product.quantitySelected"
              @change="update"
            />
          </td>
          <td>
            <select v-model="product.sizeSelected" @change="update">
              <option
                v-for="(size, index) in product.sizes"
                :value="size"
                :key="index"
              >
                {{ size }}
              </option>
            </select>
          </td>
          <td>
            <select v-model="product.colorSelected" @change="update">
              <option
                v-for="(color, index) in product.color"
                :value="color"
                :key="index"
              >
                {{ color }}
              </option>
            </select>
            <div id="product-colour">{{ product.colour }}</div>
          </td>
          <td>
            <div id="product-sub-total">
              {{ product.price.currency }}
              {{ product.subTotalPrice }}
            </div>
          </td>
          <td>
            <button @click="deleteProduct(product.id)">Remove</button>
          </td>
        </tr>
      </table>
      <div class="total-price">
        <table id="price-details">
          <tr>
            <td>SubTotal</td>
            <td>{{ subTotal }}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>{{ taxOnCart }}</td>
          </tr>
          <tr>
            <td>Total Cart Price</td>
            <td>{{ totalCartPrice }}</td>
          </tr>
        </table>
      </div>
      <br />
      <router-link :to="`/order`"><button>Place an Order</button></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { CartItem, CartItems } from '../interface/cart-items-interace';
import Vue from 'vue';
export default Vue.extend({
  methods: {
    subTotalCalc(priceEach: number, quantity: number): number {
      return priceEach * quantity;
    },
    deleteProduct(productId: number) {
      this.$store.dispatch('deleteItem', productId);
    },
    update() {
      this.$store.dispatch('updateItem', this.cartProducts);
    },
  },
  computed: {
    cartProducts() {
      return this.$store.state.cart.cartItems;
    },
    subTotal() {
      return this.$store.state.cart.subTotalPrice;
    },
    taxOnCart() {
      return this.$store.state.cart.tax;
    },
    totalCartPrice() {
      return this.$store.state.cart.totalPrice;
    },
  },
});
</script>

<style>
.cart-page {
  margin: 80px auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
</style>

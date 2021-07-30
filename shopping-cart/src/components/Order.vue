<template>
  <div class="container">
    <h1>Orders</h1>

    <div v-if="previousOrders.length > 0 && cartProducts.length < 1">
      Here is a summary of your previous products
      <div v-for="(order, index) in previousOrders" :key="index">
        <p>{{ order.orderId }}</p>
        <p></p>
      </div>
    </div>

    <div v-if="previousOrders.length < 1 && cartProducts.length < 1">
      <p>You have no items in your cart and no previous orders</p>
      <p>Add Items to cart first</p>
      <router-link to="/items">Go To Home</router-link>
    </div>

    <div v-if="orderStatus">Your order has been places successfully</div>

    <div v-if="cartProducts.length > 0 && !orderStatus">
      <div class="title">
        <h2>Product Order Form</h2>
      </div>
      <div class="d-flex">
        <form v-if="selectPaymentMethod !== 'debit'" action="" method="">
          <label>
            <span class="fname">First Name </span>
            <input v-model="user.firstName" type="text" name="fname" />
          </label>
          <label>
            <span class="lname">Last Name </span>
            <input v-model="user.lastName" type="text" name="lname" />
          </label>
          <label>
            <span>Country</span>
            <input v-model="user.country" type="text" name="selection" />
          </label>
          <label>
            <span>Street Address </span>
            <input v-model="user.addressOne" type="text" name="houseadd" />
          </label>
          <label>
            <span>&nbsp;</span>
            <input
              type="text"
              v-model="user.addressTwo"
              name="apartment"
              placeholder="Optional"
            />
          </label>
          <label>
            <span> City </span>
            <input v-model="user.city" type="text" name="city" />
          </label>
          <label>
            <span>State </span>
            <input v-model="user.state" type="text" name="city" />
          </label>
          <label>
            <span>Postcode / ZIP </span>
            <input v-model="user.pinCode" type="text" name="city" />
          </label>
          <label>
            <span>Phone </span>
            <input v-model="user.phone" type="tel" name="city" />
          </label>
          <label>
            <span>Email Address </span>
            <input v-model="user.email" type="email" name="city" />
          </label>
          <div v-if="userErrors">
            <ol>
              <li v-for="(userError, index) in userErrors" :key="index">
                {{ userError }}
              </li>
            </ol>
          </div>
        </form>
        <form v-else>
          <label>
            <span class="fname">Name on Card</span>
            <input v-model="card.name" type="text" />
          </label>
          <label>
            <span class="lname">Card number </span>
            <input v-model="card.number" type="text" />
          </label>
          <label>
            <span>Exp Month </span>
            <select v-model="card.expMonth">
              <option :value="0">Choose Month</option>
              <option
                v-for="(month, index) in months"
                :value="month"
                :key="index"
              >
                {{ month }}
              </option>
            </select>
          </label>
          <label>
            <span>Exp Year </span>
            <select v-model="card.expYear">
              <option :value="0">Choose Year</option>
              <option
                v-for="(year, index) in cardYearOptions"
                :value="year"
                :key="index"
              >
                {{ year }}
              </option>
            </select>
          </label>
          <label>
            <span>CVV </span>
            <input v-model="card.cvv" type="text" />
          </label>
          <div v-if="cardErrors">
            <ol>
              <li v-for="(cardError, index) in cardErrors" :key="index">
                {{ cardError }}
              </li>
            </ol>
          </div>
        </form>
        <div class="Yorder">
          <table>
            <tr>
              <th colspan="2">Payment</th>
            </tr>
            <tr v-for="(item, index) in cartProducts" :key="index">
              <td>{{ item.title }} x {{ item.quantitySelected }}(Qty)</td>
              <td>₹{{ item.subTotalPrice }}</td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>₹{{ subTotal }}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>₹{{ taxOnCart }}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>₹{{ shipping }}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>₹{{ totalCartPrice }}</td>
            </tr>
          </table>
          <br />
          <div>
            <input
              type="radio"
              name="dbt"
              value="cod"
              @click="onChange($event)"
            />
            Cash on Delivery
          </div>
          <div>
            <input
              type="radio"
              name="dbt"
              value="debit"
              @change="onChange($event)"
            />
            Card
            <img
              src="https://www.logolynx.com/images/logolynx/c3/c36093ca9fb6c250f74d319550acac4d.jpeg"
              alt=""
              width="50"
            />
          </div>
          <button type="button" @click="placeOrder">Place Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { User } from '../interface/users-interface';
import { monthsArray } from '../assets/constants/months';
import { validateUser } from '../utils/validateUser';
export default Vue.extend({
  name: 'order',
  data() {
    return {
      selectPaymentMethod: '',
      cardYearOptions: [],
      months: monthsArray,
      card: {
        name: '',
        number: '',
        expMonth: '0',
        expYear: '0',
        cvv: '',
      },
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pinCode: '',
        state: '',
        city: '',
        addressTwo: '',
        addressOne: '',
        country: '',
      },
      userErrors: [],
      cardErrors: [],
      orderStatus: false,
      previousOrdersState: [],
    };
  },
  methods: {
    onChange(event) {
      this.selectPaymentMethod = event.target.value;
    },
    checkPaymentSelected() {
      if (this.selectPaymentMethod === '') {
        this.userErrors.push('Enter Payment Mode');
        return false;
      }
      return true;
    },
    async placeOrder() {
      this.userErrors = validateUser(this.user);
      if (this.userErrors.length > 0) {
        return;
      }
      const isPaymentSelected = this.checkPaymentSelected();
      if (!isPaymentSelected) {
        return;
      }

      if (this.selectPaymentMethod !== 'cod') {
        this.cardErrors = this.validateCardDetails(this.card);
        if (this.cardErrors.length > 0) {
          return;
        }
      }
      if (this.cardErrors.length === 0 && this.userErrors.length === 0) {
        const req = {
          user: this.user,
          paymentMode: this.selectPaymentMethod,
          cardDetails: this.card,
          items: this.cartProducts,
          payment: {
            subTotal: this.subTotal,
            tax: this.taxOnCart,
            shipping: this.shipping,
            total: this.totalCartPrice,
          },
        };
        await this.$store.dispatch('addOrder', req);
        await this.$store.dispatch('clearCart');
        this.orderStatus = true;
      }
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
    shipping() {
      return this.$store.state.auth.user.prime ? 0 : 50;
    },
    totalCartPrice() {
      const tax = this.$store.state.auth.user.prime ? 0 : 50;
      return tax + this.$store.state.cart.totalPrice;
    },
    previousOrders() {
      return this.$store.state.order.orders;
    },
  },
  beforeMount() {
    const authUser: User = this.$store.state.auth.user;
    this.user.firstName = authUser.firstName;
    this.user.addressOne = authUser.addressOne;
    this.user.addressTwo = authUser.addressTwo;
    this.user.lastName = authUser.lastName;
    this.user.email = authUser.email;
    this.user.phone = authUser.phoneNumber;
    this.user.city = authUser.city;
    this.user.state = authUser.state;
    this.user.pinCode = authUser.pinCode;
    this.user.country = authUser.country;
    let year = new Date().getFullYear();
    for (let i = year; i < year + 10; i++) {
      this.cardYearOptions.push(i);
    }
    this.previousOrdersState = this.previousOrders;
  },
});
</script>

<style scoped lang="css">
@import '../assets/css/order.css';
</style>
>

<template>
  <div class="container">
    <h1>Orders</h1>

    <div v-if="previousOrders.length > 0">
      Here is a summary of your previous products
      <div v-for="(order, index) in previousOrders" :key="index">
        <p>{{ order.orderId }}</p>
        <p>{{ order.orderId }}</p>
        <p></p>
      </div>
    </div>

    <!-- 
    <div v-if="previousOrders.length < 0 && cartProducts.length < 0">
      <p>You have no items in your cart</p>
      <p>Add Items to cart first</p>
      <router-link to="/items">Go To Home</router-link>
    </div> -->

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
import validator from 'validator';
export default Vue.extend({
  name: 'order',
  data() {
    return {
      selectPaymentMethod: '',
      cardYearOptions: [],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
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
    checkUserValidations() {
      let isUserValid = true;
      if (this.user.firstName === '') {
        this.userErrors.push('Enter First Name');
        isUserValid = false;
      }
      if (this.user.lastName === '') {
        this.userErrors.push('Enter Last Name');
        isUserValid = false;
      }
      if (this.user.email === '') {
        this.userErrors.push('Enter Email');
        isUserValid = false;
      }
      if (this.user.email !== '' && !validator.isEmail(this.user.email)) {
        this.userErrors.push(' valid email');
        isUserValid = false;
      }
      if (this.user.phone === '') {
        this.userErrors.push('Enter Phone');
        isUserValid = false;
      }
      if (this.user.pinCode === '') {
        this.userErrors.push('Enter PinCode');
        isUserValid = false;
      }
      if (this.user.state === '') {
        this.userErrors.push('Enter State');
        isUserValid = false;
      }
      if (this.user.city === '') {
        this.userErrors.push('Enter City');
        isUserValid = false;
      }
      if (this.user.addressOne === '') {
        this.userErrors.push('Enter Address One');
        isUserValid = false;
      }
      if (this.user.country === '') {
        this.userErrors.push('Enter Country');
        isUserValid = false;
      }
      return isUserValid;
    },
    checkPaymentSelected() {
      if (this.selectPaymentMethod === '') {
        this.userErrors.push('Enter Payment Mode');
        return false;
      }
      return true;
    },
    checkPaymentDetails() {
      if (this.card.name === '') {
        this.cardErrors.push('Enter Name');
      }
      if (this.card.number === '') {
        this.cardErrors.push('Enter card');
      }
      if (
        !validator.isCreditCard(this.card.number) &&
        this.card.number !== ''
      ) {
        this.cardErrors.push('Enter valid card number');
      }
      if (this.card.expMonth === '0') {
        this.cardErrors.push('Enter Month');
      }
      if (this.card.expYear === '0') {
        this.cardErrors.push('Enter Year');
      }
      if (this.card.cvv.length !== 3 || isNaN(this.card.cvv)) {
        this.cardErrors.push('Enter valid cvv');
      }
      return true;
    },
    async placeOrder() {
      this.userErrors = [];
      this.cardErrors = [];
      const isUserValid = this.checkUserValidations();
      if (!isUserValid) {
        return;
      }
      const isPaymentSelected = this.checkPaymentSelected();
      if (!isPaymentSelected) {
        return;
      }
      if (this.selectPaymentMethod !== 'cod') {
        const isPaymentDetailsValid = this.checkPaymentDetails();
        if (!isPaymentDetailsValid) {
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

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700');
body {
  background: url('http://all4desktop.com/data_images/original/4236532-background-images.jpg');
  font-family: 'Roboto Condensed', sans-serif;
  color: #262626;
  margin: 5% 0;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
.d-flex {
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
  border-radius: 0 0 5px 5px;
  padding: 25px;
}
form {
  flex: 4;
}
.Yorder {
  flex: 2;
}
.title {
  background: (
    linear,
    left top,
    right bottom,
    color-stop(0, #5195a8),
    color-stop(100, #70eaff)
  );
  background: -moz-linear-gradient(top left, #5195a8 0%, #70eaff 100%);
  background: -ms-linear-gradient(top left, #5195a8 0%, #70eaff 100%);
  background: -o-linear-gradient(top left, #5195a8 0%, #70eaff 100%);
  background: linear-gradient(to bottom right, #5195a8 0%, #70eaff 100%);
  border-radius: 5px 5px 0 0;
  padding: 20px;
  color: #f6f6f6;
}
h2 {
  margin: 0;
  padding-left: 15px;
}
.required {
  color: red;
}
label,
table {
  display: block;
  margin: 15px;
}
label > span {
  float: left;
  width: 25%;
  margin-top: 12px;
  padding-right: 10px;
}
input[type='text'],
input[type='tel'],
input[type='email'],
select {
  width: 70%;
  height: 30px;
  padding: 5px 10px;
  margin-bottom: 10px;
  border: 1px solid #dadada;
  color: #888;
}
select {
  width: 72%;
  height: 45px;
  padding: 5px 10px;
  margin-bottom: 10px;
}
.Yorder {
  margin-top: 15px;
  height: 600px;
  padding: 20px;
  border: 1px solid #dadada;
}
table {
  margin: 0;
  padding: 0;
}
th {
  border-bottom: 1px solid #dadada;
  padding: 10px 0;
}
tr > td:nth-child(1) {
  text-align: left;
  color: #2d2d2a;
}
tr > td:nth-child(2) {
  text-align: right;
  color: #52ad9c;
}
td {
  border-bottom: 1px solid #dadada;
  padding: 25px 25px 25px 0;
}

p {
  display: block;
  color: #888;
  margin: 0;
  padding-left: 25px;
}
.Yorder > div {
  padding: 15px 0;
}

button {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  background: #52ad9c;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
button:hover {
  cursor: pointer;
  background: #428a7d;
}
</style>

<template>
  <div>
    <div>
      <h1>Items are :</h1>
      <div class="filters">
        <h2>Input is <input /></h2>
        <div class="sort-by">
          <p>Sort By:</p>
          <select>
            <option>Highest to Lowest</option>
          </select>
        </div>
      </div>
      <ul class="item-container" v-if="items.length > 0">
        <li v-for="(item, index) in items" :key="index">
          <section class="product">
            <div class="product__photo">
              <div class="photo-container">
                <div class="photo-main">
                  <img
                    src="https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png"
                    alt="green apple slice"
                  />
                </div>
              </div>
            </div>
            <div class="product__info">
              <div class="title">
                <h1 style="margin: 10px">{{ item.title }}</h1>
                <div style="margin: 10px" class="description">
                  <p>{{ item.description }}</p>
                </div>
              </div>
              <div style="margin: 10px" class="price">
                {{ item.price.value }} {{ item.price.currency }}
              </div>
              <div class="variant">
                <h4>SELECT A COLOR</h4>
                <ul class="color">
                  <li>Red</li>
                  <li>Green</li>
                </ul>
              </div>
              <button class="buy--btn">ADD TO CART</button>
            </div>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Items } from '../interface/items-interface';
export default Vue.extend({
  data() {
    return {
      items: [] as Items,
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      await this.$store.dispatch('getItems');
      const itemsState = this.$store.state.items;
      this.items = itemsState.items;
    },
  },
});
</script>

<style>
.item-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  margin: auto 20px;
}
.filters {
  display: flex;
  justify-content: space-between;
  margin: 20px 100px;
}
.sort-by {
  display: flex;
  gap: 20px;
  align-items: center;
}
.item-container li {
  list-style-type: none;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 10px;
}
.color {
  display: flex;
  justify-content: center;
}
.color li {
  border: none;
}
.buy--btn {
  padding: 1.5em 3.1em;
  margin: 20px auto;
  border: none;
  border-radius: 7px;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 1.3px;
  color: #fff;
  background-color: black;
  box-shadow: 2px 2px 25px -7px grey;
  cursor: pointer;
}
.buy--btn:active {
  transform: scale(0.97);
}
input {
  font-size: 18px;
}
</style>

<template>
  <div>
    <div>
      <h1>Items are :</h1>
      <div class="filters">
        <h2>Input is <input v-model="search" @keyup="getItems" /></h2>
        <div class="sort-by">
          <p>Sort By:</p>
          <select @change="getItems" v-model="sortBy">
            <option
              v-for="(optionValue, index) in sortByList"
              :value="index"
              :key="index"
            >
              {{ optionValue }}
            </option>
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHw5sRAd60tt5YzCW7fHlQfKpXhXJtjOy28Q&usqp=CAU"
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
                {{ item.price.currency }} {{ item.price.value }}
              </div>
              <div class="variant">
                <h4>SELECT A COLOR</h4>
                <ul class="color">
                  <li
                    v-for="(color, index) in item.color"
                    @click="colorSelected = color"
                    :key="index"
                  >
                    {{ color }}
                  </li>
                </ul>
              </div>
              <div class="variant">
                <h4>SELECT SIZE</h4>
                <ul class="sizes">
                  <li
                    v-for="(size, index) in item.sizes"
                    @click="sizeSelected = size"
                    :key="index"
                  >
                    {{ size }}
                  </li>
                </ul>
              </div>
              <div v-if="errors.length > 0 && itemSelected === item.id">
                <div v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </div>
              </div>
              <div v-if="item.availability">
                <button @click="addCartHandler(item)" class="buy--btn">
                  ADD TO CART
                </button>
              </div>
              <div v-if="!item.availability">
                <button disabled class="buy--btn">OUT OF STOCK</button>
              </div>
            </div>
          </section>
        </li>
      </ul>
      <div v-if="items.length < 1">
        <h1>Record Not Found</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Item, Items } from '../interface/items-interface';
import { GetItemsRequest } from '../services/get-items-service';
export default Vue.extend({
  data() {
    return {
      items: [] as Items,
      sortBy: 0,
      search: '',
      sizeSelected: '',
      colorSelected: '',
      itemSelected: 0,
      sortByList: ['None', 'Highest to Lowest', 'Lowest to Highest'],
      errors: [],
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      const req: GetItemsRequest = {
        search: this.search,
        sortBy: this.sortBy,
      };
      await this.$store.dispatch('getItems', req);
      const itemsState = this.$store.state.items;
      this.items = itemsState.items;
    },
    async addCartHandler(item: Item) {
      this.errors = [];
      this.itemSelected = item.id;
      const req = {
        ...item,
        sizeSelected: this.sizeSelected,
        quantitySelected: 1,
        colorSelected: this.colorSelected,
      };
      if (this.sizeSelected === '') this.errors.push('Select Size');
      if (this.colorSelected === '') this.errors.push('Select Color');
      if (this.errors.length === 0) {
        await this.$store.dispatch('addItem', req);
        await this.$store.dispatch('getAmount');
        this.$router.push('/cart');
      }
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
.photo-main {
  display: block;
  width: 100%;
  height: auto;
  background-color: rgb(255, 255, 255);
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
.color li:hover {
  color: rgb(213, 210, 243);
  background: rgb(20, 1, 71);
}
.sizes {
  display: flex;
  justify-content: center;
}
.sizes li {
  border: none;
}
.sizes li:hover {
  color: rgb(213, 210, 243);
  background: rgb(20, 1, 71);
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

<template>
  <div>
    <div v-if="!invalidUser">
      <div>
        <h3>Hi {{ user }}</h3>
      </div>
      <h1>Items are :</h1>
      <div class="filters">
        <h2>Input is <input v-model="search" @keyup="getItems" /></h2>
        <div v-if="filterButton">
          <button @click="applyFilter">apply Filters</button>
        </div>
        <div id="filters" v-if="filterActive" class="filter-by">
          <p>Filter By:</p>
          <div v-for="(filterValue, index) in filterByList" :key="index">
            <input
              type="checkbox"
              v-model="appliedFilters"
              :id="'filter' + filterValue"
              :value="filterValue"
            /><label>{{ filterValue }}</label>
          </div>
          <button type="submit" @click="getItems">Apply</button>
        </div>
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
                    alt="product"
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
                <div id="successful"></div>
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
    <div v-if="invalidUser">
      <p>Please login first to check the items</p>
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
      user: '',
      invalidUser: true,
      items: [] as Items,
      sortBy: 0,
      search: '',
      filterActive: false,
      filterButton: true,
      appliedFilters: [],
      sizeSelected: '',
      colorSelected: '',
      itemSelected: 0,
      sortByList: ['Default', 'Highest to Lowest', 'Lowest to Highest'],
      filterByList: [
        'Include Out of Stock',
        'Male Products',
        'Female Products',
      ],
      errors: [],
    };
  },
  created() {
    if (this.$store.state.auth.user.userName) {
      this.user = this.$store.state.auth.user.firstName;
      this.invalidUser = false;
      this.getItems();
    } else {
      this.invalidUser = true;
    }
  },
  methods: {
    async getItems() {
      const req: GetItemsRequest = {
        search: this.search,
        sortBy: this.sortBy,
        filterBy: this.appliedFilters,
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
        let cartItems = this.$store.state.cart.cartItems;
        let itemCheck = 0;
        if (cartItems) {
          cartItems.forEach((addedItems: Item) => {
            if (addedItems.id === req.id) {
              itemCheck = 1;
              alert('this item is already in cart');
            }
          });
        }
        if (itemCheck != 1) {
          await this.$store.dispatch('addItem', req);
          await this.$store.dispatch('getAmount');
          alert('Item added successfully');
        }
      }
    },
    applyFilter() {
      this.filterActive = true;
      this.filterButton = false;
    },
  },
});
</script>

<style scoped lang="css">
@import '../assets/css/items.css';
</style>

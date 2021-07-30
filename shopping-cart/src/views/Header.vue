<template>
  <nav>
    <ul>
      <li><router-link :to="{name:'Items'}" exact>Explore Items</router-link></li>
      <li><router-link :to="{name:'Cart'}" exact>Go To Cart</router-link></li>
      <li><router-link :to="{name:'Order'}" exact>Your Orders</router-link></li>
      <li><button @click="logout">LogOut</button></li>
    </ul>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods:{
    logout(){
      this.$store.dispatch('clearState');
      this.$router.replace('/');
    }
  }

})
</script>
<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
}
nav {
  background: #444;
  padding: 14px 0;
  margin-bottom: 40px;
}
.router-link-active {
  background: #eee;
  color: #444;
}
</style>

<template>
  <div id="app">
    <show-header></show-header>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
    <show-footer></show-footer>
  </div>
</template>

<script lang="ts">
import header from './views/Header.vue';
import footer from './views/Footer.vue';
import Vue from 'vue'
export default Vue.extend({
  components:{
    'show-header':header,
    'show-footer' : footer
  }
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

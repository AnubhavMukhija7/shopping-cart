<template>
  <div class="login-root">
    <div
      class="box-root flex-flex flex-direction--column"
      style="min-height: 100vh; flex-grow: 1"
    >
      <div class="loginbackground box-background--white padding-top--64">
        <div class="loginbackground-gridContainer">
          <div
            class="box-root flex-flex"
            style="grid-area: top / start / 8 / end"
          >
            <div
              class="box-root"
              style="
                background-image: linear-gradient(
                  white 0%,
                  rgb(247, 250, 252) 33%
                );
                flex-grow: 1;
              "
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 2 / auto / 5">
            <div
              class="
                box-root
                box-divider--light-all-2
                animationLeftRight
                tans3s
              "
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 6 / start / auto / 2"
          >
            <div
              class="box-root box-background--blue800"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 7 / start / auto / 4"
          >
            <div
              class="box-root box-background--blue animationLeftRight"
              style="flex-grow: 1"
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 8 / 4 / auto / 6">
            <div
              class="box-root box-background--gray100 animationLeftRight tans3s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 2 / 15 / auto / end"
          >
            <div
              class="box-root box-background--cyan200 animationRightLeft tans4s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 3 / 14 / auto / end"
          >
            <div
              class="box-root box-background--blue animationRightLeft"
              style="flex-grow: 1"
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 17 / auto / 20">
            <div
              class="box-root box-background--gray100 animationRightLeft tans4s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 5 / 14 / auto / 17">
            <div
              class="
                box-root
                box-divider--light-all-2
                animationRightLeft
                tans3s
              "
              style="flex-grow: 1"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="box-root padding-top--24 flex-flex flex-direction--column"
        style="flex-grow: 1; z-index: 9"
      >
        <div
          class="
            box-root
            padding-top--48
            padding-bottom--24
            flex-flex
            flex-justifyContent--center
          "
        >
          <h1>Shopping Cart</h1>
        </div>
        <div class="formbg-outer">
          <div class="formbg">
            <div class="formbg-inner padding-horizontal--48">
              <span class="padding-bottom--15">Sign in to your account</span>
              <form id="stripe-login" @submit.prevent="loginHandler">
                <div class="field padding-bottom--24">
                  <label>Username</label>
                  <input v-model="username" />
                </div>

                <div class="field padding-bottom--24">
                  <label>Password</label>
                  <input type="password" v-model="password" />
                </div>
                <div class="field padding-bottom--24">
                  <input type="submit" name="submit" value="Login" />
                </div>
              </form>
              <div v-if="errors.length > 0">
                <div
                  class="
                    field field-checkbox
                    padding-bottom--24
                    flex-flex
                    align-center
                  "
                  v-for="(error, index) in errors"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GetUserRequest } from '../services/get-user-service';

export default Vue.extend({
  name: 'auth',
  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },
  methods: {
    async loginHandler() {
      this.errors = [];
      this.username = this.username.trim();
      if (this.username && this.password) {
        const req: GetUserRequest = {
          username: this.username.trim(),
          password: this.password.trim(),
        };
        await this.$store.dispatch('authUser', req);
        const authState = this.$store.state.auth;
        if (authState.message === 'Error') {
          this.errors = [];
          this.errors.push('Invalid Credentials');
        } else {
          this.$router.push({path:'items'});
        }
      } else {
        if (!this.username) this.errors.push('Username required');
        if (!this.password) this.errors.push('Password required');
      }
    },
  },
  beforeCreate(){
    if(this.$store.state.auth.user.userName){
        this.$router.replace('/items')
        console.log(this.$store.state.auth.user);
      }
  },
  created() {
    window.onpopstate = () => {
      if (this.$store.state.auth.user!=null && this.$route.path == '/') {
        this.$router.push({path:'items'});
      }
    };
  },
});
</script>

<style scoped lang="css">
@import '../assets/css/login.css';
</style>

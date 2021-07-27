<template>
    <div>
        <h2>Log In</h2>
        <form @submit.prevent ="loginHandler">
            <input v-model="username" placeholder="User Name" />
            <br/>
            <input v-model="password" type="password" placeholder="Password" />
            <br/>
            <button type=""> Login </button>
        </form>
    </div>
</template>

<script>
import {GetUserRequest} from '../services/get-user-service'
export default {
    name:'auth',
    data(){
        return{
            username: '',
            password: '',
        }
    },
    methods:{
        loginHandler() { 
            //GetUserRequest can't define here why?  Wasted half hour because of this ASKK
            const req = {
                username: this.username.trim(),
                password: this.password,
            }
            //why is it not taking type ?
            this.$store.dispatch('authUser' , req)

            //can't get state see how ---------------------------------???? Continue from here
            console.log(this.$store.state.user)
            // this.$router.push('/login')
        }
    }
}
</script>

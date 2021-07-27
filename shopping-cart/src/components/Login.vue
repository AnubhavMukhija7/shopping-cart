<template>
    <div>
        <h2>Log In</h2>
        <form @submit.prevent ="loginHandler">
            <input v-model="userName" placeholder="User Name" />
            <br/>
            <input v-model="password" type="password" placeholder="Password" />
            <br/>
            <button type=""> Login </button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userName: '',
            password: '',
        }
    },
    methods:{
        loginHandler() { 
            const req = {
                userName:this.userName,
                password:this.password
            }
            console.log(req)
        }
    }
}
</script>

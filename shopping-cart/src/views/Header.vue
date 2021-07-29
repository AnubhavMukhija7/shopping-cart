<template>
    <nav>
        <ul>
            <li><router-link to="/" exact>Logout</router-link>
            <li><router-link to="/order" exact>Your Orders</router-link></li>
            <li><router-link to="/items" exact>Explore Items</router-link></li>
            <li><router-link to="/cart" exact>Go To Cart</router-link></li>
        </ul>
    </nav>
</template>
<style scoped>
ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
}
li{
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
nav{
    background: #444;
    padding: 14px 0;
    margin-bottom: 40px;
}
.router-link-active{
    background: #eee;
    color: #444;
}
</style>
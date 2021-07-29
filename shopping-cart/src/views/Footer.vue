<template>
    <nav>
        <ul>
            <li><router-link to="/about" exact>About Us</router-link></li>
            <li><router-link to="/terms" exact>Terms and Conditions</router-link></li>
        </ul>
    </nav>
</template>

<style>
    ul{
    list-style-type: none;
    text-align: left;
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
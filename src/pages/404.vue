<template>
        <div class="container">
        <h2>Oops! Page not found.</h2>
        <h1>404</h1>
        <p>We can't find the page you're looking for.</p>
        <a href="http://139.9.54.32/">Go back home</a>
    </div>

</template>

<script setup lang="ts">
// import { onMounted } from 'vue
</script>

<style  scoped>
    .container {
        background-image: linear-gradient(125deg, #6a89cc, #b8e994);
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        position: absolute;
        text-align: center;
        /* transform: translateY(-50%); */
        color: #343434;
    }
    .container::before{
        content: '';
        margin-bottom: 20vh;
    }
    .container h1 {
        font-size: 160px;
        margin: 0;
        font-weight: 800;
        letter-spacing: 20px;
    }

    .container a {
        display: inline-block;
        text-decoration: none;
        background: #e55039aa;
        color: #fff;
        padding: 12px 24px;
        border-radius: 25px;
        text-transform: uppercase;
    }
    .container a:hover{
        background: #e55039;
    }
</style>
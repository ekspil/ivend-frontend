<template>
    <div class="page-main">
        <Header/>
        <Navbar/>
        <router-view/>
    </div>
</template>
<script>
    import Navbar from './Navbar'
    import Header from './Header'
    import VueRouter from 'vue-router'

    export default {
        components: {Header, Navbar, VueRouter}
    }

</script>

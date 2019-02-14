<template>
    <div class="page-main">
        <Header/>
        <Navbar/>
        <router-view/>
    </div>
</template>
<script>
    import Navbar from './components/Navbar'
    import Header from './components/Header'
    import VueRouter from 'vue-router'

    export default {
        components: {Header, Navbar, VueRouter}
    }

</script>

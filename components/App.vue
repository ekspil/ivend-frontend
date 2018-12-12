<template>
    <div id="vue_app">
        <Header/>
        <Navbar/>
        <Controllers/>
    </div>
</template>
<script>

    import Header from './Header.vue'
    import Navbar from './Navbar.vue'
    import Controllers from './Controllers.vue'

    export default {
        components: {Header, Navbar, Controllers}
    }
</script>
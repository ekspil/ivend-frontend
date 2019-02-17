<template>
    <div class="page-main">
        <div>
            <Header/>
            <Navbar/>
        </div>

        <router-view/>
    </div>
</template>
<script>
    import Navbar from './components/Navbar'
    import Header from './components/Header'

    export default {
        components: {Header, Navbar}
    }

</script>

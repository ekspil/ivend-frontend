<template>
    <div class="page-main">
        <div v-if="!['login', 'register', 'remember', 'NewPassword', 'sms'].includes($route.path.split('/')[1])">
            <Header/>
            <Navbar/>
        </div>

        <router-view/>

        <Footer class="disabled-small"/>
    </div>
</template>
<script>
    import Navbar from './components/Navbar';
    import Header from './components/Header';
    import Footer from './components/Footer';

    export default {
        components: {Header, Navbar, Footer}
    }

</script>

<style scoped lang="scss">
    .page-main {
        padding-bottom: 75px;
    }
</style>

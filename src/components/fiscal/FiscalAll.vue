<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <div class="card-title f-b">Фискализация</div>
                        </div>

                        <Tabs :tabs="tabs" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tabs from '@/modules/Tabs';
    import Kkts from './modules/KktsAll';


    export default {
        name: 'Settings',
        components: { Tabs },
        data: () => ({
            tabs: [
                { name: 'Фискальные аппараты', component: Kkts, route: 'kktsAll' }
            ]
        })
    }
</script>
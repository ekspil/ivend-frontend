<template>
    <div class="container">
        <div class="side-app max-w-1200">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <div class="card-title f-b">Техническая поддержка</div>
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
    import Instructions from './modules/Instructions';
    import Information from './modules/Information';
    import Chat from './modules/Chat';


    export default {
        name: 'Settings',
        components: { Tabs },
        data: () => ({
            tabs: [
                { name: 'Информация', component: Information, route: 'Information' },
                { name: 'Инструкции', component: Instructions, route: 'Instructions' },
                { name: 'Связь со специалистом', component: Chat, route: 'Chat' },
        ]
        })
    }
</script>
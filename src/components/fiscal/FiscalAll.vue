<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <div class="card-title f-b">Панель администратора</div>
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
    import Users from './modules/UsersAll';
    import Controllers from './modules/ControllersAll';
    import News from './modules/NewsAll';


    export default {
        name: 'Settings',
        components: { Tabs },
        data: () => ({
            tabs: [
                { name: 'Фискальные аппараты', component: Kkts, route: 'kktsAll' },
                { name: 'Пользователи', component: Users, route: 'usersAll' },
                { name: 'Контроллеры', component: Controllers, route: 'controllersAll' },
                { name: 'Текстовые записи', component: News, route: 'newsAll' }
            ]
        })
    }
</script>
<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <div class="card-title f-b">Панель администратора</div>
                          <div class="card-title-right f-b" v-if="statistic && $route.fullPath.includes('usersAll')">Сумма списаний <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.billingAmount }}</span> руб. &nbsp &nbsp Баланс <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.billingBalance }}</span> руб. &nbsp &nbsp Долг <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.billingCredit }}</span> руб.</div>
                          <div class="card-title-right f-b" v-if="statistic && $route.fullPath.includes('controllersAll')">Контроллеров всего <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.controllersCount }}</span> шт. &nbsp &nbsp Не работают <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.controllersDisabled }}</span> шт. &nbsp &nbsp Нет связи <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.controllersDisconnected }}</span> шт.</div>
                          <div class="card-title-right f-b" v-if="statistic && $route.fullPath.includes('kktsAll')">Касс всего <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.kktsCount }}</span> шт. &nbsp &nbsp Работает <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.kktsNormal }}</span> шт. &nbsp &nbsp Не работает <span :class="{'style-green': statistic.informationStatus, 'style-red': !statistic.informationStatus}">{{ statistic.kktsError }}</span> шт.</div>

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
    import Partners from './modules/Partners';
    import gql from "graphql-tag";


    export default {
        name: 'Settings',
        components: { Tabs },
        data: () => ({
            tabs: [
                { name: 'Пользователи', component: Users, route: 'usersAll' },
                { name: 'Контроллеры', component: Controllers, route: 'controllersAll' },
                { name: 'Кассы', component: Kkts, route: 'kktsAll' },
                { name: 'Информация', component: News, route: 'newsAll' },
                { name: 'Партнеры', component: Partners, route: 'partners' },
            ]
        })
                { name: 'Информация', component: News, route: 'newsAll' }
            ],
          statistic: null
        }),
      apollo: {
        statistic: {
          query: gql`
                    query {
                      getAdminStatistic {
                            billingAmount
                            billingBalance
                            billingCredit

                            controllersCount
                            controllersDisabled
                            controllersDisconnected

                            kktsCount
                            kktsNormal
                            kktsError

                            informationStatus

                             }
                    }
                `,
          update (data) {
            return data.getAdminStatistic;
          }
        }
      },
    }
</script>
<style>

.style-green {
  color: #3ddabd
}

.style-red {
  color: #da5c3d
}

</style>
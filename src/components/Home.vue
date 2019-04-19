<template>
    <div class="container">
        <div class="side-app">
            <div class="page-header">
                <h4 class="page-title">Рабочий стол</h4>
            </div>

            <div class="row">
                <div class="col-sm-12 col-lg-4">
                    <router-link to="/stats#sales">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-gradient rounded-circle text-white">
                                    <i class="fas fa-users text-white"></i>
                                </div>
                            </div>

                            <transition name="fade">
                                <div v-if="!$apollo.loading">
                                    <h3 class="mb-1 text-primary counter font-30">{{ getOverallSalesCount }}</h3>
                                    <div class="f-b">Продаж сегодня</div><br/>
                                </div>
                            </transition>
                        </div>
                        <div class="card-chart-bg" v-if="false">
                            <div id="chart-bg-users-1"></div>
                        </div>
                    </div>
                    </router-link>
                </div>

                <div class="col-sm-12 col-lg-4">
                    <router-link to="/stats">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-gradient rounded-circle text-white">
                                    <i class="fas fa-ruble-sign text-white"></i>
                                </div>
                            </div>

                            <transition name="fade">
                                <div v-if="!$apollo.loading">
                                    <h3 class="mb-1  text-primary font-30"><span class="counter">{{ getOverallSalesSummary }}</span></h3>
                                    <div class="f-b">Выручка сегодня</div><br/>
                                </div>
                            </transition>
                        </div>
                        <div class="card-chart-bg" v-if="false">
                            <div id="chart-bg-users-4"></div>
                        </div>
                    </div>
                    </router-link>

                </div>

                <div class="col-sm-12 col-lg-4">
                    <router-link to="/settings#machines">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-gradient rounded-circle text-white">
                                    <i class="far fa-hdd text-white"></i>
                                </div>
                            </div>

                            <transition name="fade">
                                <div v-if="!$apollo.loading">
                                    <h3 class="mb-1  text-primary counter font-30">{{ data.machines.length }}</h3>
                                    <div class="f-b">{{ getWordEnding(data.machines.length, 'Автомат') }}</div><br/>
                                    <router-link to="/machines/add" class="f-b" v-if="false">Добавить контроллер</router-link>
                                </div>
                            </transition>
                            <br v-if="false" />

                        </div>
                        <div class="card-chart-bg" v-if="false">
                        </div>
                    </div>
                    </router-link>
                </div>


                <div class="col-sm-12 col-lg-3" v-if="false">
                    <div class="card bg-gradient">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-white rounded-circle text-white">
                                    <i class="fas fa-check text-primary"></i>
                                </div>
                            </div>
                            <div class="f-b pb-2"><i class="fas fa-check text-white mr-1"></i> Контроллеры</div>
                            <div class="f-b pb-2"><i class="fas fa-check text-white mr-1"></i> Шина MDB</div>
                            <div class="f-b pb-2"><i class="fas fa-check text-white mr-1"></i> Другие ошибки</div><br/>
                        </div>
                        <div class="card-chart-bg" style=" height: 35px; ">
                        </div>
                    </div>
                </div>


            </div>

            <!--
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title f-b">График продаж</h3>
                        </div>
                        <div class="card-body">
                            <canvas id="team-chart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title f-b">График выручки</h3>
                        </div>
                        <div class="card-body">
                            <canvas id="sales-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            -->

            <div class="row" v-if="false">

                <div class="col-lg-6 col-md-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <h3 class="card-title f-b">Топ продаж </h3>
                        </div>
                        <div class="card-body">
                            <div class="current-progress">
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Стаканчик</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient" style="width: 45%">45%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Капучино</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient" style="width: 25%">25%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Мокачино</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient" style="width: 15%">15%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Эспрессо</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient" style="width: 8%">8%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress-content">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <div class="progress-text">Американо</div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="current-progressbar">
                                                <div class="progress progress-md">
                                                    <div class="progress-bar bg-gradient" style="width: 7%">7%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <h2 class="card-title f-b">Мониторинг</h2>
                        </div>
                        <table class="table card-table">
                            <tbody>
                            <tr>
                                <td>10000003-1217</td>
                                <td class="text-right">
                                    <span class="badge badge-primary">Ок</span>
                                </td>
                            </tr>

                            <tr>
                                <td>10000003-1217</td>
                                <td class="text-right">
                                    <span class="badge badge-primary">Ок</span>
                                </td>
                            </tr>
                            <tr>
                                <td>10000003-1217</td>
                                <td class="text-right">
                                    <span class="badge badge-primary">Ок</span>
                                </td>
                            </tr>
                            <tr>
                                <td>10000003-1217</td>
                                <td class="text-right">
                                    <span class="badge badge-primary">Ок</span>
                                </td>
                            </tr>
                            <tr>
                                <td>10000003-1217</td>
                                <td class="text-right">
                                    <span class="badge badge-danger">Ошибка MDB</span>
                                </td>
                            </tr>
                            <tr>
                                <td>10000003-1217</td>
                                <td class="text-right">
                                    <span class="badge badge-primary">Ок</span>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="row mg-t-20">
                <div class="col-12 grid-margin">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <h3 class="card-title f-b">Новости ivend</h3>
                        </div>
                        <div class="card-body">
                            <div class="fluid-container">
                                <div class="row ticket-card  pb-2 border-bottom pb-3 mb-3">
                                    <div class="ticket-details col-md-12">
                                        <p class="mb-2 mr-2 text-muted">16.03.2019</p>

                                        <div class="d-flex">
                                            <p class="text-black f-b mr-2 mb-2 no-wrap">Бюджетная фискализация</p>
                                        </div>
                                        <p class="text-black mb-2">Компания IVEND предлагает услуги в сфере электронного вендинга.
                                            Благодаря разработанным решениям фискализации и модернизации торговых автоматов, клиенты
                                            компании могут отвечать стандартам современности, становиться гибкими, адаптивными и удобными для потребителя.
                                        </p>

                                        <p class="text-black mb-2">Уменьшить расходы при фискализации вендинговой сети – это главная задача
                                            компании «Интернет вендинг», и для этого компания реализовала четыре варианта фискализации
                                            торговых автоматов, среди которых можно выбрать лучшие экономические решения под нужды
                                            и возможности каждой компании.
                                        </p>

                                        <p class="text-black mb-2">О разных вариантах фискализации и о многих других возможностях по модернизации
                                            ваших торговых автоматов с помощью Универсального Вендингового Контроллера iVend, Вы узнаете,
                                            посетив стенд C502 на выставке VendExpo 2018.
                                        </p>


                                    </div>

                                </div>
                                <div class="row ticket-card  pb-2 border-bottom pb-3 mb-3">
                                    <div class="ticket-details col-md-12">
                                        <p class="mb-2 mr-2 text-muted">24.02.2019</p>

                                        <div class="d-flex">
                                            <p class="text-black f-b mr-2 mb-2 no-wrap">«Фискализируем даже слона!»</p>
                                        </div>
                                        <p class="text-black mb-2">Компания iVend – это производитель контроллера фискализации для любых видов импульсных автоматов.
                                            Контроллер можно установить в разменные автоматы, аттракционы - качалки, кран - машины, массажные кресла, автомойки
                                            самообслуживания и многие другие устройства. </p>

                                        <p class="text-black mb-2">Система iVend Pulse состоит из трех составляющих: контроллер в автомате, личный кабинет в
                                            Интернете, онлайн касса в облаке. Система решает сразу четыре задачи: мониторинг автоматов, статистика продаж,
                                            фискализация продаж, эквайринг платежей. С 1 июля 2019 года по 54-ФЗ ко всем автоматам, включая импульсные, должны
                                            быть подключены онлайн кассы, а с 1 февраля 2020 года автоматы будут обязаны отображать QR коды: iVend полностью
                                            соответствует 54-ФЗ и уже имеет готовые дисплеи QR кода.
                                        </p>


                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import gql from 'graphql-tag';

    import { getWordEnding } from '@/utils';

    const MILLISECONDS_IN_DAY = 86400000;
    export default {
        name: 'Home',
        data: () => ({
            data: null
        }),
        apollo: {
            data: {
                query: gql`
                    query ($period: Period) {
                        getMachines {
                            id
                        }

                        getProfile {
                            items {
                                salesSummary (period: $period) {
                                    salesCount
                                    overallAmount
                                }
                            }
                        }
                    }
                `,
                variables: {
                  period: {
                    from: Date.now() - MILLISECONDS_IN_DAY,
                    to: Date.now()
                  }
                },
                update: data => ({
                    machines: data.getMachines,
                    items: data.getProfile.items
                })
            }
        },
        computed: {
            getOverallSalesSummary () {
                  return this.data.items.reduce((acc, item) => {
                      return acc + item.salesSummary.overallAmount;
                  }, 0);
            },
            getOverallSalesCount () {
                  return this.data.items.reduce((acc, item) => {
                      return acc + item.salesSummary.salesCount;
                  }, 0);
            }
        },
        methods: {
            getWordEnding (number, word) { return getWordEnding(number, word); }
        }
    }
</script>

<template>
    <div class="container">
        <div class="side-app max-w-1200">
            <div class="page-header">
<!--                <h4 class="page-title">Рабочий стол</h4>-->
            </div>

            <div class="row">
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
                                    <div v-if="data.fastSummary" class="row">
                                        <h3 class="mb-1  text-primary font-30 col-5"><span class="counter">{{ data.fastSummary.amountToday }}</span></h3>
                                        <div class="f-b col">Выручка сегодня</div><br/>
                                        <div class="w-100"></div>
                                        <h3 class="mb-1  text-primary font-30 col-5"><span class="counter">{{ data.fastSummary.amountYesterday }}</span></h3>
                                        <div class="f-b col">Выручка вчера</div><br/>
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
                    <router-link to="/stats#sales">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-gradient rounded-circle text-white">
                                    <i class="fas fa-users text-white"></i>
                                </div>
                            </div>

                            <transition name="fade">
                                <div v-if="data.fastSummary" class="row">
                                    <h3 class="mb-1 text-primary counter font-30 col-5">{{ data.fastSummary.countToday }}</h3>
                                    <div class="f-b col">Продаж сегодня</div><br/>
                                    <div class="w-100"></div>
                                    <h3 class="mb-1 text-primary counter font-30 col-5">{{ data.fastSummary.countYesterday }}</h3>
                                    <div class="f-b col">Продаж вчера</div><br/>
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
                    <router-link to="/monitoring#events">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-gradient rounded-circle text-white">
                                    <i class="far fa-hdd text-white"></i>
                                </div>
                            </div>

                            <transition name="fade">
                                <div v-if="data.machines" class="row">
                                    <h3 class="mb-1  text-primary counter font-30 col-5">{{ data.machines.length }}</h3>
                                    <div class="f-b col">{{ "Автоматов подключено" }}</div><br/>
                                    <div class="w-100"></div>
                                    <h3 class="mb-1  text-warning counter font-30 col-5">{{ data.machines.filter(m => m.error !== "OK").length }}</h3>
                                    <div class="f-b text-warning col">{{ 'Автоматов неисправно' }}</div><br/>


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

            <News :data="{...data, title: 'Новости'}"></News>
        </div>
    </div>
</template>


<script>
    import gql from 'graphql-tag';

    import { getWordEnding } from '@/utils';
    import News from '@/modules/News'

    export default {
        name: 'Home',
        components: {News},
        data: () => ({
            data: {},
            period: "День",
            queryPeriod: null,
        }),
        apollo: {
            data: {
                query: gql`
                    query {
                        getMachines {
                            id
                            error
                        }

                        getProfile {
                            fastSummary {
                                amountToday
                                amountYesterday
                                countToday
                                countYesterday
                            }
                        }

                        getNews {

                            date
                            text
                            link
                            header
                            active
                            }


                    }
                `,
                update: (data) => {
                    function compare(a, b) {
                        let dateA = a.date.split(/[\s|,.!\-#]+/)
                        dateA.reverse()
                        let dateB = b.date.split(/[\s|,.!\-#]+/)
                        dateB.reverse()
                        dateA.join('.')
                        dateB.join('.')
                        if (dateA > dateB) return -1; // если первое значение больше второго
                        if (dateA == dateB) return 0; // если равны
                        if (dateA < dateB) return 1; // если первое значение меньше второго
                    }
                    return {
                        machines: data.getMachines,
                        fastSummary: data.getProfile.fastSummary,
                        news: data.getNews.sort(compare)
                    }
                }
            }
        },
        beforeMount(){
            this.queryPeriod = this.newPeriod()
            this.queryPeriodY = {}
            this.queryPeriodY.to = this.queryPeriod.from
            this.queryPeriodY.from = this.queryPeriodY.to - 86400000
        },
    mounted () {

        setInterval(() => {
            let date;
            let periodNew;
            switch (this.period) {
                case 'Всего': return 0;
                case 'Месяц':
                    date = new Date();
                    date.setMonth(date.getMonth() - 1);
                    periodNew = {
                        from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                        to: Date.now()
                    };
                    break;
                case 'Неделя':
                    date = new Date();
                    date.setDate(date.getDate() - 7);
                    periodNew = {
                        from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                        to: Date.now()
                    };

                    break;

                case 'День':
                    date = new Date();
                    periodNew = {
                        from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                        to: Date.now()
                    };

                    break;

                default: periodNew = {
                    from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : 0,
                    to: this.calendar.to instanceof Date ? this.calendar.to.getTime() : Date.now()
                };
            }
            this.queryPeriod = periodNew;
        }, 61234)
    },
        methods: {
            getWordEnding (number, word) { return getWordEnding(number, word); },
            newPeriod: function(){

                let date;
                let periodNew;
                switch (this.period) {
                    case 'Всего': return 0;
                    case 'Месяц':
                        date = new Date();
                        date.setMonth(date.getMonth() - 1);
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };
                        break;
                    case 'Неделя':
                        date = new Date();
                        date.setDate(date.getDate() - 7);
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };

                        break;

                    case 'День':
                        date = new Date();
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };

                        break;

                    default: periodNew = {
                        from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : 0,
                        to: this.calendar.to instanceof Date ? this.calendar.to.getTime() : Date.now()
                    };
                }
                return periodNew

            },
        }
    }
</script>

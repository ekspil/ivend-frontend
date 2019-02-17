<template>
    <div class="container">
        <div class="side-app">
            <button @click="$store.commit('auth/setToken', null)">Снести токен</button>
            <div class="page-header">
                <h4 class="page-title">Рабочий стол</h4>

            </div>

            <div class="row">
                <div class="col-sm-12 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-gradient rounded-circle text-white">
                                    <i class="fas fa-users text-white"></i>
                                </div>
                            </div>
                            <h3 class="mb-1 text-primary counter font-30">678</h3>
                            <div class="f-b">Продаж сегодня</div>
                        </div>
                        <div class="card-chart-bg">
                            <div id="chart-bg-users-1"></div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-gradient rounded-circle text-white">
                                    <i class="fas fa-ruble-sign text-white"></i>
                                </div>
                            </div>
                            <h3 class="mb-1  text-primary font-30"><span class="counter">12435</span></h3>
                            <div class="f-b">Выручка сегодня</div>
                        </div>
                        <div class="card-chart-bg">
                            <div id="chart-bg-users-4"></div>
                        </div>
                    </div>

                </div>

                <div class="col-sm-12 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-gradient rounded-circle text-white">
                                    <i class="far fa-hdd text-white"></i>
                                </div>
                            </div>
                            <h3 class="mb-1  text-primary counter font-30">4</h3>
                            <div class="f-b">Контроллера</div>
                        </div>
                        <div class="card-chart-bg">
                        </div>
                    </div>
                </div>


                <div class="col-sm-12 col-lg-3">
                    <div class="card bg-gradient">
                        <div class="card-body">
                            <div class="card-value float-right text-purple">
                                <div class="icon icon-shape bg-white rounded-circle text-white">
                                    <i class="fas fa-check text-primary"></i>
                                </div>
                            </div>
                            <div class="f-b pb-2"><i class="fas fa-check text-white mr-1"></i> Контроллеры</div>
                            <div class="f-b pb-2"><i class="fas fa-check text-white mr-1"></i> Шина MDB</div>
                            <div class="f-b pb-2"><i class="fas fa-check text-white mr-1"></i> Другие ошибки</div>
                        </div>
                        <div class="card-chart-bg" style=" height: 35px; ">
                        </div>
                    </div>
                </div>


            </div>

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

            <div class="row">

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
                                        <p class="mb-0 mr-2 text-muted">19.09.2018</p>

                                        <div class="d-flex">
                                            <p class="text-black f-b mr-2 mb-0 no-wrap">Новый функционал в кабинете
                                                вендора</p>
                                        </div>
                                        <p class="text-black mb-2">Donec rutrum congue leo eget malesuada. Quisque velit
                                            nisi, pretium ut lacinia in, elementum id enim vivamus.</p>


                                    </div>

                                </div>
                                <div class="row ticket-card  pb-2 border-bottom pb-3 mb-3">
                                    <div class="ticket-details col-md-12">
                                        <p class="mb-0 mr-2 text-muted">19.09.2018</p>

                                        <div class="d-flex">
                                            <p class="text-black f-b mr-2 mb-0 no-wrap">Новый функционал в кабинете
                                                вендора</p>
                                        </div>
                                        <p class="text-black mb-2">Donec rutrum congue leo eget malesuada. Quisque velit
                                            nisi, pretium ut lacinia in, elementum id enim vivamus.</p>


                                    </div>

                                </div>
                                <div class="row ticket-card  pb-2 border-bottom pb-3 mb-3">
                                    <div class="ticket-details col-md-12">
                                        <p class="mb-0 mr-2 text-muted">19.09.2018</p>

                                        <div class="d-flex">
                                            <p class="text-black f-b mr-2 mb-0 no-wrap">Новый функционал в кабинете
                                                вендора</p>
                                        </div>
                                        <p class="text-black mb-2">Donec rutrum congue leo eget malesuada. Quisque velit
                                            nisi, pretium ut lacinia in, elementum id enim vivamus.</p>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <!--footer-->
        <footer class="footer">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
                        © 2018 <a href="#">ivend</a>. Все права защищены.
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer-->
    </div>
</template>


<script>
    import gql from 'graphql-tag'

    export default {
        apollo: {
            controllers:
                gql`
                    query {
                      getControllers {
                        uid
                        mode
                      }
                    }
                `,
        },
    }
</script>

<template>
    <header class="app-header header shadow-none relative">
        <particles/>
        <div class="container">

            <div id="canvas" class="gradient"></div>

            <div class="container-fluid">
                <div class="d-flex">
                    <router-link class="header-brand" to="/home">
                        <img alt="iVend" class="header-brand-img" src="/assets/images/brand/logo.png">
                    </router-link>
                    <div class="d-flex order-lg-2 ml-auto">
                        <div class="dropdown d-none d-md-flex" v-if="true">
                            <span class="ml-2 d-none d-lg-block"  style=" padding:15px"  v-if="user && user.legalInfo">
                                <span class="text-black f-b">Телефон: {{ user.legalInfo.contactPhone | prettify }}</span>
                            </span>
                        </div></div>


                    <div class="d-flex order-lg-2 ml-auto">
                        <div class="dropdown d-none d-md-flex" v-if="false">
                            <a class="nav-link icon" data-toggle="dropdown">
                                <i class="fas fa-bell"></i>
                                <span class="nav-unread bg-dark"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <a class="dropdown-item d-flex pb-3" href="#">
                                    <div class="notifyimg">
                                        <i class="fas fa-hdd"></i>
                                    </div>
                                    <div>
                                        <strong>Подключен новый контроллер</strong>
                                        <div class="small text-muted">
                                            3 часа назад
                                        </div>
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex pb-3" href="#">
                                    <div class="notifyimg bg-danger">
                                        <i class="fas fa-exclamation"></i>
                                    </div>
                                    <div>
                                        <strong>Обнаружена ошибка контроллера</strong>
                                        <div class="small text-muted">
                                            Вчера
                                        </div>
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex pb-3" href="#">
                                    <div class="notifyimg">
                                        <i class="fas fa-wallet"></i>
                                    </div>
                                    <div>
                                        <strong>Баланс пополнен</strong>
                                        <div class="small text-muted">
                                            3 дня назад
                                        </div>
                                    </div>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item text-center text-muted-dark" href="#">Все события</a>
                            </div>
                        </div>
                        <div class="dropdown">
                            <a class="nav-link pr-0 leading-none d-flex" data-toggle="dropdown" href="#">
                                    <span class="avatar avatar-md brround"
                                          style="background-image: url(/assets/images/faces/female/25.jpg)"></span>
                                <span class="ml-2 d-none d-lg-block" v-if="user && user.phone">
												<span class="text-black f-b">{{ user.phone | prettify }}</span>
											</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <a class="dropdown-item" href="#"><i
                                        class="dropdown-icon mdi mdi-account-outline"></i> Профиль</a>
                                <a class="dropdown-item" href="#"><i class="dropdown-icon mdi mdi-settings"></i>
                                    Настройки</a>
                                <div class="dropdown-divider"></div>
                                <a @click.prevent="exit" class="dropdown-item" href="#"><i
                                        class="dropdown-icon mdi mdi-logout-variant"></i> Выйти</a>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse"
                       data-target="#headerMenuCollapse">
                        <span class="header-toggler-icon"></span>
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import gql from 'graphql-tag';

    import particles from '@/components/particles';


    import { prettifyPhone } from '@/utils';

    export default {
        name: 'Header',
        components: {
            particles
        },
        apollo: {
            user: {
                query: gql`
                    query {
                        user: getProfile {
                            phone
                            legalInfo {
                                contactPhone
                            }
                        }
                    }
                `,

                update: data => data.user
            }
        },
        methods: {
            exit () {
                let phone = null
                if(this.$store.state.auth.remember){
                    phone = this.$store.state.auth.phone
                }
                this.$store.commit('auth/setToken', {token:null, remember: false, phone});
                this.$store.commit('user/clear');
                this.$router.push('/login');
            }
        },
        filters: {
            prettify (phone) {
                return prettifyPhone(phone);
            }
        }
    }
</script>

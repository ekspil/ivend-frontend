<template>
    <header class="app-header header shadow-none relative">
        <particles/>
        <div class="container">

            <div id="canvas" class="gradient"></div>

            <div class="container-fluid">
                <div class="d-flex">
                    <router-link class="header-brand" to="/home">
                        <img alt="iVend" class="header-brand-img" :src="logo">
                    </router-link>
                    <div class="d-flex order-lg-2 ml-auto">
                        <div class="dropdown d-none d-md-flex" v-if="true">
                            <span v-if="user && infoPhonePartner" class="ml-2 d-none d-lg-block"  style=" padding:15px"  >
                                <span class="text-black f-b">Телефон: {{{phone: infoPhonePartner, countryCode: user.countryCode} | prettifyObj }}</span>
                            </span>
                            <span v-if="user && !infoPhonePartner" class="ml-2 d-none d-lg-block"  style=" padding:15px"  >
                                <span class="text-black f-b">Техподдержка: {{{phone: infoPhoneTech, countryCode: user.countryCode} | prettifyObj }}</span>
                            </span>
                            <span v-if="user && !infoPhonePartner" class="ml-2 d-none d-lg-block"  style=" padding:15px"  >
                                <span class="text-black f-b">Продажи: {{{phone: infoPhoneCom, countryCode: user.countryCode} | prettifyObj }}</span>
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
                        <div v-if="user" class="dropdown" >
                            <a class="nav-link pr-0 leading-none d-flex" data-toggle="dropdown" href="#">
                                    <span class="avatar avatar-md brround"
                                          style="background-image: url(/assets/images/faces/female/25.jpg)"></span>
                                <span class="ml-2 d-none d-lg-block" v-if="user && user.phone">
												<span class="text-black f-b">{{ {phone: user.phone, countryCode: user.countryCode} | prettifyObj }}</span>
											</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <a class="dropdown-item" href="#"><i
                                        class="dropdown-icon mdi mdi-account-outline"></i> Профиль</a>
                                <a v-if="user.role === 'ADMIN'" class="dropdown-item" href="#" @click.prevent="$router.push('/directory')"><i class="dropdown-icon mdi mdi-settings"></i>
                                    Настройки справочников</a>
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
      beforeMount() {
          if(this.$store.state.user.partnerInfo && this.$store.state.user.partnerInfo.fileLogo){
            this.logo = `/api/v1/files/file/${this.$store.state.user.partnerInfo.partnerId}/${this.$store.state.user.partnerInfo.fileLogo}`
          }
          if(this.$store.state.user.partnerInfo && this.$store.state.user.partnerInfo.infoPhoneCom){
            this.infoPhonePartner = this.$store.state.user.partnerInfo.infoPhoneCom
          }
      },
      data: ()=>({
          logo: "/assets/images/brand/logo.png",
          infoPhonePartner: false,
          infoPhoneCom: "9313288159",
          infoPhoneTech: "9523813141",
        }),
        apollo: {
            user: {
                query: gql`
                    query {
                        user: getProfile {
                            phone
                            role
                            countryCode
                            legalInfo {
                               timeZone
                            }

                        }
                    }
                `,

                update(data){

                  let timeZone = 3

                  if(data.user.legalInfo && data.user.legalInfo.timeZone ){
                    timeZone = Number(data.user.legalInfo.timeZone)
                  }
                  this.$store.commit('user/setTimeZone', timeZone);


                  return data.user
                }
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
            },
            prettifyObj ({phone, countryCode}) {
                return prettifyPhone(phone, countryCode);
            }
        }
    }
</script>

<template>
    <div class="ren-navbar" id="headerMenuCollapse">
        <div class="container">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :class="['nav-link', isDisabled('/home')]" to="/home" activeClass="active" :event="isDisabled('/home') ? '' : 'click'">
                        <i class="fas fa-home"></i>
                        Главная
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/monitoring" :class="['nav-link', isDisabled('/monitoring')]" activeClass="active" :event="isDisabled('/monitoring') ? '' : 'click'">
                        <i class="fas fa-desktop"></i> <span>Мониторинг</span>
                    </router-link>

                    <!-- Removed -->
                    <div class="sub-item" v-if="false">
                        <ul>
                            <li>
                                <router-link to="/monitoring">Рабочие</router-link>
                            </li>
                            <li>
                                <router-link to="/monitoring">Неисправные</router-link>
                            </li>
                        </ul>
                    </div>
                    <!-- ------- -->
                </li>

                <li class="nav-item">
                    <router-link to="/stats" :class="['nav-link', isDisabled('/stats')]" activeClass="active" :event="isDisabled('/stats') ? '' : 'click'">
                        <i class="fas fa-chart-bar"></i> <span>Статистика</span>
                    </router-link>
                </li>

                <!-- Removed -->
                <li class="nav-item with-sub" v-if="false">
                    <a class="nav-link" href="#"><i class="fas fa-cog"></i> <span>Обслуживание</span></a>

                    <div class="sub-item" v-if="false">
                        <ul>
                            <li>
                                <a href="#">Товар</a>
                            </li>
                            <li>
                                <a href="#">Наличные</a>
                            </li>
                            <li>
                                <a href="#">Ремонт</a>
                            </li>
                            <li>
                                <a href="#">Установка</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item with-sub" v-if="false">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="fas fa-hdd"></i> <span>Оборудование</span>
                    </a>

                    <div class="sub-item">
                        <ul>
                            <li>
                                <a href="#" v-if="false">Группы</a>
                            </li>
                            <li>
                                <a href="#" v-if="false">Автоматы</a>
                            </li>
                            <li>
                                <router-link to="/controllers">Контроллеры</router-link>
                            </li>
                            <li>
                                <a href="#" v-if="false">Уведомления</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <!-- ------ -->

                <li class="nav-item">
                    <router-link :class="['nav-link', isDisabled('/settings')]" to="/settings" activeClass="active" :event="isDisabled('/settings') ? '' : 'click'">
                        <i class="fas fa-sliders-h"></i> <span>Настройки</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :class="['nav-link', isDisabled('/billing')]" to="/billing" activeClass="active" :event="isDisabled('/billing') ? '' : 'click'">
                        <i class="fas fa-money-check"></i> <span>Оплата</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :class="['nav-link', isDisabled('/tp')]" to="/tp" activeClass="active" :event="isDisabled('/tp') ? '' : 'click'">
                        <i class="fas fa-money-check"></i> <span>Техподдержка</span>
                    </router-link>
                </li>
                <li class="nav-item" v-if="false">
                    <router-link to="/fiscal" :class="['nav-link', isDisabled('/fiscal')]" activeClass="active" :event="isDisabled('/fiscal') ? '' : 'click'"><i class="fas fa-hdd"></i> <span>Фискализация</span></router-link>
                </li>
                <li class="nav-item" v-if="isAdmin()">
                    <router-link to="/fiscalAll" :class="['nav-link', isDisabled('/fiscalAll')]" activeClass="active" :event="isDisabled('/fiscalAll') ? '' : 'click'"><i class="fas fa-hdd"></i> <span>Администратор</span></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import gql from 'graphql-tag';
    export default {
        name: 'Navbar',

        apollo: {
            user: {
                query: gql`
                    query {
                        user: getProfile {
                              billing {
                                       balance,

                                       }
                                      }
                    }
                `,

                update: data => data.user
            }
        },

        data: () => ({
            user: {
                billing: {
                    balance: 1
                }
            },
            role: null
        }),
        methods: {
            isDisabled (link) {
                if(Number(this.user?.billing?.balance) < -100 && this.$store.state.user?.profile?.role !== "ADMIN"){
                    this.role = 'VENDOR_NEGATIVE_BALANCE'
                    if(!['/billing', '/settings', '/tp'].includes(link)){
                        this.$router.push('/billing')
                    }
                }else{
                    this.role = this.$store.state.user?.profile?.role;
                }
                const role = this.role

                switch (role) {
                    case 'VENDOR_NEGATIVE_BALANCE': return !['/billing', '/settings', '/tp'].includes(link)  && 'disabled';
                    case 'VENDOR_NO_LEGAL_INFO': return !['/billing', '/settings', '/tp'].includes(link) && 'disabled';

                    case 'VENDOR_NOT_CONFIRMED': return true && 'disabled';
                    case 'VENDOR':
                    default:
                        return false;
                }
            },
            isAdmin () {
                if (this.$store.state.user?.profile?.role == 'ADMIN'){
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav-link.disabled {
        color: #666666;
        cursor: not-allowed;

        &:hover, &:focus {
            background: transparent;
            color: #666666;
        }
    }
</style>

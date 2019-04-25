<template>
    <div class="ren-navbar" id="headerMenuCollapse">
        <div class="container">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :class="['nav-link', isActive('/home'), isDisabled('/home')]" to="/home">
                        <i class="fas fa-home"></i>
                        Главная
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/monitoring" :class="['nav-link', isActive('/monitoring'), isDisabled('/monitoring')]">
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
                    <router-link to="/stats" :class="['nav-link', isActive('/stats'), isDisabled('/stats')]">
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
                    <router-link :class="['nav-link', isActive('/settings'), isDisabled('/settings')]" to="/settings">
                        <i class="fas fa-sliders-h"></i> <span>Настройки</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :class="['nav-link', isActive('/billing'), isDisabled('/billing')]" to="/billing">
                        <i class="fas fa-money-check"></i> <span>Оплата</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        methods: {
            isDisabled (link) {
                const role = this.$store.state.user.profile.role;

                switch (role) {
                    case 'VENDOR_NEGATIVE_BALANCE': return link !== '/billing';

                    case 'VENDOR_NOT_CONFIRMED': return true;
                    case 'VENDOR':
                    default:
                        return false;
                }
            },

            isActive (link) {
                const route = this.$route.path;

                return new RegExp(`^${link}`).test(route) && 'active';
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav-link.disabled {
        color: #666666;
        cursor: not-allowed;

        &:hover {
            background: transparent;
            color: #666666;
        }
    }
</style>

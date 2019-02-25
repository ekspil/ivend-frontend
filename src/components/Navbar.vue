<template>
    <div class="ren-navbar" id="headerMenuCollapse">
        <div class="container">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :class="['nav-link', /^\/home/.test($route.path) ? 'active' : '']" to="/home">
                        <i class="fas fa-home"></i>
                        Главная
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/monitoring" :class="['nav-link', /^\/monitoring/.test($route.path) ? 'active' : '']"><i class="fas fa-desktop"></i> <span>Мониторинг</span></router-link>
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
                </li>
                <li class="nav-item">
                    <router-link to="/stats" :class="['nav-link', /^\/stats/.test($route.path) ? 'active' : '']"><i class="fas fa-chart-bar"></i><span>Статистика</span></router-link>
                </li>
                <li class="nav-item with-sub" v-if="false">
                    <a class="nav-link" href="#"><i class="fas fa-cog"></i><span>Обслуживание</span></a>
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
                <li class="nav-item with-sub">
                    <a :class="['nav-link', /^\/controllers/.test($route.path) ? 'active' : '']" data-toggle="dropdown" href="#"><i class="fas fa-hdd"></i>
                        <span>Оборудование</span></a>
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
                <li class="nav-item">
                    <router-link :class="['nav-link', /^\/settings/.test($route.path) ? 'active' : '']" to="/settings"><i class="fas fa-sliders-h"></i> <span>Настройки</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link :class="['nav-link', /^\/billing/.test($route.path) ? 'active' : '']" to="/billing"><i class="fas fa-money-check"></i> <span>Оплата</span></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
    }

</script>

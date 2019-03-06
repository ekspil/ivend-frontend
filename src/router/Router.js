import Vue from 'vue';
import VueRouter from "vue-router";

import Login from '@/components/auth/Login';
import Registration from '@/components/auth/Registration';

import EditController from '@/components/controllers/EditController';
import AddController from '@/components/controllers/AddController';

import AddGoods from '@/components/goods/AddGoods';

import Stats from '@/components/stats/Stats';
import ControllerSales from '@/components/stats/ControllerSales';

import Monitoring from '@/components/monitoring/Monitoring';

import Settings from '@/components/settings/Settings';

import Billing from '@/components/billing/Billing';

import Home from '@/components/Home';

import { includes } from 'ramda';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },

    { path: '/controllers/edit/:id', component: EditController },
    { path: '/controllers/add', component: AddController },

    { path: '/goods/add/:id', component: AddGoods },

    { path: '/stats', component: Stats },
    { path: '/stats/:id', component: ControllerSales },

    { path: '/monitoring', component: Monitoring },

    { path: '/settings', component: Settings },

    { path: '/billing', component: Billing },

    { path: '/login', component: Login },
    { path: '/register', component: Registration }
];


const router = new VueRouter({
    routes,
    mode: `history`
})

router.beforeEach((to, from, next) => {
    const isSecured = !includes(to.path, ['/login', '/register']);
    if (isSecured && !store.state.auth.token) {
        next('/login');
    } else if (!isSecured && store.state.auth.token) {
        next('/home');
    } else {
        next();
    }
})

export default router;

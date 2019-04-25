import Vue from 'vue';
import VueRouter from "vue-router";

import Login from '@/components/auth/Login';
import Registration from '@/components/auth/Registration';

import EditController from '@/components/controllers/EditController';
import AddController from '@/components/controllers/AddController';

import AddGoods from '@/components/goods/AddGoods';

import Stats from '@/components/stats/Stats';
import ControllerSales from '@/components/stats/ControllerSales';
import GoodSales from '@/components/stats/GoodSales';

import Monitoring from '@/components/monitoring/Monitoring';
import MonitoringLogs from '@/components/monitoring/MonitoringLogs';

import Settings from '@/components/settings/Settings';
import AddMachine from '@/components/settings/modules/Machines/AddMachine';
import EditMachine from '@/components/settings/modules/Machines/EditMachine';

import Billing from '@/components/billing/Billing';
import Tariffs from '@/components/tariffs/Tariffs';

import Home from '@/components/Home';
import Confirm from '@/components/Confirm';

import { includes } from 'ramda';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/confirm', component: Confirm },

    { path: '/controllers/edit/:id', component: EditController },
    { path: '/controllers/add', component: AddController },

    { path: '/goods/add/:id', component: AddGoods },

    { path: '/stats', component: Stats },
    { path: '/stats/:id', component: ControllerSales },
    { path: '/stats/good/:id', component: GoodSales },

    { path: '/monitoring', component: Monitoring },
    { path: '/monitoring/:id', component: MonitoringLogs },

    { path: '/settings', component: Settings },
    { path: '/machine/add', component: AddMachine },
    { path: '/machine/edit/:id', component: EditMachine },

    { path: '/billing', component: Billing },

    { path: '/tariffs', component: Tariffs },

    { path: '/login', component: Login },
    { path: '/register', component: Registration }
];


const router = new VueRouter({
    routes,
    mode: `history`
})

router.beforeEach((to, from, next) => {
     const isSecured = !includes(to.path, ['/login', '/register']);
     const token = store.state.auth.token, role = store.state.user?.profile?.role;
     
     if (isSecured && !token) {
         return next('/login');
     } else if (!isSecured && token || token && role !== 'VENDOR') {
        if (role === 'VENDOR_NEGATIVE_BALANCE' && to.path !== '/billing') {
            return next('/billing');
        } else if (role === 'VENDOR_NO_LEGAL_INFO' && !['/billing', '/settings'].includes(to.path)) {
            return next('/settings');
        } else if (role === 'VENDOR_NOT_CONFIRMED' && to.path !== '/confirm') {
            return next('/confirm');
        }
     }

    return next();
})

export default router;

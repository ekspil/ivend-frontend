import Vue from 'vue';
import VueRouter from "vue-router";

import Login from '@/components/auth/Login';
import Bill from '@/components/bill/Bill';
import Sms from '@/components/auth/Sms';
import Registration from '@/components/auth/Registration';
import Remember from '@/components/auth/Remember';
import NewPassword from '@/components/auth/NewPassword';

import EditController from '@/components/controllers/EditController';
import EditControllerGroup from '@/components/controllers/EditControllerGroup';
import AddController from '@/components/controllers/AddController';

import AddGoods from '@/components/goods/AddGoods';
import EditGoods from '@/components/goods/EditGoods';

import Stats from '@/components/stats/Stats';
import ControllerSales from '@/components/stats/ControllerSales';
import GoodSales from '@/components/stats/GoodSales';
import MachineEncashments from '@/components/stats/MachineEncashments';
import SalesMachineItem from '@/components/stats/SalesMachineItem';

import Monitoring from '@/components/monitoring/Monitoring';
import MonitoringLogs from '@/components/monitoring/MonitoringLogs';

import Settings from '@/components/settings/Settings';
import AddMachine from '@/components/settings/modules/Machines/AddMachine';
import EditMachine from '@/components/settings/modules/Machines/EditMachine';
import EditMachineGroup from '@/components/settings/modules/Machines/EditMachineGroup';

import Fiscal from '@/components/fiscal/Fiscal';
import FiscalAll from '@/components/fiscal/FiscalAll';
import EditFiscal from '@/components/fiscal/modules/EditFiscal';
import EditFiscalAll from '@/components/fiscal/modules/EditFiscalAll';
import EditUserAll from '@/components/fiscal/modules/EditUserAll';
import EditControllerAll from '@/components/fiscal/modules/edit/EditControllerAll';
import EditNewsAll from '@/components/fiscal/modules/edit/EditNewsAll';
import EditUserInfo from '@/components/fiscal/modules/edit/EditUser';
import AddFiscal from '@/components/fiscal/modules/AddFiscal';
import AddFiscalAll from '@/components/fiscal/modules/AddFiscalAll';
import AddNewsAll from '@/components/fiscal/modules/add/AddNewsAll';
import AddTariff from '@/components/fiscal/modules/add/AddTariff';


import Partner from '@/components/partner/Index';

import Billing from '@/components/billing/Billing';
import Tariffs from '@/components/tariffs/Tariffs';

import Home from '@/components/Home';
import Confirm from '@/components/Confirm';

import Tp from '@/components/tp/Tp'
import Directory from '@/components/directory/Directory'

import { includes } from 'ramda';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/confirm', component: Confirm },

    { path: '/controllers/edit/:id', component: EditController },
    { path: '/controllers/editGroup', component: EditControllerGroup },
    { path: '/controllers/edit/:id/:from', component: EditController },
    { path: '/controllers/add', component: AddController },

    { path: '/goods/add/:id', component: AddGoods },
    { path: '/goods/edit/:matrixId/:id/:machineId', component: EditGoods },

    { path: '/stats', component: Stats },
    { path: '/stats/:id', component: ControllerSales },
    { path: '/stats/good/:id', component: GoodSales },

    { path: '/monitoring', component: Monitoring },
    { path: '/monitoring/:id', component: MonitoringLogs },

    { path: '/settings', component: Settings },
    { path: '/machine/add', component: AddMachine },
    { path: '/machine/edit/:id', component: EditMachine },
    { path: '/machine/editGroup', component: EditMachineGroup },
    { path: '/machine/:id/encashments', component: MachineEncashments },

    { path: '/sales/machine/:machineId/item/:itemId', component: SalesMachineItem },

    { path: '/billing', component: Billing },

    { path: '/tariffs', component: Tariffs },

    { path: '/tp', component: Tp },

    { path: '/fiscal', component: Fiscal },
    { path: '/fiscalAll', component: FiscalAll },
    { path: '/fiscal/edit/:id', component: EditFiscal },
    { path: '/fiscalAll/edit/:id', component: EditFiscalAll },
    { path: '/fiscalAll/user/:id', component: EditUserAll },
    { path: '/fiscalAll/userEdit/:id', component: EditUserInfo },
    { path: '/fiscalAll/controller/:id', component: EditControllerAll },
    { path: '/fiscalAll/news/:id/:type', component: EditNewsAll },
    { path: '/fiscal/add', component: AddFiscal },
    { path: '/fiscalAll/add', component: AddFiscalAll },
    { path: '/fiscalAll/addNews', component: AddNewsAll },
    { path: '/fiscalAll/addTariff/:id', component: AddTariff },


    { path: '/partner', component: Partner },

    { path: '/login', component: Login },
    { path: '/bill/:receiptId', component: Bill },
    { path: '/sms/:tel', component: Sms },
    { path: '/register', component: Registration },
    { path: '/remember', component: Remember },
    { path: '/NewPassword', component: NewPassword },

    { path: '/directory', component: Directory },
];


const router = new VueRouter({
    routes,
    mode: `history`
})

router.beforeEach((to, from, next) => {

     let isSecured = !includes(("/"+(to.path).split("/")[1]), ['/login', '/register', '/remember', '/NewPassword', '/bill']);
     if(to.path.includes("/sms")){
         isSecured = false
     }
     if(!to.path.includes("/stats") && !to.path.includes("/sales")){
         store.state.cache.periodStat = null
         store.state.cache.periodStatType = "День"
     }
     const isLogin = includes(to.path, ['/login']);
     const token = store.state.auth.token, role = store.state.user?.profile?.role, remember = store.state.auth.remember;

     if (isSecured && !token) {
         return next('/login');
     }else if(isLogin && token && remember){
             return next('/home');

     }
     else if (!isSecured && token || token && role !== 'VENDOR') {
        if (role === 'VENDOR_NEGATIVE_BALANCE' && !['/billing', '/settings', '/tp'].includes(to.path)) {
            return next('/billing');
        } else if (role === 'VENDOR_NO_LEGAL_INFO' && !['/billing', '/settings'].includes(to.path)) {
            return next('/settings#company');
        } else if (role === 'VENDOR_NOT_CONFIRMED' && to.path !== '/confirm') {
            return next('/confirm');
        }
     }

     else if(role !== 'ADMIN'){
         if(['/directory'].includes(to.path)){
             return next('/home');
         }
     }

    return next();
})

export default router;

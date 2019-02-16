import Vue from 'vue';
import Router from 'vue-router';
import Controllers from '../components/Controllers';
import Login from '../components/auth/Login';
import Registration from '../components/auth/Registration';
import EditController from '../components/EditController';
import Home from '../components/Home';
import VueRouter from "vue-router";

import { includes } from 'ramda';

import store from '@/store';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home', component: Home
    },
    {
        path: '/controllers', component: Controllers
    },
    {
        path: '/controller/:id/edit', component: EditController
    },
    {
        path: '/login', component: Login
    },
    {
        path: '/register', component: Registration
    }
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

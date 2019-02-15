import Vue from 'vue';
import Router from 'vue-router';
import Controllers from '../components/Controllers';
import Auth from '../components/auth/Auth';
import Registration from '../components/auth/Registration';
import EditController from '../components/EditController';
import Home from '../components/Home';
import VueRouter from "vue-router";

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home', component: Home,
        meta: {
            role: 'USER'
        },
    },
    {
        path: '/controllers', component: Controllers,
        meta: {
            role: 'USER'
        },
    },
    {
        path: '/controller/:id/edit', component: EditController,
        meta: {
            role: 'USER'
        },
    },
    {
        path: '/auth', component: Auth,
        meta: {},
    },
    {
        path: '/register', component: Registration,
        meta: {},
    }
];


const router = new VueRouter({
    routes,
    mode: `history`
})


router.beforeEach((to, from, next) => {
    const {role} = to.meta

    if (role) {

        const authenticated = false
        const roleMatched = false

        if (!authenticated) {
            return next('/auth')
        }

        if (roleMatched) {
            return next()
        } else {
            return next(false)
        }
    } else {
        return next()
    }
})

export default router;

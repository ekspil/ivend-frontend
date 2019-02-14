import Vue from 'vue';
import Router from 'vue-router';

import Controllers from '../components/Controllers';
import EditController from '../components/EditController';
import Home from '../components/Home';
import VueRouter from "vue-router";

Vue.use(Router);

const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/controllers', component: Controllers},
    {path: '/controller/:id/edit', component: EditController}
]

const router = new VueRouter({
    routes,
    mode: `history`
})

/*const router = new Router({
    routes: [
        {
            path: `/`,
            name: `home`,
            component: Home,
            meta: {
                middleware: log,
            },
        },
        {
            path: `/login`,
            name: `login`,
            component: Login,
            meta: {
                middleware: log,
            },
        },
        {
            path: `/user`,
            name: `user`,
            component: User,
            meta: {
                // Try to switch those two around to see how
                // this affects execution of the callbacks.
                middleware: [auth, log],
            },
        },
    ],
    mode: `history`,
});*/


export default router;

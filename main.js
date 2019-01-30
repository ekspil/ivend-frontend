import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueApollo from "vue-apollo"
import Controllers from './components/Controllers.vue'
import EditController from './components/EditController.vue'
import Home from './components/Home.vue'
import App from './components/App.vue'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from "apollo-link";

// HTTP connexion to the API
const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'https://graphql.p-factory.ru/graphql',
})

// Cache implementation
const cache = new InMemoryCache()


const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: `Basic dGVzdDp0ZXN0`
        }
    })

    return forward(operation)
})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: authMiddleware.concat(httpLink),
    cache,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})
Vue.use(VueApollo)
Vue.use(VueRouter)


const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/controllers', component: Controllers},
    {path: '/controller/:id/edit', component: EditController}
]


const router = new VueRouter({
    routes
})


new Vue({
    el: '.page',
    router,
    apolloProvider,
    render: h => h(App)
})

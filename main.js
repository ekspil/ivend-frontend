import 'babel-polyfill'
import Vue from 'vue'
import router from './src/router/Router'
import VueApollo from "vue-apollo"
import App from './src/App.vue'
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



new Vue({
    el: '.page',
    router,
    apolloProvider,
    render: h => h(App)
})

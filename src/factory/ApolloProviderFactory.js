import Vue from 'vue'
import VueApollo from "vue-apollo"
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from "apollo-link";

import store from '@/store';

// HTTP connexion to the API
const httpLink = new HttpLink({
  // You should use an absolute URL here
  // eslint-disable-next-line
  uri: `${process.env.VUE_APP_GRAPHQL_API}/graphql`,
})

// Cache implementation
const cache = new InMemoryCache()

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      //Basic test:test
      //authorization: `Basic ${store.state.auth.token}`
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

export default apolloProvider;

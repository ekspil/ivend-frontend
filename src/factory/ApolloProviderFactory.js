import Vue from 'vue'
import VueApollo from "vue-apollo"
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from "apollo-link";

import { find, propEq } from 'ramda';
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
  let token = `Bearer ${store.state.auth.token}`
  if ((new URL(window.location.href)).pathname.includes('/fiscalAll')){
    token = `Bearer ${store.state.auth.admin.token}`
  }
  console.log(token)
  // add the authorization to the headers
  operation.setContext({
    headers: {
      //Basic test:test
      authorization: token
      //authorization: `Basic dGVzdDp0ZXN0`
    }
  })

  return forward(operation).map(resp => {
    if (resp.errors && find(propEq('message', 'Not authorized'))(resp.errors)) {
      store.commit('auth/setToken', null);
      store.commit('user/clear');
    }

    return resp
  })
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)

export default apolloProvider;

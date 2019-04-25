import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import user from './user';
import auth from './auth';
import cache from './cache';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		user,
		auth,
		cache
	},
	plugins: [new createPersistedState({
		paths: ['user', 'auth.token']
	})]
});

export default store;

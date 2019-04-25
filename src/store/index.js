import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './auth';
import cache from './cache';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth,
		cache
	},
	plugins: [new createPersistedState({
		paths: ['auth.token']
	})]
});

export default store;

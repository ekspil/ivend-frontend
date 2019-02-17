import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './auth';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth
	},
	plugins: [new createPersistedState({
		paths: ['auth.token']
	})]
});

export default store;
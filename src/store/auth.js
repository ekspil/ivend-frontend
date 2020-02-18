const state = () => ({
	token: null,
	user: {},
	remember: null
});

const mutations = {
	setToken (state,  {token, remember}) {
		state.token = token;
		state.remember = remember;
	},

	setUser (state, user = {}) {
		state.user = user;
	}
};

const actions = {
	requestUserData ({ commit, dispatch }, {token, remember}) {
		commit('setToken',  {token, remember});

		dispatch('user/fetch', null, {
			root: true
		});
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

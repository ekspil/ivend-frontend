const state = () => ({
	token: null,
	user: {}
});

const mutations = {
	setToken (state, token = null) {
		state.token = token;
	},

	setUser (state, user = {}) {
		state.user = user;
	}
};

const actions = {
	requestUserData ({ commit, dispatch }, token = null) {
		commit('setToken', token);

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

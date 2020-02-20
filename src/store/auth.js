const state = () => ({
	token: null,
	user: {},
	remember: null,
	phone: null
});

const mutations = {
	setToken (state,  {token, remember, phone}) {
		state.token = token;
		state.remember = remember;
		state.phone = phone;
	},

	setUser (state, user = {}) {
		state.user = user;
	}
};

const actions = {
	requestUserData ({ commit, dispatch }, {token, remember, phone}) {
		commit('setToken',  {token, remember, phone});

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

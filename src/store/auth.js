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

export default {
	namespaced: true,
	state,
	mutations
}

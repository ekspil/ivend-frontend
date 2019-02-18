const state = () => ({
	token: null
});

const mutations = {
	setToken (state, token = null) {
		state.token = token;
	}
};

export default {
	namespaced: true,
	state,
	mutations
}

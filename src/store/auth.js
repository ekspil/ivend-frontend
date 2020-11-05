const state = () => ({
	token: null,
	admin: {
		token: null
	},
	user: {},
	remember: null,
	phone: null,
	closeHelp: false
});


const mutations = {
	setToken (state,  info) {
        if(info){
            const {token, remember, phone} = info
            state.token = token;
            state.remember = remember;
            state.phone = phone;
						state.closeHelp = false;
		}else{
            state.token = null;
            state.remember = null;
            state.phone = null;
						state.closeHelp = false;
		}

	},
	setAdminToken (state,  info) {
        if(info){
            const {token} = info
			state.admin.token = token
        }else{
				state.admin.token = null;

		}
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

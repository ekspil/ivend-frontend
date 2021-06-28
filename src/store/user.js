import Bus from '@/bus';
import router from '@/router/Router';

import gql from 'graphql-tag';

const state = () => ({
	profile: null,
	partner: null,
	partnerFee: null,
	selectedGroupIdSe: null,
	selectedGroupIdSt: null,
});

const mutations = {
	set (state, payload = null) {
		state.profile = payload;
	},
	setPartner (state, partner = null) {
		state.partner = partner;
	},

	clear (state) {
		state.profile = null;
	}
};

const actions = {
	async fetch ({ commit }) {
		const { data } = await Bus.$apollo.query({
			query: gql`
				query {
					getProfile {
						role
					}
				}
			`
		});

		commit('set', data.getProfile);
		router.push('/home');
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

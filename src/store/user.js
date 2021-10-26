import Bus from '@/bus';
import router from '@/router/Router';

import gql from 'graphql-tag';

const state = () => ({
	profile: null,
	partner: null,
	partnerFee: null,
	selectedGroupIdSe: null,
	selectedGroupIdSt: null,
	partnerInfo: null,
});

const mutations = {
	set (state, payload = null) {
		state.profile = payload;
	},
	setPartnerInfo (state, payload = null) {
		state.partnerInfo = payload;
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
						id
						role
						partnerId
					}
				}
			`
		});
		let info = null
		if(data.getProfile && (data.getProfile.role === "PARTNER" || data.getProfile.partnerId)){
			let partnerId
			if(data.getProfile.role === "PARTNER"){
				partnerId = data.getProfile.id
			}
			if(data.getProfile.partnerId){
				partnerId = data.getProfile.partnerId
			}


			const result = await Bus.$apollo.query({
				query: gql `
                                query ($partnerId: Int!) {
                                    getPartnerInfo(partnerId: $partnerId){
                                    	partnerId
										fileOferta
										fileLogo
										infoRequisites
										infoMailTech
										infoPhoneTech
										infoPhoneCom
                                    
                                    }
                                }
                            `,
				variables: {
					partnerId
				}
			});

			if(result.data){
				info = result.data.getPartnerInfo
			}



		}



		if(info){
			commit('setPartnerInfo', info);
		}
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

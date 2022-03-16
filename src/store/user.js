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
	timeZone: 3
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
	setTimeZone (state, timeZone = 3) {
		state.timeZone = timeZone;
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
				partnerId = Number(data.getProfile.id)
			}
			if(data.getProfile.partnerId){
				partnerId = Number(data.getProfile.partnerId)
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




		commit('setPartnerInfo', info);

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

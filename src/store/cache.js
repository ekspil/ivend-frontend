import Vue from 'vue';
import { not } from 'ramda';
import { validate, mapValidationObject } from '@/utils/validation';

const state = () => ({
	_observable: '',
	sharedData: {
		sales: {
			count: 0,
			amount: 0
		},
	},
	periodStat: null
});

const getters = {
	validation: state => state[state._observable] ? state[state._observable].validation : {},
	data: state => state[state._observable] ? state[state._observable].data : {},
	sales: state => state.sharedData.sales,
	periodStat: state => state.periodStat
};

const mutations = {
	setPeriodStat(state, {period}){
		if(!period) return
		state.periodStat = period
	},
	setSales(state, {sales}){
		if(!sales) return
		state.sharedData.sales = sales
	},
	store (state, { formName, key, value, push }) {
		if (formName && key && not(undefined, value)) {
			if (push) {
				if (state[formName]) {
					state[formName].data.push({
						[key]: value
					});
				} else {
					Vue.set(state, formName, {
						data: [{ [key]: value }]
					});
				}
			} else {
				if (state[formName]) {
					Vue.set(state[formName].data, key, value);
				} else {
					Vue.set(state, formName, {
						data: { [key]: value }
					});
				}
			}
		}
	},

	validate (state, { formName, schema }) {
		const data = state[formName].data;
		const validation = mapValidationObject(validate(data, schema));

		Vue.set(state[formName], 'validation', validation);
		Vue.set(state, '_observable', formName);
	},

	clear (state, formName) {
		Vue.set(state, formName, null);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations
}

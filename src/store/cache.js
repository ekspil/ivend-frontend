import Vue from 'vue';
import { not } from 'ramda';
import { validate, mapValidationObject } from '@/utils/validation';

const state = () => ({
	_observable: ''
});

const getters = {
	validation: state => state[state._observable] ? state[state._observable].validation : {},
	data: state => state[state._observable] ? state[state._observable].data : {}
};

const mutations = {
	store (state, { formName, key, value }) {
		if (formName && key && not(undefined, value)) {
			if (state[formName]) {
				Vue.set(state[formName].data, key, value);
			} else {
				Vue.set(state, formName, {
					data: { [key]: value }
				});
			}
		}
	},

	validate (state, { formName, schema }) {
		const data = state[formName].data;
		const validation = mapValidationObject(validate(data, schema));

		Vue.set(state[formName], 'validation', validation);
		state._observable = formName;
	},

	// eslint-disable-next-line
	clear (state) {
		state = {};
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations
}

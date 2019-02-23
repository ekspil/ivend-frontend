<template>
	<div>
		<input type="text" :placeholder="placeholder || null" v-model="input" :class="[className, validation[name] ? 'input-invalid' : '']"/>
		<div class="validation-error" v-if="validation[name]">{{ validation[name] }}</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	import bus from '@/bus';

	export default {
		name: 'Field',
		props: {
			placeholder: {
				type: String,
				default: 'text'
			},
			name: {
				type: String,
				default: ''
			},
			formName: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: ''
			}
		},
		data: () => ({
			input: ''
		}),
		computed: {
			...mapGetters({
				validation: 'cache/validation'
			})
		},
		created () {
			const that = this;

			if (this.formName && this.name) {
				bus.$on('submit', function (formName) {
					if (formName === that.formName) {
						that.$store.commit('cache/store', {
							formName,
							key: that.name,
							value: that.input
						});
					}
				})
			} else {
				throw new Error('Incorrect attributes were provided.');
			}
		}
	}
</script>

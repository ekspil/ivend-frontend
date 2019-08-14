<template>
	<div :class="wrapperClassName">
		<label v-if="type === 'checkbox'" :class="[className, validation[name] ? 'default-checkbox__error' : '']" :for="name">
			<input class="auth-block__checkbox" type="checkbox" :id="name" v-model="input"/>
			<span class="auth-block__checkbox-label">
				<slot name="label"></slot>
			</span>
		</label>

		<masked-input
		v-else-if="masked" :mask="mask" :type="type" :placeholder="placeholder || null"
		v-model="input" :class="[className, validation[name] ? 'input-invalid' : '']"
		:disabled="disabled"
		/>

		<input
		v-else :type="type" :placeholder="placeholder || null"
		v-model="input" :class="[className, validation[name] ? 'input-invalid' : '']"
		:disabled="disabled"
		/>
		<div class="validation-error" v-if="validation[name]">{{ validation[name] }}</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	import maskedInput from 'vue-masked-input';

	import bus from '@/bus';

	export default {
		name: 'Field',
		components: {
			maskedInput
		},
		props: {
			type: {
				type: String,
				default: 'text'
			},
			placeholder: {
				type: String,
				default: 'text'
			},
			name: String,
			formName: String,

			className: String,
			wrapperClassName: String,
			
			value: {
                default: ''
            },
			disabled: {
				type: Boolean,
				default: false
			},
			masked: {
				type: Boolean,
				default: false
			},
			mask: String,
			array: {
				type: Boolean,
				default: false
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

			this.input = this.value || '';

			if (this.formName && this.name) {
				bus.$on('submit', function (formName) {
					if (formName === that.formName) {
						that.$store.commit('cache/store', {
							formName,
							key: that.name,
							value: that.input,
							push: that.array ? true : false
						});
					}
				})
			} else {
				throw new Error('Incorrect attributes were provided.');
			}
		},
		beforeDestroy () {
			bus.$off('submit', () => {});
		}
	}
</script>

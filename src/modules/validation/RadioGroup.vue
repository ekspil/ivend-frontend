<template>
	<div>
		<slot v-bind:input="input"></slot>
	</div>
</template>

<script>
	export default {
		name: 'RadioGroup',
		props: {
			value: {
				type: String,
				default: ''
			}
		},
		data: () => ({
			input: ''
		}),
		watch: {
			input (newVal) {
				console.log(newVal);
			}
		},
		created () {
			this.input = this.value || '';
		}
	}
</script>
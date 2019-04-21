<template>
	<div class="alert" v-if="visible">
		{{ message }}
	</div>
</template>

<script>
	export default {
		name: 'Alert',
		props: {
			message: String
		},
		data: () => ({
			visible: true
		}),
		created () {
			const vm = this;
			setTimeout(() => {
				vm.visible = false;
			}, 5000);
		}
	}
</script>

<style scoped lang="scss">
	.alert {
		border: 1px solid #00dabf;
		padding: 1.25em;
		font-size: 1em;
		width: 100%;
		background-color: white;
		color: black;
	}
</style>

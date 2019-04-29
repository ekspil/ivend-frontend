<template>
	<div class="hint-wrapper">
		<div id="recharge-hint" :class="['balance-info-block__hint', visible ? 'hint-visible' : 'shown', className]">
			{{ text }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Hint',
		props: {
			className: ''
		},
		data: () => ({
			visible: false,

			text: null
		}),
		methods: {
			hide () {
				this.visible = false;
			},

			show (text = '') {
				const that = this;

				this.text = text;
				this.visible = true;
				setTimeout(() => {
					that.visible = false;
				}, 2000);
			}
		}
	}
</script>

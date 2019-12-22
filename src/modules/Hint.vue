<template>
	<div class="hint-wrapper">
		<div id="recharge-hint" :class="['balance-info-block__hint', visible ? 'hint-visible' : 'shown', className]">
			{{ text }}
		</div>
		<div id="recharge-hint2" :class="['balance-info-block__hint2', visible2 ? 'hint-visible2' : 'shown2', className2]">
			{{ text2 }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Hint',
		props: {
			className: '',
			className2: '',

		},
		data: () => ({
			visible: false,
			visible2: false,

			text: null,
			text2: null
		}),
		methods: {
			hide () {
				this.visible = false;
				this.visible2 = false;
			},

			show (text = '') {
				const that = this;

				this.text = text;
				this.visible = true;
				setTimeout(() => {
					that.visible = false;
				}, 2000);
			},
			show2 (text2 = '') {
				const that = this;

				this.text2 = text2;
				this.visible2 = true;
				setTimeout(() => {
					that.visible2 = false;
				}, 2000);
			}
		}
	}
</script>

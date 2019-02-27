<template>
	<div class="hint-wrapper">
		<div id="recharge-hint" :class="['balance-info-block__hint', visible ? 'hint-visible' : 'shown']">
			{{ text }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Hint',
		props: {
			text: {
				type: String,
				default: 'Подсказка'
			}
		},
		data: () => ({
			visible: false
		}),
		methods: {
			hide () {
				this.visible = false;
			},

			show () {
				const that = this;

				this.visible = true;
				setTimeout(() => {
					that.visible = false;
				}, 2000);
			}
		}
	}
</script>

<style scoped lang="scss">
	.hint-wrapper {
		.balance-info-block__hint {
			left: 25px;
			z-index: 1;
		}
		.hint-visible {
            opacity: 1;
            top: -35px;
        }
	}
</style>

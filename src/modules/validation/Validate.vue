<template>
	<form method="POST" class="card">
		<div class="card-header">
			<h3 class="card-title f-b">{{ title }}</h3>
		</div>

		<div class="card-header-links">
			<a href="#" class="card-header-links__item" @click.prevent="goBack">Вернуться назад</a>
		</div>

		<div class="card-body">
			<slot name="form"></slot>
		</div>

		<div class="card-footer text-right">
			<div class="d-flex submit" @click.prevent="submit">
				<slot name="submit"></slot>
			</div>

			<transition name="fade">
				<div class="validation-error" v-if="status.error">{{ status.error }}</div>
				<div class="success-message" v-if="status.success">{{ status.success }}</div>
			</transition>
		</div>
	</form>
</template>

<script>
	import bus from '@/bus';

	import { head, isEmpty } from 'ramda';
	import { areKeysNull } from '@/utils';

	export default {
		name: 'Validate',
		props: {
			title: String,
			formName: String,
			schema: {
				type: Object,
				default: () => {}
			}
		},
		data: () => ({
			status: {
				success: null,
				error: null
			}
		}),
		methods: {
			goBack () {
				this.$router.go(-1);
			},

			showMessage(type, message) {
				const that = this;

				this.status[type] = message;
				setTimeout(function () {
					that.status[type] = null;
				}, 1500);
			},

			async submit () {
				await bus.$emit('submit', this.formName);
				this.$store.commit('cache/validate', {
					formName: this.formName,
					schema: this.schema
				});

				if (areKeysNull(this.$store.getters['cache/validation'])) {
					this.$emit('onSubmit');
				}
			},
			process ({ errors, success }) {
				if (errors && !isEmpty(errors)) {
					const error = head(errors).message || 'Ошибка сервера.';
					this.showMessage('error', error);
				} else {
					this.showMessage('success', success);
					this.$emit('onSuccess');
				}
			}
		}
	}
</script>
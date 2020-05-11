<template>
    <div class="validation-wrapper">
        <form method="POST" class="card" v-if="card">
            <div class="card-header">
                <h3 class="card-title f-b">{{ title }}</h3>
            </div>
            <div class="card-header-links" v-if="back ==='true'">
                <a href="#" class="card-header-links__item" @click.prevent="goBack">Вернуться назад</a>
            </div>

			<slot name="top-buttons"></slot>

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
        <form :class="[className, 'auth-form']" method="POST" v-else>
            <slot></slot>

            <transition name="fade">
                <div class="validation-error auth" v-if="status.error">{{ status.error }}</div>
                <div class="success-message auth" v-if="status.success">{{ status.success }}</div>
            </transition>
        </form>
    </div>
</template>

<script>
	import bus from '@/bus';

	import { head, isEmpty } from 'ramda';
	import { areKeysNull, convertServerError } from '@/utils';

	export default {
		name: 'Validate',
		props: {
			className: String,
			title: String,
			formName: String,

			// Схема валидации
			schema: {
				type: Object,
				default: () => {}
			},

			// Является ли форма авторизацией
			card: {
				type: Boolean,
				default: true
			},
            back: {
                type: String,
                default: "true"
            },

      // Роут при нажатии "Вернуться назад"
      routeBack: {
        type: String,
        default: ''
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
        const routeBack = this.routeBack;
        if (routeBack) {
          return this.$router.push(routeBack);
        }

				this.$router.go(-1);
			},

			showMessage(type, message) {
				const that = this;

				this.status[type] = message;
				setTimeout(function () {
					that.status[type] = null;
				}, 3500);
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
			process ({ errors, success, data }) {
				if (errors && !isEmpty(errors)) {
					const error = head(errors).message || 'Ошибка сервера.';
					this.showMessage('error', convertServerError(error));
				} else {
					this.showMessage('success', success);
					this.$emit('onSuccess', data);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.validation-wrapper {
		width: 100%;
	}
	.validation-error.auth, .success-message.auth {
		text-align: center;
		margin: .25em 0;
	}
</style>

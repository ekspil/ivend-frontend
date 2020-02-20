<template>
    <div class="auth-page">
        <img src="assets/images/brand/logo.png" class="auth-page__logo" />
        <!-- Авторизация -->
        <div class="auth-block">
            <div class="auth-block__title">Авторизация</div>
            <Validate
                v-if="schema"
                formName="login"
                :schema="schema"
                ref="login"
                :card="false"
                @onSubmit="login"
                @onSuccess="onSuccess"
            >
                <div class="auth-block__field-container auth-block__field-container--phone">

                    <Field :newmasked="true" className="auth-block__field" type="tel" name="phone" placeholder="Номер телефона" mask="\+9 (999) 999-99-99" formName="login"  />
                </div>
                <div class="auth-block__field-container auth-block__field-container--pass">
                    <Field className="auth-block__field" type="password" name="password" placeholder="Пароль" formName="login" />
                </div>
                <button class="auth-block__submit-btn btn btn-primary" type="submit" @click.prevent="$refs.login.submit">Войти</button>
                <div class="auth-block__flex">
                    <label class="default-checkbox" for="remember-checkbox">
                        <input class="auth-block__checkbox" type="checkbox" name="remember" id="remember-checkbox" v-model="remember">
                        <span class="auth-block__checkbox-label">Запомнить меня</span>
                    </label>
                    <a class="auth-block__link" href="/remember">Вспомнить пароль</a>
                </div>
            </Validate>
            <div class="auth-block__link-container">
                <span class="auth-block__link-title">Нет аккаунта?</span>&nbsp;
                <router-link class="auth-block__link" to="/register">Зарегистрируйтесь</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';
import Vue from 'vue';
import InputMask from 'vue-input-mask';

Vue.component('input-mask', InputMask)

import { convertServerError } from '@/utils';
import {
    required
} from '@/utils/validation';

export default {
    name: 'Login',
    components: {
        Validate,
        Field
    },
    data: () => ({
        schema: {
            phone: [required],
            password: [required]
        },
        remember: false
    }),
    mounted: async function (){
        this.$store.commit('cache/store', {
            formName: "login",
            key: "phone",
            value: this.$store.state.auth.phone,
            push: true
        });
        this.$store.state.auth.phone
    },
    methods: {
        async login() {
            const cache = this.$store.getters['cache/data'];
            const userData = {
                password: cache.password,
                phone: cache.phone.replace(/[()+\s-]/gi, '').slice(1)
            };

            try {
                const { errors, data } = await this.$apollo.mutate({
                    mutation: gql `
                                mutation login ($data: RequestTokenInput!) {
                                    token: requestToken(input: $data)
                                }
                            `,
                    variables: {
                        data: userData
                    }
                });

                this.$refs.login.process({ errors, data, success: 'Переадресация...' });
            } catch (error) {
                this.$refs.login.showMessage('error', convertServerError(error.message));
            }
        },
        onSuccess({ token }) {
            const cache = this.$store.getters['cache/data'];
            this.$store.dispatch('auth/requestUserData', {token, remember: this.remember, phone: cache.phone.replace(/[()+\s-]/gi, '')});

        }
    },
}
</script>

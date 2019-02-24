<template>
    <div class="auth-page">
        <img src="assets/images/brand/logo.png" class="auth-page__logo"/>

        <!-- Регистрация -->
        <div class="auth-block">
            <div class="auth-block__title">Регистрация</div>

            <Validate
                v-if="schema"
                formName="register"
                :schema="schema"
                ref="register"
                :auth="true"
                @onSubmit="register"
                @onSuccess="onSuccess"
            >
                <div class="auth-block__field-container auth-block__field-container--email">
                    <Field className="auth-block__field" type="email" name="email" formName="register" placeholder="E-Mail"/>
                </div>

                <div class="auth-block__field-container auth-block__field-container--phone">
                    <Field :masked="true" className="auth-block__field" type="tel" name="phone" placeholder="Телефон"
                           mask="\+\7 (111) 111 11-11" formName="register"/>
                </div>

                <!-- Код телефона -->
                <!-- Скрыто, функционала нет -->
                <div class="auth-block__field-container auth-block__field-container--phone-code disabled-block">
                    <input class="auth-block__field auth-block__field--phone-code" type="text" name="tel-code"
                           placeholder="Код из смс" required>
                    <button class="auth-block__phone-code-btn">Выслать код</button>
                    <div class="auth-block__code-message">
                        Код подтверждения отправлен на номер<br/>
                        +7 (999) 999 9999
                    </div>
                </div>

                <!-- Второй шаг регистрации -->

                <div class="auth-block__field-container auth-block__field-container--password">
                    <div class="auth-block__field-container auth-block__field-container--pass">
                        <Field className="auth-block__field" type="password" name="password" placeholder="Пароль" formName="register"/>
                    </div>

                    <div class="auth-block__field-container auth-block__field-container--pass">
                        <Field className="auth-block__field" type="password" name="rePassword" placeholder="Повторите пароль" formName="register"/>
                    </div>

                    <button class="auth-block__submit-btn btn btn-primary" type="submit" @click.prevent="$refs.register.submit">Зарегистрироваться</button>

                    <Field type="checkbox" name="agreement" formName="register" className="default-checkbox">
                        <template slot="label">
                            Я согласен с <a class="auth-block__link" href="#">условиями соглашения</a>
                        </template>
                    </Field>
                </div>
            </Validate>

            <div class="auth-block__link-container">
                <span class="auth-block__link-title">Уже есть аккаунт?</span>&nbsp;
                <router-link to="/login" class="auth-block__link">Войти</router-link>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
    @import "../../../layout/html/assets/scss/main";
    .validation-error {
        margin: 0;
    }
</style>

<script>
import gql from 'graphql-tag';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

import { equals, omit, bind } from 'ramda';
import {
    required, email, check
} from '@/utils/validation';

export default {
    name: 'Registration',
    components: {
        Validate,
        Field
    },
    data: () => ({
        schema: null
    }),
    methods: {
        async register () {
            const cache = this.$store.getters['cache/data'];
            const userData = {
                ...(omit(['agreement', 'rePassword'], cache)),
                phone: cache.phone.replace(/[()+\s-]/gi, '').slice(1)
            };

            try {
                const { errors, data } = await this.$apollo.mutate({
                    mutation: gql `
                            mutation registerUser ($regData: CreateUserInput!, $logData: RequestTokenInput!) {
                                registerUser(input: $regData) { email }
                                token: requestToken(input: $logData)
                            }
                        `,
                    variables: {
                        regData: userData,
                        logData: omit(['email'], userData)
                    }
                });

                this.$refs.register.process({ errors, data, success: 'Переадресация...' });
            } catch (error) {
                this.$refs.register.showMessage('error', 'Ошибка авторизации.');
            }
        },
        onSuccess ({ token }) {
            this.$store.commit('auth/setToken', token);
            this.$router.push('/home');
        }
    },
    created () {
        const rePasswordValidator = bind(function (rePassword) {
            return { error: equals(rePassword, this.$store.getters['cache/data'].password) ? null : 'Пароли не совпадают.' };
        }, this);

        this.schema = {
            email: [required, email],
            phone: [required],
            password: [required],
            rePassword: [required, rePasswordValidator],
            agreement: [check]
        };
    }
}
</script>

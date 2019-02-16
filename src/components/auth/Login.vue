<template>

    <div class="auth-page">
        <img src="assets/images/brand/logo.png" class="auth-page__logo"/>

        <!-- Авторизация -->
        <div class="auth-block">
            <div class="auth-block__title">Авторизация</div>

            <form name="login" method="POST">
                <div class="auth-block__validation" v-if="validation.password">{{ validation.phone }}</div>
                <div class="auth-block__field-container auth-block__field-container--phone">
                    <input :class="['auth-block__field', validation.phone ? 'auth-block__field--wrong' : '']" type="text" name="phone" placeholder="Номер телефона" required
                           v-model="userData.phone"/>
                </div>

                <div class="auth-block__validation" v-if="validation.password">{{ validation.password }}</div>
                <div class="auth-block__field-container auth-block__field-container--pass">
                    <input :class="['auth-block__field', validation.password ? 'auth-block__field--wrong' : '']" type="password" name="pass" placeholder="Пароль" required
                           v-model="userData.password"/>
                </div>

                <button class="auth-block__submit-btn btn btn-primary" type="submit" @click.prevent="login">Войти</button>
                <div class="auth-block__flex">

                    <label class="default-checkbox" for="remember-checkbox">
                        <input class="auth-block__checkbox" type="checkbox" name="remember" id="remember-checkbox">

                        <span class="auth-block__checkbox-label">Запомнить меня</span>
                    </label>

                    <a class="auth-block__link" href="#">Вспомнить пароль</a>

                </div>

            </form>

            <div class="auth-block__fetchError" v-if="serverError">{{ serverError }}</div>

            <div class="auth-block__link-container">
                <span class="auth-block__link-title">Нет аккаунта?</span>&nbsp;
                <router-link class="auth-block__link" to="/register">Зарегистрируйтесь</router-link>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
    @import "../../../layout/html/assets/scss/main";
</style>

<script>
    import gql from 'graphql-tag';

    import { head } from 'ramda';
    import { areKeysNull } from '@/utils';
    import {
        validate, mapValidationObject,
        required, phone
    } from '@/utils/validation';

    export default {
        name: 'Login',
        data: () => ({
            userData: {
                phone: '',
                password: ''
            },
            validation: {},
            serverError: null
        }),
        methods: {
            async login () {
                this.validation = mapValidationObject(validate(this.userData, {
                    phone: [required, phone],
                    password: [required]
                }));

                if (areKeysNull(this.validation)) {
                    try {
                        const { errors, data } = await this.$apollo.mutate({
                            mutation: gql`
                                mutation login ($data: RequestTokenInput!) {
                                    token: requestToken(input: $data)
                                }
                            `,
                            variables: {
                                data: this.userData
                            }
                        });
                    
                        if (errors || !data.token) { this.serverError = head(errors).message || 'Ошибка авторизации.'; }
                        else { this.serverError = null; }

                        this.$store.commit('auth/setToken', data.token);
                        this.$router.push('/home');
                    } catch (error) {
                        this.serverError = error.message || 'Ошибка авторизации.';
                    }
                }
            }
        }
    }
</script>

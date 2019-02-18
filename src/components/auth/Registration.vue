<template>
    <div class="auth-page">
        <img src="assets/images/brand/logo.png" class="auth-page__logo"/>

        <!-- Регистрация -->
        <div class="auth-block">
            <div class="auth-block__title">Регистрация</div>

            <form name="register" method="POST">
                <div class="validation-error" v-if="validation.email">{{ validation.email }}</div>
                <div class="auth-block__field-container auth-block__field-container--email">
                    <input :class="['auth-block__field', validation.email ? 'input-invalid' : '']" type="email" name="login" placeholder="E-Mail" required
                           v-model="userData.email" />
                </div>

                <div class="validation-error" v-if="validation.phone">{{ validation.phone }}</div>
                <div class="auth-block__field-container auth-block__field-container--phone">
                    <masked-input :class="['auth-block__field', validation.phone ? 'input-invalid' : '']" type="tel" name="phone" placeholder="Телефон" required
                           v-model="userData.phone" mask="\+\7 (111) 111 11-11"/>
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
                    <div class="validation-error" v-if="validation.password">{{ validation.password }}</div>
                    <div class="auth-block__field-container auth-block__field-container--pass">
                        <input :class="['auth-block__field', validation.password ? 'input-invalid' : '']" type="password" name="pass" placeholder="Пароль" required
                               v-model="userData.password"/>
                    </div>

                    <div class="validation-error" v-if="validation.rePassword">{{ validation.rePassword }}</div>
                    <div class="auth-block__field-container auth-block__field-container--pass">
                        <input :class="['auth-block__field', validation.rePassword ? 'input-invalid' : '']" type="password" name="pass-confirm"
                               placeholder="Повторите пароль"
                               required v-model="userData.rePassword" />
                    </div>
                    <button class="auth-block__submit-btn btn btn-primary" type="submit" @click.prevent="register">Зарегистрироваться</button>
                    <label :class="['default-checkbox', validation.agreement ? 'default-checkbox__error' : '']" for="сonditions-checkbox">
                        <input class="auth-block__checkbox" type="checkbox" name="remember" id="сonditions-checkbox"
                               v-model="agreement"/>
                        <span class="auth-block__checkbox-label">Я согласен с <a class="auth-block__link" href="#">условиями соглашения</a></span>
                    </label>
                    <div class="validation-error">{{ validation.agreement }}</div>
                </div>
            </form>

            <div class="auth-block__fetchError" v-if="serverError">{{ serverError }}</div>

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

  import maskedInput from 'vue-masked-input';

  import { equals, omit, head, isEmpty } from 'ramda';
  import { areKeysNull } from '@/utils';
  import {
    validate, mapValidationObject,
    required, email, phone, check
  } from '@/utils/validation';

  export default {
    name: 'Registration',
    components: {
        maskedInput
    },
    data: () => ({
        agreement: false,
        userData: {
            email: '',
            phone: '',
            password: '',
            rePassword: ''
        },
        validation: {},
        serverError: null
    }),
    methods: {
        async register () {
            this.validation = mapValidationObject(validate({ agreement: this.agreement, ...this.userData }, {
                email: [required, email],
                phone: [required],
                password: [required],
                rePassword: [required, rePassword => ({ error: equals(rePassword, this.userData.password) ? null : 'Пароли не совпадают.' })],
                agreement: [check]
            }));

            if (areKeysNull(this.validation)) {
                const userData = {
                    ...this.userData,
                    phone: this.userData.phone.replace(/[()+\s-]/gi, '')
                };

                try {
                    const { errors, data } = await this.$apollo.mutate({
                        mutation: gql`
                            mutation registerUser ($regData: CreateUserInput!, $logData: RequestTokenInput!) {
                                registerUser(input: $regData) { email }
                                token: requestToken(input: $logData)
                            }
                        `,
                        variables: {
                            regData: omit(['rePassword'], userData),
                            logData: omit(['email', 'rePassword'], userData)
                        }
                    });

                    if ((errors && !isEmpty(errors)) || !data.token) {
                        this.serverError = head(errors).message || 'Ошибка авторизации.';
                    } else {
                        this.serverError = null;
                        this.$store.commit('auth/setToken', data.token);
                        this.$router.push('/home');
                    }
                } catch (error) {
                    this.serverError = error.message || 'Ошибка авторизации.';
                }
            }
        }
    }
  }
</script>

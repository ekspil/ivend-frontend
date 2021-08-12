<template>
    <div class="auth-page">
        <img src="assets/images/brand/logo.png" class="auth-page__logo" />
        <!-- Регистрация -->
        <div class="auth-block">
            <div class="auth-block__title">Регистрация</div>
            <Validate v-if="schema" formName="register" :schema="schema" ref="register" :card="false" @onSubmit="register" @onSuccess="onSuccess">





<!--              <div class="auth-block__field-container auth-block__field-container">-->
<!--                <select id="company-sno" v-model="country" class="form-control custom-select">-->
<!--                  <option value="rus">Россия</option>-->
<!--                  <option value="kaz">Казахстан</option>-->
<!--                  <option value="arm">Армения</option>-->
<!--                  <option value="aze">Азербайджан</option>-->
<!--                  <option value="bel">Беларусь</option>-->
<!--                  <option value="geo">Грузия</option>-->
<!--                  <option value="kg">Кыргыстан</option>-->
<!--                  <option value="lva">Латвия</option>-->
<!--                  <option value="ltu">Литва</option>-->
<!--                  <option value="mda">Молдова</option>-->
<!--                  <option value="tjk">Таджикистан</option>-->
<!--                  <option value="tkm">Туркменистан</option>-->
<!--                  <option value="ukr">Украина</option>-->
<!--                  <option value="uzb">Узбекистан</option>-->
<!--                  <option value="est">Эстония</option>-->

<!--                </select>-->
<!--              </div>-->
<!--              <div class="auth-block__field-container auth-block__field-container&#45;&#45;email">-->
<!--                <Field-->
<!--                    className="auth-block__field"-->
<!--                    type="email"-->
<!--                    name="email"-->
<!--                    formName="register"-->
<!--                    placeholder="E-Mail"-->
<!--                    :disabled="step === 2"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="auth-block__field-container auth-block__field-container&#45;&#45;phone">-->
<!--                <Field v-if="country==='rus' || country==='kaz'"-->
<!--                       :masked="true"-->
<!--                       className="auth-block__field"-->
<!--                       type="tel"-->
<!--                       name="phone"-->
<!--                       placeholder="Телефон"-->
<!--                       mask="\+\7 (111) 111 11-11"-->
<!--                       formName="register"-->
<!--                       ref="tel"-->
<!--                       :disabled="step === 2"-->
<!--                />-->
<!--                <Field v-if="country==='arm' || country==='bel' || country==='lva' || country==='ltu' || country==='mda' || country==='ukr' || country==='est'"-->
<!--                       :masked="true"-->
<!--                       className="auth-block__field"-->
<!--                       type="tel"-->
<!--                       name="phone"-->
<!--                       placeholder="Телефон"-->
<!--                       mask="\+\311 (111) 111 11-11"-->
<!--                       formName="register"-->
<!--                       ref="tel"-->
<!--                       :disabled="step === 2"-->
<!--                />-->
<!--                <Field v-if="country==='aze' || country==='geo' || country==='kg' || country==='tjk' || country==='tkm' || country==='uzb'"-->
<!--                       :masked="true"-->
<!--                       className="auth-block__field"-->
<!--                       type="tel"-->
<!--                       name="phone"-->
<!--                       placeholder="Телефон"-->
<!--                       mask="\+\911 (111) 111 11-11"-->
<!--                       formName="register"-->
<!--                       ref="tel"-->
<!--                       :disabled="step === 2"-->
<!--                />-->
<!--              </div>-->










                <div class="auth-block__field-container auth-block__field-container--email">
                    <Field
                        className="auth-block__field"
                        type="email"
                        name="email"
                        formName="register"
                        placeholder="E-Mail"
                        :disabled="step === 2"
                    />
                </div>
                <div class="auth-block__field-container auth-block__field-container--phone">
                    <Field
                        :masked="true"
                        className="auth-block__field"
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        mask="\+\7 (111) 111 11-11"
                        formName="register"
                        ref="tel"
                        :disabled="step === 2"
                    />
                </div>
                <div class="auth-block__field-container auth-block__field-container--phone-code" v-if="step > 1">
                    <Field
                        className="auth-block__field"
                        wrapperClassName="auth-block__field--phone-code"
                        type="text"
                        name="code"
                        formName="register"
                        placeholder="Код из SMS"
                    />
                    <button
                        :class="['auth-block__phone-code-btn', !allowSmsSend && 'btn disabled']"
                        @click="sendCode"
                        :disabled="!allowSmsSend"
                    >
                        Выслать повторно
                    </button>
                    <div class="auth-block__code-message">
                        Код подтверждения отправлен на номер<br />
                        {{ postData.tel }}
                    </div>
                </div>
                <!-- Второй шаг регистрации -->
                <div class="auth-block__field-container auth-block__field-container--password">
                    <div class="auth-block__field-container auth-block__field-container--pass" v-if="step > 1">
                        <Field className="auth-block__field" type="password" name="password" placeholder="Пароль" formName="register" />
                    </div>
                    <div class="auth-block__field-container auth-block__field-container--pass" v-if="step > 1">
                        <Field className="auth-block__field" type="password" name="rePassword" placeholder="Повторите пароль" formName="register" />
                    </div>
                    <button class="auth-block__submit-btn btn btn-primary" type="submit" @click.prevent="incrementStep">Зарегистрироваться</button>
                    <Field type="checkbox" name="agreement" formName="register" className="default-checkbox" v-if="step > 1">
                        <template slot="label">
                            Я согласен с <a class="auth-block__link" href="#" @click.prevent>условиями соглашения</a>
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

import { convertServerError } from '@/utils';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

import { equals, omit, bind } from 'ramda';
import {
    required,
    email,
    check
} from '@/utils/validation';

let smsInterval;
export default {
    name: 'Registration',
    components: {
        Validate,
        Field
    },
    data: () => ({
        schema: null,
        postData: {
            tel: ''
        },
        allowSmsSend: false,

        step: 1
    }),
    methods: {
        async sendCode () {

        },
        async incrementStep () {
            const vm = this;

            if (this.step === 1) {
                this.postData.tel = this.$refs.tel.input;

                try {
                    const { data } = await this.$apollo.mutate({
                        mutation: gql`
                            mutation ($input: Registration1StepInput!) {
                                timestamp: requestRegistrationSms (input: $input)
                            }
                        `,
                        variables: {
                            input: {
                                phone: this.postData.tel.replace(/[()+\s-]/gi, '').slice(1)
                            }
                        }
                    });

                    smsInterval = setInterval(function () {
                        vm.allowSmsSend = Date.now() > data.timestamp;

                        if (vm.allowSmsSend) {
                            clearInterval(smsInterval);
                        }
                    }, 1000);

                    return this.step++;
                } catch (error) {
                    return this.$refs.register.showMessage('error', convertServerError(error.message));
                }
            }

            this.$refs.register.submit();
        },
        async register() {
            const cache = this.$store.getters['cache/data'];
            const regData = {
                ...(omit(['agreement', 'rePassword'], cache)),
                phone: cache.phone.replace(/[()+\s-]/gi, '').slice(1)
            }

            if(this.$store.state.user.partner){
              regData.partnerId = this.$store.state.user.partner
            }
            try {
                const { errors, data } = await this.$apollo.mutate({
                    mutation: gql `
                            mutation registerUser ($regData: CreateUserInput!) {
                                registerUser(input: $regData) { email }
                            }
                        `,
                    variables: {
                        regData
                    }
                });

                this.$refs.register.process({ errors, data, success: 'Переадресация...' });
            } catch (error) {
                return this.$refs.register.showMessage('error', convertServerError(error.message));
            }
        },
        async onSuccess() {
            const cache = this.$store.getters['cache/data'];

            const { data } = await this.$apollo.mutate({
                mutation: gql `
                    mutation loginUser ($logData: RequestTokenInput!) {
                        token: requestToken(input: $logData)
                    }
                `,
                variables: {
                    logData: {
                        ...(omit(['agreement', 'rePassword', 'code', 'email'], cache)),
                        phone: cache.phone.replace(/[()+\s-]/gi, '').slice(1)
                    }
                }
            });

            this.$store.dispatch('auth/requestUserData', {token: data.token});
        }
    },

    created() {
        const rePasswordValidator = bind(function(rePassword) {
            const cache = this.$store.state.cache.register.data;
            return { error: equals(rePassword, cache.password) ? null : 'Пароли не совпадают.' };
        }, this);

        this.schema = {
            email: [required, email],
            phone: [required],
            password: [required],
            code: [required],
            rePassword: [required, rePasswordValidator],
            agreement: [check]
        };
    },
    beforeDestroy () {
        clearInterval(smsInterval);
    },
    mounted() {
      const ref = Number(this.$route.query.ref)
      if ( ref > 1){
        this.$store.commit("user/setPartner", ref)
      }
    }
}
</script>

<style scoped lang="scss">
    .auth-block__field--phone-code, .auth-block__phone-code-btn {
        width: 50%;
    }

    .btn.disabled {
        cursor: not-allowed;
    }
</style>

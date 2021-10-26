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





              <div class="auth-block__field-container auth-block__field-container">
                <select id="company-sno" v-model="country" class="form-control custom-select">
                  <option value="rus">Россия</option>
                  <option value="kaz">Казахстан</option>
                  <option value="arm">Армения</option>
                  <option value="aze">Азербайджан</option>
                  <option value="bel">Беларусь</option>
                  <option value="geo">Грузия</option>
                  <option value="kg">Кыргыстан</option>
                  <option value="lva">Латвия</option>
                  <option value="ltu">Литва</option>
                  <option value="mda">Молдова</option>
                  <option value="tjk">Таджикистан</option>
                  <option value="tkm">Туркменистан</option>
                  <option value="ukr">Украина</option>
                  <option value="uzb">Узбекистан</option>
                  <option value="est">Эстония</option>

                </select>
              </div>

<!--              <div  class="auth-block__field-container auth-block__field-container&#45;&#45;phone">-->



<!--                <Field v-if="country==='rus' || country==='kaz'"-->
<!--                       :masked="true"-->
<!--                       className="auth-block__field"-->
<!--                       type="tel"-->
<!--                       name="phone"-->
<!--                       placeholder="Телефон"-->
<!--                       mask="\+\7 (111) 111 11-11"-->
<!--                       formName="login"-->
<!--                       ref="tel"-->
<!--                />-->
<!--                <Field v-if="country==='arm' || country==='bel' || country==='lva' || country==='ltu' || country==='mda' || country==='ukr' || country==='est'"-->
<!--                       :masked="true"-->
<!--                       className="auth-block__field"-->
<!--                       type="tel"-->
<!--                       name="phone"-->
<!--                       placeholder="Телефон"-->
<!--                       mask="\+\311 (111) 111 11-11"-->
<!--                       formName="login"-->
<!--                       ref="tel"-->
<!--                />-->
<!--                <Field v-if="country==='aze' || country==='geo' || country==='kg' || country==='tjk' || country==='tkm' || country==='uzb'"-->
<!--                       :masked="true"-->
<!--                       className="auth-block__field"-->
<!--                       type="tel"-->
<!--                       name="phone"-->
<!--                       placeholder="Телефон"-->
<!--                       mask="\+\911 (111) 111 11-11"-->
<!--                       formName="login"-->
<!--                       ref="tel"-->
<!--                />-->

<!--              </div>-->



                <div class="row">
                  <div class="auth-block__field-container  col-3"><div class="auth-block__field" :disabled="true">
                    {{countryCode[country] }}</div></div>
                  <div class="auth-block__field-container auth-block__field-container col-9">

                    <Field :newmasked="true" className="auth-block__field" type="tel" name="phone" placeholder="Номер телефона" mask="\(999) 999-99-99" formName="login"  />
                  </div>
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
        country: "rus",
        remember: true,
      countryCode: {
        rus: "+7",
        kaz: "+7",
        arm: "+374",
        aze: "+994",
        bel: "+375",
        geo: "+995",
        kg: "+996",
        lva: "+371",
        ltu: "+370",
        mda: "+373",
        tjk: "+992",
        tkm: "+993",
        ukr: "+380",
        uzb: "+998",
        est: "+372",
      }
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
                phone: cache.phone.replace(/[()+\s-]/gi, '')
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
            if(token === "NEED_SMS"){
                const cache = this.$store.getters['cache/data'];
                this.$router.push(`/sms/${cache.phone.replace(/[()+\s-]/gi, '')}`)
            }
            else{
                const cache = this.$store.getters['cache/data'];
                this.$store.dispatch('auth/requestUserData', {token, remember: this.remember, phone: cache.phone.replace(/[()+\s-]/gi, '')});

            }



        }
    },
}
</script>

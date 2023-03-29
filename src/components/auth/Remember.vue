<template>
    <div class="auth-page">
        <img src="assets/images/brand/logo.png" class="auth-page__logo" />
        <!-- Авторизация -->
        <div class="auth-block">
            <div class="auth-block__title">Восстановление пароля</div>
            <Validate
                v-if="schema"
                formName="remember"
                :schema="schema"
                ref="remember"
                :card="false"
                @onSubmit="remember"
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



              <div class="row">
                <div class="auth-block__field-container  col-3"><div class="auth-block__field" :disabled="true">
                  {{countryCode[country] }}</div></div>
                <div class="auth-block__field-container auth-block__field-container col-9">

                  <Field :newmasked="true" className="auth-block__field" type="tel" name="phone" placeholder="Номер телефона" mask="\(999) 999-99-99" formName="remember"  />
                </div>
              </div>

              <div class="auth-block__field-container auth-block__field-container--email">
                    <Field
                            className="auth-block__field"
                            type="email"
                            name="email"
                            formName="remember"
                            placeholder="E-Mail"
                    />
                </div>
                <button class="auth-block__submit-btn btn btn-primary" type="submit" @click.prevent="$refs.remember.submit">Восстановить пароль</button>

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

import { convertServerError } from '@/utils';
import {
    required
} from '@/utils/validation';
import InputMask from 'vue-input-mask';

import Vue from 'vue';
Vue.component('input-mask', InputMask)

export default {
    name: 'Remember',
    components: {
        Validate,
        Field
    },
    data: () => ({
        country: "rus",
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
      },
        schema: {
            phone: [required],
            email: [required]
        },
    }),
    methods: {
        async remember() {
            const cache = this.$store.getters['cache/data'];
            const input = {
                email: cache.email,
                phone: cache.phone.replace(/\D/gi, '')
            };

            try {
                const { errors, data } = await this.$apollo.mutate({
                    mutation: gql `
                                mutation remember ($data: RememberInput!) {
                                    rememberPasswordRequest(input: $data)
                                }
                            `,
                    variables: {
                        data: input
                    }
                });
                if(data.rememberPasswordRequest){
                    this.$refs.remember.showMessage('success', "Письмо с дальнейшими указаниями отправлено на почту");
                    setTimeout(this.onSuccess, 4500)
                }else{
                    this.$refs.remember.showMessage('error', "Пользователь с такими данными не найден");
                }

            } catch (error) {
                this.$refs.remember.showMessage('error', convertServerError(error.message));
            }
        },
        onSuccess() {
            this.$router.push('/login');
        }
    },
}
</script>

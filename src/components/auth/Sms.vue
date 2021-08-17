<template>
    <div class="auth-page">
        <img src="/assets/images/brand/logo.png" class="auth-page__logo" />
        <!-- Авторизация -->
        <div class="auth-block">
            <div class="auth-block__title">Введите СМС из сообщения</div>
            <Validate
                v-if="schema"
                formName="sms"
                :schema="schema"
                ref="sms"
                :card="false"
                @onSubmit="login"
                @onSuccess="onSuccess"
            >
                <div class="auth-block__field-container auth-block__field-container--phone">

                    <input :value="phone"class="auth-block__field" type="tel" name="phone" placeholder="Номер телефона" formName="sms" disabled/>
                </div>
                <div class="auth-block__field-container auth-block__field-container--pass">
                    <Field className="auth-block__field" type="text" name="sms" placeholder="Код из СМС" formName="sms" />
                </div>
                <button class="auth-block__submit-btn btn btn-primary" type="submit" @click.prevent="$refs.sms.submit">Войти</button>

            </Validate>
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
            sms: [required]
        },
        remember: true,
        phone: null
    }),
    mounted: async function (){
        this.phone = this.$route.params.tel
    },
    methods: {
        async login() {
            const cache = this.$store.getters['cache/data'];
            const userData = {
                phone: this.phone,
                sms: cache.sms
            };

            try {
                const { errors, data } = await this.$apollo.mutate({
                    mutation: gql `
                                mutation login ($data: RequestTokenAdminInput!) {
                                    token: requestTokenAdmin(input: $data)
                                }
                            `,
                    variables: {
                        data: userData
                    }
                });

                this.$refs.sms.process({ errors, data, success: 'Переадресация...' });
            } catch (error) {
                this.$refs.sms.showMessage('error', convertServerError(error.message));
            }
        },
        onSuccess({ token }) {
            this.$store.dispatch('auth/requestUserData', {token, remember: this.remember, phone: this.phone});

        }
    },
}
</script>

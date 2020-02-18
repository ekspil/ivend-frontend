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
                <div class="auth-block__field-container auth-block__field-container--phone">

                    <Field :newmasked="true" className="auth-block__field" type="tel" name="phone" placeholder="Номер телефона" mask="\+9 (999) 999-99-99" formName="remember"  />
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

export default {
    name: 'Remember',
    components: {
        Validate,
        Field
    },
    data: () => ({
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
                phone: cache.phone.replace(/[()+\s-]/gi, '').slice(1)
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

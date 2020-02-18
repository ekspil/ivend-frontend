<template>
    <div class="auth-page" v-if="token.length === 128">
        <img src="assets/images/brand/logo.png" class="auth-page__logo" />
        <!-- Регистрация -->
        <div class="auth-block">
            <div class="auth-block__title">Установка нового пароля</div>
            <Validate v-if="schema" formName="register" :schema="schema" ref="register" :card="false" @onSubmit="register" @onSuccess="onSuccess">

                <!-- Второй шаг регистрации -->
                <div class="auth-block__field-container auth-block__field-container--password" >
                    <div class="auth-block__field-container auth-block__field-container--pass" >
                        <Field className="auth-block__field" type="password" name="password" placeholder="Пароль" formName="register" />
                    </div>
                    <div class="auth-block__field-container auth-block__field-container--pass" >
                        <Field className="auth-block__field" type="password" name="rePassword" placeholder="Повторите пароль" formName="register" />
                    </div>

                    <button class="auth-block__submit-btn btn btn-primary" type="submit" @click.prevent="start">Установить пароль</button>

                </div>
            </Validate>

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

        }),
        computed:{
            token: function(){
                const url = new URL(document.location.href)
                const token = url.searchParams.get('token')
                return token
            }
        },
        methods: {
            async start(){

                this.$refs.register.submit();
            },
            async register() {
                const cache = this.$store.getters['cache/data'];


                try {
                    const { errors, data } = await this.$apollo.mutate({
                        mutation: gql `
                            mutation changePasswordRequest ($input: ChangePasswordInput!) {
                                changePasswordRequest(input: $input)
                            }
                        `,
                        variables: {
                            input: {
                                password: cache.rePassword,
                                token: this.token
                            }
                        }
                    });
                    this.$refs.register.showMessage('success', "Параль изменен! Переадрессация на страницу авторизации..");
                    setTimeout(this.onSuccess, 4500)
                } catch (error) {
                    return this.$refs.register.showMessage('error', convertServerError(error.message));
                }
            },
            async onSuccess() {

                this.$router.push('/login');
            }
        },

        created() {
            const rePasswordValidator = bind(function(rePassword) {
                const cache = this.$store.state.cache.register.data;

                return { error: equals(rePassword, cache.password) ? null : 'Пароли не совпадают.' };
            }, this);

            this.schema = {
                password: [required],
                rePassword: [required, rePasswordValidator]
            };
        },
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

<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">

                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">

                                    <div class="form-group">
                                        <label class="form-label f-b">Модель фискального регистратора</label>
                                        <select v-model="input.kktModel" class="form-control custom-select" name="kktModel">
                                            <option value="UMKA">UMKA</option>
                                            <option value="IVEND">IVEND</option>

                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">ИНН</label>
                                        <input class="form-control"  v-model="input.inn" disabled name="inn" formName="editFiscal" placeholder="Введите ИНН"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Компания</label>
                                        <input class="form-control"  v-model="input.companyName" disabled name="companyName" formName="editFiscal" placeholder="Компания"/>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template slot="submit">
                            <button v-on:click="save"  type="submit" class="btn btn-primary ml-auto">Отправить заявку на подключение</button>
                        </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    import { convertServerError } from '@/utils';
    import { required } from '@/utils/validation';

    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';

    export default {
        name: 'AddFiscal',
        components: {
            Validate,
            Field
        },
        data: () => ({
            kkt: {
              profile: {}
            },
            input: {
                kktModel: "",
                inn: "",
                companyName: ""

            },

            schema: {
            }
        }),
        apollo: {
            kkt: {
                query: gql`
			query {
				getProfile {
                    legalInfo{
                        inn
                        companyName
            }
          }
			}
			`,
                update ({ getProfile}) {


                        this.input = {
                            inn: getProfile.legalInfo.inn,
                            companyName: getProfile.legalInfo.companyName
                        };


                    return {
                        profile: getProfile

                    };
                }
            }
        },
        methods: {
            async save () {

                try {
                    const { errors } = await this.$apollo.mutate({
                        mutation: gql`
					mutation saveKkt ($input: CreateKktInput!) {
						createKkt (input: $input) {
							id
						}
					}
					`,
                        variables: {
                            input: {
                                kktModel: this.input.kktModel,
                                inn: this.input.inn,
                                companyName: this.input.companyName
                            }
                        }
                    });

                    this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
                    const router = this.$router;
                    setTimeout(function () { router.push('/fiscal'); }, 3000);
                } catch (error) {
                    this.$refs.form.showMessage('error', convertServerError(error.message));
                }
            },
            onSuccess () {

            },

            getBillingAbbr (date) {
                if (date === 'DAILY') {
                    return 'день';
                } else if (date === 'MONTHLY') {
                    return 'мес.';
                }
            }
        }
    }
</script>

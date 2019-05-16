<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">
                    <Validate
                            formName="addFiscal"
                            title="Добавление фискального аппарата"
                            :schema="schema" ref="form"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">

                                    <div class="form-group">
                                        <label class="form-label f-b">Модель фискального регистратора</label>
                                        <select v-model="input.kktModel" class="form-control custom-select" name="kktModel">
                                            <option value="UMKA">Стандартный</option>

                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">ИНН</label>
                                        <select class="form-control custom-select" v-model="input.inn" name="inn">
                                            <option :value="kkt.inn">{{kkt.inn}}</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Компания</label>
                                        <select class="form-control custom-select" v-model="input.companyName" name="companyName">
                                            <option :value="kkt.companyName">{{kkt.companyName}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template slot="submit">
                            <button type="submit" class="btn btn-primary ml-auto">Отправить заявку на подключение</button>
                        </template>
                    </Validate>
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
                kktModel: "UMKA",
                inn: "",
                companyName: ""

            },

            schema: {
                kktModel: [required],
                inn: [required],
                companyName: [required]
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

                        this.kkt = {
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
                console.log(this.input);
                let input = this.input;
                input.inn = String(input.inn);
                input.companyName = String(input.companyName);
                input.kktModel = String(input.kktModel);


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
                            input: input
                        }
                    });

                    this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
                } catch (error) {
                    this.$refs.form.showMessage('error', convertServerError(error.message));
                    console.log(error);
                }
            },
            onSuccess () {
                const router = this.$router;
                setTimeout(function () { router.push('/fiscal'); }, 1000);
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

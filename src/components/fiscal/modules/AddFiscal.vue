<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">
                    <Validate
                            formName="addFiscal"
                            title="Добавление кассы"
                            :schema="schema" ref="form"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">

                                    <div class="form-group">
                                        <label class="form-label f-b">Касса</label>
                                        <select v-model="input.type" class="form-control custom-select" @change="selectDefaultFN()">

                                            <option value="orange">OrangeData(Россия)</option>
                                            <option value="umka">Умка (Россия)</option>
                                            <option value="rekassa">Рекасса (Казахстан)</option>
                                            <option value="telemedia">Телемедиа (Киргизия)</option>

                                        </select>
                                    </div>
                                    <div class="form-group" >
                                        <label class="form-label f-b">Модель онлайн кассы</label>
                                        <select v-model="input.kktModel" class="form-control custom-select">
                                            <option value="УМКА-01-ФА (ФН15)" v-if="input.type === 'umka'">УМКА-01-ФА (ФН15)</option>
                                            <option value="УМКА-01-ФА (ФН36)" v-if="input.type === 'umka'">УМКА-01-ФА (ФН36)</option>
                                            <option value="ORANGE_DATA" v-if="input.type === 'orange'">ORANGE DATA</option>
                                            <option value="REKASSA" v-if="input.type === 'rekassa'">Рекасса Online KKM</option>
                                            <option value="TELEMEDIA" v-if="input.type === 'telemedia'">Телемедиа Online KKM</option>

                                        </select>
                                    </div>




                                  <div class="form-group" v-if="input.type === 'rekassa'">
                                    <label class="form-label f-b">Номер кассы</label>
                                    <Field className="form-control" value=""   name="rekassaNumber" formName="addFiscal" placeholder="Введите номер кассы"/>
                                  </div>

                                    <div class="form-group" v-if="input.type === 'rekassa'">
                                        <label class="form-label f-b">Пароль кассы</label>
                                        <Field className="form-control" value=""   name="rekassaPassword" formName="addFiscal" placeholder="Введите пароль кассы"/>
                                    </div>


                                  <div class="form-group" v-if="kkt.profile">
                                    <label class="form-label f-b">ИНН</label>
                                    <Field className="form-control" :value="kkt.profile.legalInfo.inn"  disabled name="inn" formName="addFiscal" placeholder="Введите ИНН"/>
                                  </div>

                                    <div class="form-group" v-if="kkt.profile">
                                        <label class="form-label f-b">Компания</label>
                                        <Field className="form-control" :value="kkt.profile.legalInfo.companyName" disabled name="companyName" formName="addFiscal" placeholder="Компания"/>
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
        name: 'addFiscal',
        components: {
            Validate,
            Field
        },
        data: () => ({
            kkt: {
                profile: null
            },
            input: {
                kktModel: "УМКА-01-ФА (ФН36)",
                type: "umka"

            },

            schema: {
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
                update ({getProfile}) {

                    return {
                        profile: getProfile
                    };
                }
            }
        },
        methods: {
            selectDefaultFN(){
              switch (this.input.type){
                case "umka":
                  this.input.kktModel = "УМКА-01-ФА (ФН36)"
                  break;
                case "rekassa":
                  this.input.kktModel = "REKASSA"
                  break;
                case "telemedia":
                  this.input.kktModel = "TELEMEDIA"
                  break;

              }

            },
            async save () {
                const data = {
                    kktModel: this.input.kktModel,
                    type: this.input.type,
                    ...this.$store.getters['cache/data']
                };

                try {
                    const { errors } = await this.$apollo.mutate({
                        mutation: gql`
					mutation saveKkt ($data: CreateKktInput!) {
						createKkt (input: $data) {
							id
						}
					}
					`,
                        variables: {
                            data: data
                        }
                    });

                    this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
                } catch (error) {
                    this.$refs.form.showMessage('error', convertServerError(error.message));
                }
            },
            onSuccess () {
                const router = this.$router;
                setTimeout(function () { router.push('/settings#fiscal'); }, 1000);
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

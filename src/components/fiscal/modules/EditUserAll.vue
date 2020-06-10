<template>
    <div class="container">
        <div class="side-app" v-if="user">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2 card">
                    <div class="card-header" v-if="user.legalInfo">
                        <h3 class="card-title f-b">Информация о компании {{user.legalInfo.companyName}}</h3>
                    </div>

                    <Validate
                            routeBack="/fiscalAll#usersAll"
                            formName="editUser"
                            ref="form"
                            :schema="schema"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">Компания</label>
                                        <input class="form-control" v-model="user.legalInfo.companyName" name="companyName" formName="editUser" placeholder="У компании не указано название"/>
                                    </div>

                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">ИНН</label>
                                        <Field className="form-control" :value="user.legalInfo.inn"  disabled name="inn" formName="editUser" placeholder="У компании не указан ИНН"/>
                                    </div>



                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">ОГРН</label>
                                        <Field className="form-control" :value="user.legalInfo.ogrn" disabled name="companyName" formName="editUser" placeholder="У компании не указан ОГРН"/>
                                    </div>

                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">СНО</label>
                                        <Field className="form-control" :value="snoString" disabled name="sno" formName="editUser" placeholder="У компании не указана СНО"/>
                                    </div>

                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">Юридический адрес</label>
                                        <Field className="form-control" :value="user.legalInfo.legalAddress" disabled name="companyName" formName="editUser" placeholder="У компании не указан юр.адрес"/>
                                    </div>

                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">Фактический адрес</label>
                                        <Field className="form-control" :value="user.legalInfo.actualAddress" disabled name="companyName" formName="editUser" placeholder="У компании не указан фактический адрес"/>
                                    </div>

                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">Директор</label>
                                        <Field className="form-control" :value="user.legalInfo.director" disabled name="companyName" formName="editUser" placeholder="У компании не указан директор"/>
                                    </div>

                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">Телефон директора</label>
                                        <Field className="form-control" :value="user.legalInfo.directorPhone" disabled name="companyName" formName="editUser" placeholder="У компании не указан телефон директора"/>
                                    </div>

                                    <div class="form-group" v-if="user.legalInfo">
                                        <label class="form-label f-b">Почта директора</label>
                                        <Field className="form-control" :value="user.legalInfo.directorEmail" disabled name="companyName" formName="editUser" placeholder="У компании не указана почта директора"/>
                                    </div>

                                </div>
                            </div>
                        </template>
                        <template slot="submit" v-if="user.legalInfo">
                            <button type="submit" class="btn btn-primary ml-auto" >Сохранить</button>
                        </template>
                    </Validate>

                    <div class="aligned-text" v-if="$apollo.loading">Загрузка...</div>

                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import gql from 'graphql-tag';

    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';

    import { required, email, number } from '@/utils/validation';

    export default {
        components: {
            Validate,
            Field
        },
        data: () => ({
            user: null,
            sum: 0,
            schema: {
                companyName: [required],
                city: [required],
                actualAddress: [required],
                inn: [required, number],
                ogrn: [required],
                legalAddress: [required],
                director: [required],
                directorPhone: [required],
                directorEmail: [required, email],
                contactPerson: [required],
                contactPhone: [required],
                contactEmail: [required, email],
                sno: [required]
            },

            userUploading: false
        }),
        apollo: {
            user: {
                query: gql ` query($input: AllUsersInput) {
                      getAllUsers(input: $input) {
                            phone
                            id
                            email
                            role
                            legalInfo{
                                    companyName,
									city,
									actualAddress,
									inn,
									ogrn,
									legalAddress,
									director,
									directorPhone,
									directorEmail,
									contactPerson,
									contactPhone,
									contactEmail,
									sno
                                }
                             }
                    }
      `,
                variables () {
                    return {
                        input: {
                            userId: Number(this.$route.params.id)
                        }
                    };
                },
                update(user) {
                    const [returnedData] = user.getAllUsers

                    return returnedData

                }
            }
        },
        methods: {
            async save () {
                try {

                    const { errors, data } = await this.$apollo.mutate({
                        mutation: gql`
							mutation saveCompanyInfo ($input: LegalInfoToUserInput!) {
								updateLegalInfoToUser(input: $input) {
									companyName,
									city,
									actualAddress,
									inn,
									ogrn,
									legalAddress,
									director,
									directorPhone,
									directorEmail,
									contactPerson,
									contactPhone,
									contactEmail,
									sno
								}
							}
						`,
                        variables: {
                            input: {
                                userId: this.user.id,
                                companyName: this.user.legalInfo.companyName,
                                city: this.user.legalInfo.city,
                                actualAddress: this.user.legalInfo.actualAddress,
                                inn: this.user.legalInfo.inn,
                                ogrn: this.user.legalInfo.ogrn,
                                legalAddress: this.user.legalInfo.legalAddress,
                                director: this.user.legalInfo.director,
                                directorPhone: this.user.legalInfo.directorPhone,
                                directorEmail: this.user.legalInfo.directorEmail,
                                contactPerson: this.user.legalInfo.contactPerson,
                                contactPhone: this.user.legalInfo.contactPhone,
                                contactEmail: this.user.legalInfo.contactEmail,
                                sno: this.user.legalInfo.sno
                            }
                        }
                    });


                    this.$refs.form.process({ errors, data, success: 'Успешно сохранено.' });
                } catch (error) {
                    console.error(error)
                    this.$refs.form.showMessage('error', 'Ошибка сохранения.');
                }
            },
            onSuccess () {
                const router = this.$router;
                setTimeout(function () { router.push('/fiscalAll#usersAll'); }, 1000);
            },

            getBillingAbbr (date) {
                if (date === 'DAILY') {
                    return 'день';
                } else if (date === 'MONTHLY') {
                    return 'мес.';
                }
            }
        },
        computed: {
            snoString: function (){
                if(!this.user.legalInfo) return "Не заполнена информация о компании"
                switch (this.user.legalInfo.sno){
                    case "usn_income":
                        return "УСН доходы"
                    case "usn_income_outcome":
                        return "УСН доходы-расходы"
                    case "envd":
                        return "ЕНВД"
                    case "patent":
                        return "Патент"
                    case "osn":
                        return "ОСН"
                    case "esn":
                        return "ЕСН"
                    default:
                        return "Не указана СНО"

                }
            }
        }
    }
</script>

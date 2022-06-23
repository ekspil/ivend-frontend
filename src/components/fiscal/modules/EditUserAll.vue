<template>
    <div class="container">
        <div class="side-app" v-if="user">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2 card">
                    <div class="card-header" v-if="user.legalInfo">
                        <h3 class="card-title f-b">Информация о компании {{user.legalInfo.companyName}}</h3>
                    </div>
                  <div class="company-settings">
                    <Validate
                            className="company-settings__form"
                            routeBack="/fiscalAll#usersAll"
                            formName="company"
                            ref="form"
                            :schema="schema"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                    >
                        <template slot="form">
                          <div class="company-settings">
                            <label for="company-name" class="company-settings__field-label">Название
                              компании</label>
                            <Field id="company-name" name="companyName" className="company-settings__field" type="text"
                                   placeholder="Название компании" formName="company" :value="user.legalInfo.companyName" />
                          </div>

                          <div class="company-settings">
                            <label for="company-city"
                                   class="company-settings__field-label">Город</label>
                            <Field id="company-city" className="company-settings__field" formName="company" type="text" name="city"
                                   placeholder="Город" :value="user.legalInfo.city"/>
                          </div>

                          <div class="company-settings">
                            <label for="company-fact-address" class="company-settings__field-label">Адрес
                              фактический</label>
                            <Field id="company-fact-address" className="company-settings__field" formName="company" type="text"
                                   placeholder="Адрес фактический" :value="user.legalInfo.actualAddress" name="actualAddress"/>
                          </div>

                          <div class="company-settings">
                            <label for="company-inn" class="company-settings__field-label">ИНН</label>
                            <Field id="company-inn" className="company-settings__field" formName="company" type="text"
                                   placeholder="ИНН" name="inn" :value="user.legalInfo.inn"/>
                          </div>

                          <div class="company-settings">
                            <label for="company-ogrn" class="company-settings__field-label">ОГРН</label>
                            <Field id="company-ogrn" className="company-settings__field" formName="company" type="text"
                                   placeholder="ОГРН" name="ogrn" :value="user.legalInfo.ogrn" />
                          </div>


                          <div class="company-settings">
                            <label for="company-legal-address" class="company-settings__field-label">Адрес
                              юридический</label>
                            <Field id="company-legal-address" className="company-settings__field" formName="company"
                                   type="text" placeholder="Адрес юридический" :value="user.legalInfo.legalAddress" name="legalAddress"/>
                          </div>




                          <div class="company-settings">
                            <label for="company-kpp" class="company-settings__field-label">КПП</label>
                            <Field id="company-kpp" className="company-settings__field" formName="company" type="text"
                                   placeholder="КПП" name="kpp" :value="user.legalInfo.kpp"/>
                          </div>



                          <div class="company-settings">
                            <label for="company-time" class="company-settings__field-label">Часовой пояс</label>
                            <select id="company-time" v-model="user.legalInfo.timeZone" class="form-control custom-select">
                              <option value="0">МСК -3</option>
                              <option value="1">МСК -2</option>
                              <option value="2">МСК -1</option>
                              <option value="3">МСК</option>
                              <option value="4">МСК +1</option>
                              <option value="5">МСК +2</option>
                              <option value="6">МСК +3</option>
                              <option value="7">МСК +4</option>
                              <option value="8">МСК +5</option>
                              <option value="9">МСК +6</option>
                              <option value="10">МСК +7</option>
                              <option value="11">МСК +8</option>
                              <option value="12">МСК +9</option>

                            </select>
                          </div>




                          <div class="company-settings">
                            <label for="company-director" class="company-settings__field-label">Директор</label>
                            <Field id="company-director" className="company-settings__field" formName="company" type="text"
                                   placeholder="Директор" :value="user.legalInfo.director" name="director" />
                          </div>

                          <div class="company-settings">
                            <label for="company-director-phone" class="company-settings__field-label">Телефон директора</label>
                            <Field :masked="true" mask="\+\7 (111) 111 11-11"
                                   id="company-director-phone" className="company-settings__field" formName="company" type="tel"
                                   placeholder="Телефон директора" :value="user.legalInfo.directorPhone" name="directorPhone" />
                          </div>

                          <div class="company-settings">
                            <label for="company-director-email" class="company-settings__field-label">Почта директора</label>
                            <Field id="company-director-email" className="company-settings__field" formName="company"
                                   type="text" placeholder="Почта директора" :value="user.legalInfo.directorEmail" name="directorEmail" />
                          </div>




                          <div class="company-settings">
                            <label for="company-contact-name" class="company-settings__field-label">Контактное лицо</label>
                            <Field id="company-contact-name" className="company-settings__field" formName="company" type="text"
                                   placeholder="Контактное лицо" :value="user.legalInfo.contactPerson" name="contactPerson" />
                          </div>

                          <div class="company-settings">
                            <label for="company-contact-phone" class="company-settings__field-label">Контактный телефон</label>
                            <Field :masked="true" mask="\+\7 (111) 111 11-11" id="company-contact-phone"
                                   className="company-settings__field" formName="company" type="tel"
                                   placeholder="Контактный телефон" :value="user.legalInfo.contactPhone" name="contactPhone" />
                          </div>

                          <div class="company-settings">
                            <label for="company-contact-email" class="company-settings__field-label">Контактная почта</label>
                            <Field id="company-contact-email" className="company-settings__field" formName="company"
                                   type="text" placeholder="Контактная почта" :value="user.legalInfo.contactEmail" name="contactEmail" />
                          </div>


                          <div class="company-settings">
                            <label for="company-sno" class="company-settings__field-label">Система налогообложения</label>
                            <select id="company-sno" v-model="user.legalInfo.sno" class="form-control custom-select">
                              <option value="usn_income">УСН доходы</option>
                              <option value="usn_income_outcome">УСН доходы-расходы</option>
                              <option value="envd">ЕНВД</option>
                              <option value="patent">Патент</option>
                              <option value="osn">ОСН</option>
                              <option value="esn">ЕСН</option>

                            </select>
                          </div>
                        </template>
                        <template slot="submit" v-if="user.legalInfo">
                            <button type="submit" class="btn btn-primary ml-auto" >Сохранить</button>
                        </template>
                    </Validate>
                  </div>

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
									kpp
									timeZone
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

                  const cache = this.$store.getters['cache/data']

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
                                ...cache,
                                directorPhone: cache.directorPhone.replace(/[()+\s-]/gi, '').slice(1),
                                contactPhone: cache.contactPhone.replace(/[()+\s-]/gi, '').slice(1),
                                sno: this.user.legalInfo.sno,
                                timeZone: this.user.legalInfo.timeZone || '3'
                            }
                        }
                    });


                    this.$refs.form.process({ errors, data, success: 'Успешно сохранено.' });
                } catch (error) {
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

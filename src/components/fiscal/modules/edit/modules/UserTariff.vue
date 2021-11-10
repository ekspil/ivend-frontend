<template>
    <div class="container">
        <div class="side-app" v-if="user">

                    <Validate
                            :routeBack=from
                            formName="editUserData"
                            ref="form2"
                            :schema="schema"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                            :noHeader="true"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="form-group" >
                                        <label class="form-label f-b">EMAIL</label>
                                        <Field className="form-control" :value="user.email" name="email" :disabled="true" formName="editUserData" placeholder="У компании не указана почта"/>
                                    </div>


                                    <div class="form-group">
                                        <label class="form-label f-b">Телефон (без +7 и 8 и прочих символов)</label>
                                        <Field className="form-control" :value="user.phone" name="phone"  :disabled="true"  formName="editUserData" placeholder="У компании не указан телефон"/>
                                    </div>

                                    <div class="form-group" v-if="user.role === 'PARTNER'">
                                        <label class="form-label f-b">Комиссия контроллеров</label>
                                        <input class="form-control" v-model="partner.controllerFee" type="number" formName="editUserData" placeholder="Процент"/>
                                    </div>
                                    <div class="form-group" v-if="user.role === 'PARTNER'">
                                        <label class="form-label f-b">Комиссия ККМ</label>
                                        <input class="form-control" v-model="partner.kkmFee" type="number" formName="editUserData" placeholder="Процент"/>
                                    </div>
                                    <div class="form-group" v-if="user.role === 'PARTNER'">
                                        <label class="form-label f-b">Комиссия терминалов</label>
                                        <input class="form-control" v-model="partner.terminalFee" type="number" formName="editUserData" placeholder="Процент"/>
                                    </div>





                                </div>
                            </div>
                        </template>
                        <template slot="submit" v-if="user">
                            <button type="submit" class="btn btn-primary ml-auto" >Сохранить</button>
                        </template>


                    </Validate>

                    <div class="aligned-text" v-if="$apollo.loading">Загрузка...</div>

                </div>
            </div>

</template>


<script>
    import gql from 'graphql-tag';
    import axios from 'axios';

    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';

    import { required} from '@/utils/validation';

    export default {
        components: {
            Validate,
            Field
        },
      mounted() {
          if(this.$route.query.from === "partner"){
            this.from = "/fiscalAll#partners"
          }
      },
      data: () => ({
            from: "/fiscalAll#usersAll",
            partner: {
              controllerFee: null,
              terminalFee: null,
              kkmFee: null
            },
            newPassword: null,
            user: null,
            partnerId: null,
            schema: {
                email: [required],
                phone: [required]
            },
            userUploading: false,
            file: null,

            fileOferta: null,
            fileLogo: null,
            infoRequisites: null,
            infoMailTech: null,
            infoPhoneTech: null,
            infoPhoneCom: null,
        }),
        apollo: {
            user: {
                query: gql ` query($input: AllUsersInput) {
                      getAllUsers(input: $input) {
                            phone
                            id
                            email
                            role
                            partnerId
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
                    this.partnerId = returnedData.partnerId
                    return returnedData

                }
            },
            partner: {
                query: gql ` query($userId: Int!) {
                      getPartnerFee(userId: $userId) {
                            controllerFee
                            terminalFee
                            kkmFee
                             }
                        }
                        `,
                variables () {
                    return {
                      userId: Number(this.$route.params.id)
                    };
                },
                update(partner) {
                    if(!partner.getPartnerFee){
                      return this.partner
                    }
                    return partner.getPartnerFee
                }
            },
        },
        methods: {
           async handleFileUpload(fileName){
              this.file = this.$refs[fileName].files[0];
              let formData = new FormData();
              formData.append('file', this.file);
              try {
                await axios.post( `/api/v1/files/upload/${this.user.id}/${this.file.name}`,
                    formData,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': 'Bearer ' + this.$store.state.auth.token
                      }
                    }
                )
                this[fileName] = `${this.file.name}`
                this.$refs.form2.showMessage('success', 'Файл загружен на сервер');


              }
              catch(e) {
                this.$refs.form2.showMessage('error', 'Ошибка загрузки.');
              }
            },
            async save () {
                try {

                    if(this.user.role === "PARTNER" && (this.partner.controllerFee || this.partner.controllerFee || this.partner.kkmFee)){

                      const {errors, data} = await this.$apollo.mutate({
                        mutation: gql`
							mutation changePartnerFee ($input: ChangePartnerFeeInput!) {
								changePartnerFee(input: $input) {
									userId
								}
							}
						`,
                        variables: {
                          input: {
                            userId: this.user.id,
                            controllerFee: Number(this.partner.controllerFee),
                            terminalFee: Number(this.partner.terminalFee),
                            kkmFee: Number(this.partner.kkmFee),
                          }
                        }
                      });


                      this.$refs.form2.process({ errors, data, success: 'Успешно сохранено.' });
                    }

                } catch (error) {
                    this.$refs.form2.showMessage('error', 'Ошибка сохранения.');
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

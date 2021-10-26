<template>
    <div class="container">
        <div class="side-app" v-if="user">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2 card">
                    <div class="card-header" v-if="user">
                        <h3 class="card-title f-b">Информация о пользователе {{user.id}}</h3>
                    </div>

                    <Validate
                            :routeBack=from
                            formName="editUserData"
                            ref="form"
                            :schema="schema"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="form-group" >
                                        <label class="form-label f-b">EMAIL</label>
                                        <Field className="form-control" :value="user.email" name="email" formName="editUserData" placeholder="У компании не указана почта"/>
                                    </div>


                                    <div class="form-group">
                                        <label class="form-label f-b">Телефон (без +7 и 8 и прочих символов)</label>
                                        <Field className="form-control" :value="user.phone" name="phone" formName="editUserData" placeholder="У компании не указан телефон"/>
                                    </div>


                                        <div class="form-group">
                                            <label class="form-label f-b">Роль</label>
                                            <select class="form-control custom-select" v-model="user.role">
                                                <option value="VENDOR">VENDOR</option>
                                                <option value="PARTNER">PARTNER</option>
                                                <option value="ADMIN">ADMIN</option>
                                                <option value="VENDOR_NEGATIVE_BALANCE">VENDOR_NEGATIVE_BALANCE</option>
                                                <option value="VENDOR_NOT_CONFIRMED">VENDOR_NOT_CONFIRMED</option>
                                                <option value="VENDOR_NO_LEGAL_INFO">VENDOR_NO_LEGAL_INFO</option>
                                                <option value="AGGREGATE">AGGREGATE</option>
                                                <option value="CLOSED">CLOSED</option>
                                            </select>
                                        </div>

                                    <div class="form-group" >
                                        <label class="form-label f-b">Новый пароль</label>
                                        <input class="form-control" v-model="newPassword" name="companyName" formName="editUserData" placeholder="Не заполнять без особой надобности"/>
                                    </div>


                                    <div class="form-group" v-if="user.role !== 'PARTNER'">
                                        <label class="form-label f-b">Партнер</label>
                                        <input class="form-control" v-model="partnerId" name="partnerId" formName="editUserData" placeholder="Без партнера"/>
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

                    <div class="row card-body" v-if="user.role === 'PARTNER'">


                      <div class="col-md-12 col-lg-12">
                        <div class="form-group">

                          <h3 class="card-title f-b">Персонализация партнера</h3>
                        </div>
                        <div class="form-group"></div>

                        <label class="form-label f-b">Лототип</label>
                        <input  class="form-control " type="file" id="fileLogo" ref="fileLogo" v-on:change="handleFileUpload('fileLogo')"/>
                        <div class="form-group">
                          <label class="form-label f-b">Договор оферты</label>
                          <input  class="form-control " type="file" id="fileOferta" ref="fileOferta" v-on:change="handleFileUpload('fileOferta')"/>
                        </div>
                        <div class="form-group" >
                          <label class="form-label f-b">Используемый файл логотипа</label>
                          <input class="form-control" v-model="fileLogo" name="fileLogo"  disabled="true" placeholder=""/>
                        </div>
                        <div class="form-group" >
                          <label class="form-label f-b">Используемый файл договора</label>
                          <input class="form-control" v-model="fileOferta" name="fileOferta"   disabled="true"  placeholder=""/>
                        </div>
                        <div class="form-group" >
                          <label class="form-label f-b">Телефон заголовок</label>
                          <input class="form-control" v-model="infoPhoneCom" name="infoPhoneCom"  placeholder="Телефон в заголовке"/>
                        </div>
                        <div class="form-group" >
                          <label class="form-label f-b">Телефон тех службы</label>
                          <input class="form-control" v-model="infoPhoneTech" name="infoPhoneTech"  placeholder="Телефон тех службы"/>
                        </div>
                        <div class="form-group" >
                          <label class="form-label f-b">Телефон тех службы</label>
                          <input class="form-control" v-model="infoMailTech" name="infoMailTech"  placeholder="Почта тех службы"/>
                        </div>

                        <div class="form-group" >
                          <label class="form-label f-b">Телефон тех службы</label>
                          <input class="form-control" type="textarea" v-model="infoRequisites" name="infoRequisites"  placeholder="Реквизиты"/>
                        </div>

                      </div>
                      <div class="col-md-12 col-lg-12">
                      <button type="submit" class="btn btn-primary ml-auto" @click.prevent="updatePartnerInfo" >Задать</button>
                      </div>
                    </div>

                    <div class="aligned-text" v-if="$apollo.loading">Загрузка...</div>

                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import gql from 'graphql-tag';
    import axios from 'axios';

    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';

    import { required, email, number } from '@/utils/validation';

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
            partnerInfo: {
                query: gql `query($partnerId: Int!) {
                                getPartnerInfo(partnerId: $partnerId) {
                                    partnerId
                                    fileOferta
                                    fileLogo
                                    infoRequisites
                                    infoMailTech
                                    infoPhoneTech
                                    infoPhoneCom
                             }
                        }
                        `,
                variables () {
                    return {
                      partnerId: Number(this.$route.params.id)
                    };
                },
                update(partnerInfo) {
                    if(!partnerInfo.getPartnerInfo){
                      return
                    }

                      this.fileOferta = partnerInfo.getPartnerInfo.fileOferta
                      this.fileLogo = partnerInfo.getPartnerInfo.fileLogo
                      this.infoRequisites = partnerInfo.getPartnerInfo.infoRequisites
                      this.infoMailTech = partnerInfo.getPartnerInfo.infoMailTech
                      this.infoPhoneTech = partnerInfo.getPartnerInfo.infoPhoneTech
                      this.infoPhoneCom = partnerInfo.getPartnerInfo.infoPhoneCom

                    return
                }
            },
        },
        methods: {
           async handleFileUpload(fileName){
              this.file = this.$refs[fileName].files[0];
              let formData = new FormData();
              formData.append('file', this.file);
              try {
                await axios.post( `http://localhost:3210/api/v1/files/upload/${this.user.id}/${this.file.name}`,
                    formData,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': 'Bearer ' + this.$store.state.auth.token
                      }
                    }
                )
                this[fileName] = `${this.file.name}`
                this.$refs.form.showMessage('success', 'Файл загружен на сервер');


              }
              catch(e) {
                this.$refs.form.showMessage('error', 'Ошибка загрузки.');
              }
            },
          async updatePartnerInfo(){


              try{
                let {error, data } = await this.$apollo.mutate({
                  mutation: gql`
                    mutation updatePartnerInfo ($input: PartnerInfoInput!) {
                      updatePartnerInfo(input: $input) {
                        partnerId
                      }
                    }
                  `,
                  variables: {
                    input: {
                      partnerId: this.user.id,
                      fileOferta: this.fileOferta,
                      fileLogo: this.fileLogo,
                      infoRequisites: this.infoRequisites,
                      infoMailTech: this.infoMailTech,
                      infoPhoneTech: this.infoPhoneTech,
                      infoPhoneCom: this.infoPhoneCom,
                    }
                  }
                })
              }
              catch (e) {

              }
          },
            async save () {
                try {
                    const input = {
                        ...this.$store.getters['cache/data'],
                        role: this.user.role,
                        id: this.user.id
                    }
                    if(this.newPassword){
                        input.password = this.newPassword
                    }
                    if(this.partnerId){
                        input.partnerId = Number(this.partnerId)
                    }
                    let { errors, data } = await this.$apollo.mutate({
                        mutation: gql`
							mutation saveUserInfo ($input: UpdateUserInput!) {
								updateUser(input: $input) {
									id
								}
							}
						`,
                        variables: {
                            input
                        }
                    });
                    if(this.user.role === "PARTNER" && (this.partner.controllerFee || this.partner.controllerFee || this.partner.kkmFee)){

                      await this.$apollo.mutate({
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

                    }


                    this.$refs.form.process({ errors, data, success: 'Успешно сохранено.' });
                } catch (error) {
                    console.error(error)
                    this.$refs.form.showMessage('error', 'Ошибка сохранения.');
                }
            },
            onSuccess () {
                const router = this.$router;
                setTimeout(function () { router.push(this.from); }, 1000);
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

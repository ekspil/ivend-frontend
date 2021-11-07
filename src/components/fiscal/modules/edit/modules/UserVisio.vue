<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-12  ">
                    <div class="card-header" >
                        <h3 class="card-title f-b">Персонализация партнера {{user.id}}</h3>
                    </div>

                    <Validate
                            :routeBack=from
                            formName="editUserData"
                            ref="form3"
                            :schema="schema"
                            @onSubmit="updatePartnerInfo"
                            @onSuccess="onSuccess"
                    >
                      <template slot="form">
                        <div class="row">
                          <div class="col-md-12 col-lg-12">

                                      <div class="form-group" >
                                        <label class="form-label f-b">Используемый файл логотипа</label>
                                        <div class="row">
                                          <div class="col-6"><input class="form-control" style="height: 50px" v-model="fileLogo" name="fileLogo"   placeholder=""/></div>
                                          <div class="col-6"><input  class="form-control" style="height: 50px" type="file" id="fileLogo" ref="fileLogo" placeholder="Выберете новый файл" v-on:change="handleFileUpload('fileLogo')"/></div>
                                        </div>

                                      </div>
                                      <div class="form-group" >
                                        <label class="form-label f-b">Используемый файл договора</label>
                                        <div class="row">
                                          <div class="col-6"><input class="form-control" style="height: 50px" v-model="fileOferta" name="fileOferta"    placeholder=""/></div>
                                          <div class="col-6"><input  class="form-control " style="height: 50px" type="file" id="fileOferta" ref="fileOferta" v-on:change="handleFileUpload('fileOferta')"/></div>
                                        </div>

                                      </div>
                                      <div class="form-group" >
                                        <label class="form-label f-b">Телефон заголовок</label>
                                        <Field className="form-control" :value="infoPhoneCom" name="infoPhoneCom" formName="editUserData" placeholder="Телефон в заголовке"/>
                                      </div>
                                      <div class="form-group" >
                                        <label class="form-label f-b">Телефон тех службы</label>
                                        <input class="form-control" v-model="infoPhoneTech" name="infoPhoneTech"  placeholder="Телефон тех службы"/>
                                      </div>
                                      <div class="form-group" >
                                        <label class="form-label f-b">Почта тех службы</label>
                                        <input class="form-control" v-model="infoMailTech" name="infoMailTech"  placeholder="Почта тех службы"/>
                                      </div>

                                      <div class="form-group" >
                                        <label class="form-label f-b">Реквизиты</label>
                                        <input class="form-control" type="textarea" v-model="infoRequisites" name="infoRequisites"  placeholder="Реквизиты"/>
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
                infoPhoneCom: [required],
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
                      return partnerInfo.getPartnerInfo
                    }

                      this.fileOferta = partnerInfo.getPartnerInfo.fileOferta
                      this.fileLogo = partnerInfo.getPartnerInfo.fileLogo
                      this.infoRequisites = partnerInfo.getPartnerInfo.infoRequisites
                      this.infoMailTech = partnerInfo.getPartnerInfo.infoMailTech
                      this.infoPhoneTech = partnerInfo.getPartnerInfo.infoPhoneTech
                      this.infoPhoneCom = partnerInfo.getPartnerInfo.infoPhoneCom

                    return partnerInfo.getPartnerInfo
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
                this.$refs.form3.showMessage('success', 'Файл загружен на сервер');


              }
              catch(e) {
                this.$refs.form3.showMessage('error', 'Ошибка загрузки на сервер');
              }
            },
          async updatePartnerInfo(){


              try{
                let {errors, data } = await this.$apollo.mutate({
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
                      infoPhoneCom: this.$store.getters['cache/data']['infoPhoneCom'],
                    }
                  }
                })
                this.$refs.form3.process({ errors, data, success: 'Успешно сохранено' });
              }
              catch (e) {

                this.$refs.form3.showMessage('error', 'Ошибка сохранения');
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

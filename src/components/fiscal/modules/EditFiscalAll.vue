<template>
    <div class="container">
        <div class="side-app max-w-1200" v-if="data">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2 card">
                    <div class="card-header">
                        <h3 class="card-title f-b">Редактирование кассы №{{data.kkt.id}}</h3>
                    </div>

                    <Validate
                            routeBack="/fiscalAll#kktsAll"
                            formName="editFiscal"
                            ref="form"
                            :schema="schema"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">

                                    <div class="form-group">
                                        <label class="form-label f-b">ИНН</label>
                                        <Field className="form-control" :value="data.kkt.inn"  disabled name="inn" formName="editFiscal" placeholder="Введите ИНН"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Компания</label>
                                        <Field className="form-control" :value="data.kkt.companyName" disabled name="companyName" formName="editFiscal" placeholder="Компания"/>
                                    </div>


                                    <div class="form-group">
                                        <label class="form-label f-b">Тип фискального накопителя</label>
                                        <select v-model="data.kkt.kktModel" class="form-control custom-select">
                                            <option v-if="data.kkt.type === 'umka' || data.kkt.type === 'umka_new' " value="УМКА-01-ФА (ФН15)">УМКА-01-ФА (ФН15)</option>
                                            <option v-if="data.kkt.type === 'umka' || data.kkt.type === 'umka_new' "  value="УМКА-01-ФА (ФН36)">УМКА-01-ФА (ФН36)</option>
                                            <option v-if="data.kkt.type === 'orange'"  value="ORANGE_36">PAYONLINE-01-ФА (ФН36)</option>
                                            <option v-if="data.kkt.type === 'orange'"  value="ORANGE_15">PAYONLINE-01-ФА (ФН15)</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label f-b">Фискальный провайдер</label>
                                        <select v-model="data.kkt.type" class="form-control custom-select">
                                            <option value="umka">УМКА</option>
                                            <option value="umka_new">УМКА НОВОЕ API</option>
                                            <option value="rekassa">РЕКАССА</option>
                                            <option value="telemedia">ТЕЛЕМЕДИА</option>
                                            <option value="orange">OrangeData</option>
                                        </select>
                                    </div>
                                    <!--<div class="form-group">-->
                                        <!--<label class="form-label f-b">Модель ККТ</label>-->
                                        <!--<Field className="form-control" :value="data.kkt.kktModel"  name="kktModel" formName="editFiscal" placeholder="Модель ККТ"/>-->
                                    <!--</div>-->

                                    <div class="form-group">
                                        <label class="form-label f-b">Заводской номер</label>
                                        <Field className="form-control" :value="data.kkt.kktFactoryNumber" name="kktFactoryNumber" formName="editFiscal" placeholder="Заводской номер"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Регистрационный номер</label>
                                        <Field className="form-control" :value="data.kkt.kktRegNumber" name="kktRegNumber" formName="editFiscal" placeholder="Регистрационный номер"/>
                                    </div>


                                  <div class="form-group">
                                    <label class="form-label f-b">Компания ОФД</label>
                                    <select v-model="data.kkt.ofdName" class="form-control custom-select">
                                      <option v-for="item of ofdNames" :value="item.name" >{{item.text}}</option>

                                    </select>
                                  </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Номер ФН</label>
                                        <Field className="form-control" :value="data.kkt.kktFNNumber" name="kktFNNumber" formName="editFiscal" placeholder="Номер ФН"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Дата активации</label>
                                        <Field className="form-control" :value="data.kkt.kktActivationDate" name="kktActivationDate" formName="editFiscal" placeholder="Дата активации, если заполнено - чеки будут пытаться отправляться"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Количество чеков</label>
                                        <Field className="form-control" :value="data.kkt.kktBillsCount" name="kktBillsCount" formName="editFiscal" placeholder=""/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Регистрационный номер ОФД</label>
                                        <Field className="form-control" :value="data.kkt.kktOFDRegKey" name="kktOFDRegKey" formName="editFiscal" placeholder="Регистрационный номер ОФД"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Сервер</label>
                                        <Field className="form-control" :value="data.kkt.server" name="server" formName="editFiscal" placeholder="Сервер"/>
                                    </div>

                                  <div class="form-group" v-if="data.kkt.type === 'telemedia'">
                                    <label class="form-label f-b">Номер кассы</label>
                                    <Field className="form-control" :value="data.kkt.rekassaKktId"   name="rekassaKktId" formName="editFiscal" placeholder="Введите номер кассы"/>
                                  </div>

                                  <div class="form-group" v-if="data.kkt.type === 'telemedia'">
                                    <label class="form-label f-b">Номер отдела</label>
                                    <Field className="form-control" :value="data.kkt.rekassaNumber"   name="rekassaNumber" formName="editFiscal" placeholder="Введите номер отдела"/>
                                  </div>
                                </div>
                            </div>
                        </template>
                        <template slot="submit">
                            <button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
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
    import {ofdNames} from '@/utils/lists/Kkt';
    import { required } from '@/utils/validation';

    export default {
        components: {
            Validate,
            Field
        },
        data: () => ({
            ofdNames,
            data: null,

            schema: {
                inn: [required],
                companyName: [required],
                kktFactoryNumber: [required],
                kktFNNumber: [required]

            },

            kktUploading: false
        }),
        apollo: {
            data: {
                variables() {
                    return {
                        id: Number(this.$route.params.id),
                    }
                },
                query: gql `
      query getKkt($id: Int!) {
        kkt: getKktById(id: $id) {
                id
                inn
                companyName
                kktModel
                kktFactoryNumber
                kktRegNumber
                kktFNNumber
                kktActivationDate
                kktBillsCount
                kktOFDRegKey
                server
                type
                rekassaNumber
                rekassaKktId
                ofdName
            }

      }
      `,
                update(data) {
                    return {
                        kkt: data.kkt
                    };
                }
            }
        },
        methods: {
            async save() {
                try {
                    this.kktUploading = true;
                    if(!this.$store.getters['cache/data'].kktBillsCount){
                        this.$store.getters['cache/data'].kktBillsCount = 0;
                    }
                    else{
                        this.$store.getters['cache/data'].kktBillsCount = Number(this.$store.getters['cache/data'].kktBillsCount);
                    }
                    const data = {
                        id: Number(this.data.kkt.id),
                        kktModel: this.data.kkt.kktModel,
                        ...this.$store.getters['cache/data'],
                        ofdName: this.data.kkt.ofdName,
                        type: this.data.kkt.type,
                    };

                    const { errors } = await this.$apollo.mutate({
                        mutation: gql `
          mutation saveKKt ($data: EditKktInput!) {
            editKkt (input: $data) {
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
                    this.$refs.form.showMessage('error', 'Ошибка сохранения.');
                } finally {
                    this.kktUploading = false;
                }
            },
            onSuccess () {
                const router = this.$router;
                setTimeout(function () { router.push('/fiscalAll#kktsAll'); }, 1000);
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

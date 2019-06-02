<template>
    <div class="container">
        <div class="side-app" v-if="data">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2 card">
                    <div class="card-header">
                        <h3 class="card-title f-b">Редактирование ККТ №{{data.kkt.id}}</h3>
                    </div>

                    <Validate
                            routeBack="/fiscalAll"
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
                                        <label class="form-label f-b">Модель фискального регистратора</label>
                                        <select v-model="data.kkt.kktModel" class="form-control custom-select">
                                            <option value="УМКА-01-ФА (ФН15)">УМКА-01-ФА (ФН15)</option>
                                            <option value="УМКА-01-ФА (ФН36)">УМКА-01-ФА (ФН36)</option>
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
                                        <label class="form-label f-b">Номер ФН</label>
                                        <Field className="form-control" :value="data.kkt.kktFNNumber" name="kktFNNumber" formName="editFiscal" placeholder="Номер ФН"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Дата активации</label>
                                        <Field className="form-control" :value="data.kkt.kktActivationDate" name="kktActivationDate" formName="editFiscal" placeholder="Дата активации, если заполнено - чеки будут пытаться отправляться"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Количество чеков</label>
                                        <Field className="form-control" :value="data.kkt.kktBillsCount" disabled name="kktBillsCount" formName="editFiscal" placeholder=""/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Регистрационный номер ОФД</label>
                                        <Field className="form-control" :value="data.kkt.kktOFDRegKey" name="kktOFDRegKey" formName="editFiscal" placeholder="Регистрационный номер ОФД"/>
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

    import { required } from '@/utils/validation';

    export default {
        components: {
            Validate,
            Field
        },
        data: () => ({
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
                        ...this.$store.getters['cache/data']
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
                setTimeout(function () { router.push('/fiscalAll'); }, 1000);
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

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
                                        <label class="form-label f-b">Номер контроллера ID</label>
                                        <input class="form-control" v-model="data.kkt.id" disabled name="id" formName="editFiscal" placeholder="Введите ID"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">ИНН</label>
                                        <input class="form-control"  v-model="data.kkt.inn" disabled name="inn" formName="editFiscal" placeholder="Введите ИНН"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Компания</label>
                                        <input class="form-control"  v-model="data.kkt.companyName" disabled name="companyName" formName="editFiscal" placeholder="Компания"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Модель ККТ</label>
                                        <input class="form-control"  v-model="data.kkt.kktModel" name="kktModel" formName="editFiscal" placeholder="Модель ККТ"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Заводской номер</label>
                                        <input class="form-control"  v-model="data.kkt.kktFactoryNumber" name="kktFactoryNumber" formName="editFiscal" placeholder="Заводской номер"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Регистрационный номер</label>
                                        <input class="form-control"  v-model="data.kkt.kktRegNumber" name="kktRegNumber" formName="editFiscal" placeholder="Регистрационный номер"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Номер ФН</label>
                                        <input class="form-control"  v-model="data.kkt.kktFNNumber" name="kktFNNumber" formName="editFiscal" placeholder="Номер ФН"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Дата активации</label>
                                        <input class="form-control"  v-model="data.kkt.kktActivationDate" name="kktActivationDate" formName="editFiscal" placeholder="Дата активации, если заполнено - чеки будут пытаться отправляться"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Количество чеков</label>
                                        <input class="form-control" v-model="data.kkt.kktBillsCount" disabled name="kktBillsCount" formName="editFiscal" placeholder=""/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Регистрационный номер ОФД</label>
                                        <input class="form-control"  v-model="data.kkt.kktOFDRegKey" name="kktOFDRegKey" formName="editFiscal" placeholder="Регистрационный номер ОФД"/>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template slot="submit">
                            <button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
                        </template>
                    </Validate>

                    <div class="aligned-text" v-else-if="$apollo.loading">Загрузка...</div>
                    <div class="aligned-text" v-else>Ошибка загрузки контроллера</div>

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
            data: {
                kkt: {
                    id: null,
                    inn: "",
                    companyName: "",
                    kktModel: "",
                    kktFactoryNumber: "",
                    kktRegNumber: "",
                    kktFNNumber: "",
                    kktActivationDate: "",
                    kktBillsCount: 0,
                    kktOFDRegKey: ""
                }
            },
            schema: {
                id: [required],
                inn: [required],
                companyName: [required],
                kktModel: [required],
                kktFactoryNumber: [required],
                kktRegNumber: [required],
                kktFNNumber: [required],
                kktActivationDate: [required]
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

                    const kkt = this.data.kkt;
                    const kktData = {
                        id: Number(kkt.id),
                        inn: kkt.inn,
                        companyName: kkt.companyName,
                        kktModel: kkt.kktModel,
                        kktFactoryNumber: kkt.kktFactoryNumber,
                        kktRegNumber: kkt.kktRegNumber,
                        kktFNNumber: kkt.kktFNNumber,
                        kktActivationDate: kkt.kktActivationDate,
                        kktBillsCount: Number(kkt.kktBillsCount),
                        kktOFDRegKey: kkt.kktOFDRegKey
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
                            data: kktData
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

<template>
    <div class="container">
        <div class="side-app" v-if="user">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2 card">
                    <div class="card-header">
                        <h3 class="card-title f-b">Изменение баланса пользователя {{user.legalInfo.companyName}}</h3>
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
                                    <div class="form-group">
                                        <label class="form-label f-b">Компания</label>
                                        <Field className="form-control" :value="user.legalInfo.companyName" disabled name="companyName" formName="editUser" placeholder="У компании не указано название"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">ИНН</label>
                                        <Field className="form-control" :value="user.legalInfo.inn"  disabled name="inn" formName="editUser" placeholder="У компании не указан ИНН"/>
                                    </div>



                                    <div class="form-group">
                                        <label class="form-label f-b">ОГРН</label>
                                        <Field className="form-control" :value="user.legalInfo.ogrn" disabled name="companyName" formName="editUser" placeholder="У компании не указан ОГРН"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Юридический адрес</label>
                                        <Field className="form-control" :value="user.legalInfo.legalAddress" disabled name="companyName" formName="editUser" placeholder="У компании не указан юр.адрес"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Фактический адрес</label>
                                        <Field className="form-control" :value="user.legalInfo.actualAddress" disabled name="companyName" formName="editUser" placeholder="У компании не указан фактический адрес"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Директор</label>
                                        <Field className="form-control" :value="user.legalInfo.director" disabled name="companyName" formName="editUser" placeholder="У компании не указан директор"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Телефон директора</label>
                                        <Field className="form-control" :value="user.legalInfo.directorPhone" disabled name="companyName" formName="editUser" placeholder="У компании не указан телефон директора"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Почта директора</label>
                                        <Field className="form-control" :value="user.legalInfo.directorEmail" disabled name="companyName" formName="editUser" placeholder="У компании не указана почта директора"/>
                                    </div>


                                    <div class="form-group">
                                        <label class="form-label f-b">Изменить баланс компании: Начислить( -Списать )</label>
                                        <Field className="form-control" :value="sum" name="sum" formName="editUser" placeholder="Введите сумму для начисления"/>
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
            user: null,
            sum: 0,
            schema: {
                sum: [required]

            },

            userUploading: false
        }),
        apollo: {
            user: {
                query: gql ` query {
                      getAllUsers {
                            phone
                            id
                            email
                            role
                            legalInfo{
                                    inn
                                    ogrn
                                    city
                                    companyName
                                    sno
                                    actualAddress
                                    legalAddress
                                    director
                                    directorPhone
                                    directorEmail
                                }
                             }
                    }
      `,
                update(user) {
                    const [returnedData] = user.getAllUsers.filter(user => user.id === Number(this.$route.params.id))

                    return returnedData

                }
            }
        },
        methods: {
            async save() {
                try {
                    this.userUploading = true;
                    const data = {
                        id: this.user.id,
                        sum: Number(this.$store.getters['cache/data'].sum)
                    };

                    const { errors } = await this.$apollo.mutate({
                        mutation: gql `mutation change($data: ChangeUserBalanceInput! ){
                                         changeUserBalance(input: $data)
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
                    this.userUploading = false;
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
        }
    }
</script>

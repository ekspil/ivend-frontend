<template>
    <div class="container">
        <div class="side-app" v-if="user">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2 card">
                    <div class="card-header" v-if="user">
                        <h3 class="card-title f-b">Информация о пользователе {{user.id}}</h3>
                    </div>

                    <Validate
                            routeBack="/fiscalAll#usersAll"
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

    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';

    import { required, email, number } from '@/utils/validation';

    export default {
        components: {
            Validate,
            Field
        },
        data: () => ({
            newPassword: null,
            user: null,
            schema: {
                email: [required],
                phone: [required]
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
                    const input = {
                        ...this.$store.getters['cache/data'],
                        role: this.user.role,
                        id: this.user.id
                    }
                    if(this.newPassword){
                        input.password = this.newPassword
                    }
                    console.log(input)
                    const { errors, data } = await this.$apollo.mutate({
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

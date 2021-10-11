<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12" v-if="partners">
                  <Validate
                      formName="addTariff"
                      title="Изменение тарификации"
                      @onSubmit="save"
                      :schema="schema"
                      ref="form"
                      @onSuccess="onSuccess"
                  >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">

                                    <div class="form-group">
                                        <label class="form-label f-b">Целевая группа</label>
                                        <select v-model="partnerId" class="form-control custom-select">
                                            <option value="null">Для всех</option>
                                            <option v-for="partner of partners" :value="partner.id">{{ partner.companyName }}</option>
                                        </select>
                                    </div>


                                    <div class="form-group">
                                        <label class="form-label f-b">Телеметрия</label>
                                        <input class="form-control" value="" type="number" v-model="telemetry" placeholder="Телеметрия"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Эквайринг</label>
                                        <input class="form-control" value="" type="number" v-model="acquiring" placeholder="Эквайринг"/>
                                    </div>


                                    <div class="form-group">
                                        <label class="form-label f-b">Фискализация</label>
                                        <input class="form-control" value="" type="number" v-model="fiscal" placeholder="Фискализация"/>
                                    </div>


                                    <div class="form-group">
                                        <label class="form-label f-b">Действует с</label>
                                        <input class="form-control" value="" type="date"  v-model="startedAt" placeholder="Дата начала"/>
                                    </div>


                                  <div class="form-group">
                                    <label class="form-label f-b">Описание</label>
                                    <Field className="form-control" value="" name="meta" formName="addTariff" placeholder="Описание"/>
                                  </div>

                                </div>
                            </div>
                        </template>
                        <template slot="submit">
                            <button type="submit" class="btn btn-primary ml-auto">Задать тариф</button>
                        </template>
                  </Validate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    import Validate from '@/modules/validation/Validate';

    import { required } from '@/utils/validation';
    import { convertServerError } from '@/utils';
    import Field from '@/modules/validation/Field';

    export default {
        name: 'addNews',
        components: {
          Validate,
            Field
        },
        data: () => ({
            partners: null,
            input: {
                active: 0
            },
          schema: {
            meta: [required],
          },
            fiscal: 0,
            partnerId: null,
            telemetry: 0,
            acquiring: 0,
            startedAt: null,
        }),

      apollo: {
        partners: {
          query: gql`
                    query($input: AllUsersInput) {
                      getAllUsers(input: $input) {
                            phone
                            id
                            email
                            inn
                            companyName
                    }
                    }
                `,
          variables () {
            return {
              input: {
                role: "PARTNER"
              },
            };
          },
          update (data) {

            return data.getAllUsers
          }
        }
      },
        methods: {
            async save () {
                const data = {
                  fiscal: Number(this.fiscal),
                  partnerId: Number(this.partnerId),
                  telemetry: Number(this.telemetry),
                  startedAt: new Date(this.startedAt).getTime(),
                  acquiring: Number(this.acquiring),
                  ...this.$store.getters['cache/data']
                };

                        try {
                            const { errors } = await this.$apollo.mutate({
                                mutation: gql`
					mutation createTariff ($data: TariffInput!) {
						createTariff (input: $data) {
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
                            this.$refs.form.showMessage('error', convertServerError(error.message));
          }



            },
            onSuccess () {
                const router = this.$router;
                setTimeout(function () { router.push('/fiscalAll#tariffs'); }, 1000);
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

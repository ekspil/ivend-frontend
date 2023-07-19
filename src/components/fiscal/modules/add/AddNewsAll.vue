<template>
    <div class="container">
        <div class="side-app max-w-1200">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">
                    <Validate
                            formName="addNews"
                            title="Добавление записей"
                            :schema="schema" ref="form"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">

                                    <div class="form-group">
                                        <label class="form-label f-b">Тип записи</label>
                                        <select v-model="type" class="form-control custom-select">
                                            <option value="news">Новость</option>
                                          <option value="partnerInfo">Информация для партнера</option>
                                            <option value="info">(ТП) Информация</option>
                                            <option value="instr">(ТП) Инструкция</option>
                                        </select>
                                    </div>


                                    <div class="form-group">
                                        <label class="form-label f-b">Запись активна</label>
                                        <select v-model="input.active" class="form-control custom-select">
                                            <option value=1>Да</option>
                                            <option value=0>Нет</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Заголовок новости</label>
                                        <Field className="form-control" value=""  name="header" formName="addNews" placeholder="Заголовок"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Дата</label>
                                        <Field className="form-control" value="" name="date" formName="addNews" placeholder="Дата"/>
                                    </div>

<!--                                    <div class="form-group">-->
<!--                                        <label class="form-label f-b">Текст  ([P] - параграф, [li]https://ivend.pro[name]Наш сайт[li] - пример ссылки, не больше одной на параграф)</label>-->
<!--                                        <Field className="form-control" value="" name="text" formName="addNews" placeholder="Текст"/>-->
<!--                                    </div>-->

                                  <div class="form-group">
                                    <label class="form-label f-b">Текст</label>
                                    <vue-editor v-model="input.text" :editorToolbar="customToolbar"></vue-editor>
                                  </div>


                                  <div class="form-group">
                                        <label class="form-label f-b">Ссылка на картинку</label>
                                        <Field className="form-control" value="" name="link" formName="addNews" placeholder="Ссылка на изображение"/>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template slot="submit">
                            <button type="submit" class="btn btn-primary ml-auto">Создать новость</button>
                        </template>
                    </Validate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    import { convertServerError } from '@/utils';
    import { required } from '@/utils/validation';

    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';

    import { VueEditor } from 'vue2-editor'

    export default {
        name: 'addNews',
        components: {
            Validate,
            Field,
            VueEditor
        },
        data: () => ({
            input: {
                active: 0,
                text: null,
            },
            type: "news",
          customToolbar: [
            [{
              header: [false, 1, 2, 3, 4, 5, 6]
            }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['image', 'link'],
            [{
              color: []
            }, {
              background: []
            }],
          ],

            schema: {
                inn: [required],
                companyName: [required]
            }
        }),
        methods: {
            async save () {
                const data = {
                    active: Number(this.input.active),
                    text: this.input.text,
                    ...this.$store.getters['cache/data']
                };

                switch (this.type) {
                    case "news":
                        try {
                            const { errors } = await this.$apollo.mutate({
                                mutation: gql`
					mutation saveNews ($data: NewsInput!) {
						createNews (input: $data) {
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
                        break
                    case "info":
                        try {
                            const { errors } = await this.$apollo.mutate({
                                mutation: gql`
					mutation saveInfo ($data: InfoInput!) {
						createInfo (input: $data) {
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
                        break
                    case "partnerInfo":
                        try {
                            const { errors } = await this.$apollo.mutate({
                                mutation: gql`
					mutation savePartnerInfo ($data: PartnerInformationInput!) {
						createPartnerInfo (input: $data) {
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
                        break
                    case "instr":
                        try {
                            const { errors } = await this.$apollo.mutate({
                                mutation: gql`
					mutation saveInstr ($data: InstrInput!) {
						createInstr (input: $data) {
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
                        break
                }




            },
            onSuccess () {
                const router = this.$router;
                setTimeout(function () { router.push('/fiscalAll#newsAll'); }, 1000);
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

<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">
                    <Validate
                            formName="addNews"
                            title="Редактирование записи"
                            :schema="schema" ref="form"
                            @onSubmit="save"
                            @onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12" v-if="data">


                                    <div class="form-group">
                                        <label class="form-label f-b">Тип записи</label>
                                        <select v-model="type" class="form-control custom-select" disabled>
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
                                        <label class="form-label f-b">Заголовок записи</label>
                                        <Field className="form-control" :value="data.news.header"  name="header" formName="addNews" placeholder="Заголовок"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Дата</label>
                                        <Field className="form-control" :value="data.news.date" name="date" formName="addNews" placeholder="Дата"/>
                                    </div>

<!--                                    <div class="form-group">-->
<!--                                        <label class="form-label f-b">Текст  ([P] - параграф, [li]https://ivend.pro[name]Наш сайт[li] - пример ссылки, не больше одной на параграф)</label>-->
<!--                                        <Field className="form-control" :value="data.news.text" name="text" formName="addNews" placeholder="Текст (Используй в тексте: [P]  - он создаст новый параграф)"/>-->
<!--                                    </div>-->

                                    <div class="form-group">
                                      <label class="form-label f-b">Текст</label>
                                      <vue-editor v-model="input.text" :editorToolbar="customToolbar"></vue-editor>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Ссылка на картинку</label>
                                        <Field className="form-control" :value="data.news.link" name="link" formName="addNews" placeholder="Ссылка на изображение"/>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template slot="submit">
                            <button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
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
                id: null,
                text: null
            },

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
            type: null,
            query: null,

            schema: {
                header: [required],
               // text: [required],
                date: [required]
            }
        }),
        async beforeMount(){
            this.type = this.$route.params.type
        },
        apollo: {
            data: {
                variables() {
                    return {
                        id: Number(this.$route.params.id),
                    }
                },
                query: gql `
      query GetController($id: Int!) {
        news: getNewsById(id: $id) {
          id
          active
          header
          text
          link
          date
        }
        info: getInfoById(id: $id) {
          id
          active
          header
          text
          link
          date
        }
        partnerInfo: getPartnerInfoById(id: $id) {
          id
          active
          header
          text
          link
          date
        }
        instr: getInstrById(id: $id) {
          id
          active
          header
          text
          link
          date
        }

      }
      `,
                update(data) {
                    let i
                    switch(this.type){
                        case "news":
                            i = data.news
                            this.input.text = i.text
                            break
                        case "info":
                            i = data.info
                            this.input.text = i.text

                            break
                        case "partnerInfo":
                            i = data.partnerInfo
                            this.input.text = i.text

                            break
                        case "instr":
                            i = data.instr
                            this.input.text = i.text
                            break
                    }

                    this.input.id = i.id
                    this.input.active = i.active
                    return {
                        news: i
                    };
                }
            }
        },
        methods: {
            async save () {
                const data = {
                    active: Number(this.input.active),
                    id: Number(this.input.id),
                    text: this.input.text,
                    ...this.$store.getters['cache/data']
                };

                switch (this.type) {
                    case "news":
                        try {
                            const { errors } = await this.$apollo.mutate({
                                mutation: gql`
					mutation saveNews ($data: NewsInput!) {
						changeNews (input: $data) {
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
						changeInfo (input: $data) {
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
						changePartnerInfo (input: $data) {
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
						changeInstr (input: $data) {
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

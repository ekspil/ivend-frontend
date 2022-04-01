<template>
        <div class="side-app">



            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">
                    <div class="form-label f-b card-header my-auto">Позвонить в техническую поддержку: {{infoPhoneTech}}</div>

                    <Validate
                            formName="addQuestion"
                            title="Задать вопрос в техническую поддержку"
                            :schema="schema" ref="form"
                            @onSubmit="send()"
                            @onSuccess="onSuccess()"
                            back="false"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12" v-if="input">


                                    <div class="form-group">
                                        <label class="form-label f-b">Категория проблемы</label>
                                        <select v-model="input.category" class="form-control custom-select">
                                            <option value="general">Общий вопрос</option>
                                            <option value="site">Работа сайта</option>
                                            <option value="equipment">Работа оборудования</option>
                                            <option value="error">Что-то сломалось</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Ваш вопрос(кратко)</label>
                                        <Field  className="form-control"  name="title" formName="addQuestion" placeholder="Заголовок"/>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Развернутое описание вопроса</label>
                                        <Field className="form-control"  name="text" formName="addQuestion" placeholder="Описание вашего вопроса"/>
                                    </div>

                                </div>
                            </div>
                        </template>
                        <template slot="submit">
                            <button type="submit" class="btn btn-primary ml-auto">Отправить</button>
                        </template>
                    </Validate>
                </div>
            </div>
        </div>

</template>


<script>
    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';
    import { required } from '@/utils/validation';
    import { convertServerError } from '@/utils';

    import gql from 'graphql-tag';
    export default {
        name: "Chat",
        components: {
            Validate,
            Field
        },
        data: ()=> ({
            infoPhoneTech: "+7 (952) 381-31-41",
            input: {
                category: "general"
            },
            schema: {
                title: [required]
            },

        }),

      beforeMount() {
        if(this.$store.state.user.partnerInfo && this.$store.state.user.partnerInfo.infoPhoneTech){
          this.infoPhoneTech = this.$store.state.user.partnerInfo.infoPhoneTech
        }
      },
        methods: {
            async send () {
                const cache = this.$store.getters["cache/data"]
                try {
                    const { errors } = await this.$apollo.mutate({
                        mutation: gql`
                mutation sendEmail ($input: EmailInput!) {
                  sendEmail (input: $input)
                }
                `,

                        variables: {
                            input: {
                                ...this.input,
                                ...this.$store.getters["cache/data"]
                            }
                        }
                    });
                    this.$refs.form.process({ errors, success: 'Сообщение успешно отправлено' });
                } catch (error) {
                    this.$refs.form.showMessage('error', convertServerError(error.message));
                }
            },
            async onSuccess(){
                setTimeout(()=>{
                    this.$router.push('/home')
                }, 3000)

            }
        }
    }
</script>

<style scoped>

</style>
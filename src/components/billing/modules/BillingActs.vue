<template>
    <div class="table-responsive payment-table payment-table--history">
        <table class="table card-table table-vcenter text-nowrap" v-if="acts && acts.length > 0">
            <thead>
            <th class="service-date-cel sortable up">Дата</th>
            <th class="service-price-cel sortable">Тип</th>
            <th class="service-price-cel sortable">Сумма</th>
            <th class="service-price-cel sortable"></th>
            </thead>
            <tbody>
            <tr v-for="act in acts" :key="act.id" >
                <td class="service-date-cel">{{ getTime(act.timestamp) }}</td>
                <td class="service-date-cel">{{ act.meta }}</td>
                <td class="service-price-cel">{{ act.sum }}</td>
                <td class="service-price-cel"><a  :href="null" target="_blank"  style="min-width: max-content;" :class="{
                  'disabled': actBusy.includes(act.id),
                  'btn btn-white btn-block ml-2': true
                }" @click.prevent="requestAct(act)">Скачать</a></td>
                </tr>
            </tbody>
        </table>

        <div v-else class="aligned-text">Ни одного акта пока не сформировано</div>
    </div>
</template>

<script>

    import gql from "graphql-tag";
    import {head, isEmpty} from "ramda";

    export default {
        name: 'BillingHistory',
        data: ()=>({
          deleted: [],
          acts: null,
          actBusy: [],
        }),
      apollo: {
        acts: {
          query: gql`
                    query getActs($userId: Int)  {
                         getActs(userId: $userId) {
                            id
                            sum
                            timestamp
                            meta
                            userId
                        }
                    }
                `,
          variables(){
            let userId = null
            if(this.$route.query.userId){
              userId = Number(this.$route.query.userId)
              return {
                userId
              }
            }
            return {}
          } ,

          update(data){
            return data.getActs
          }
        }
      },
        computed: {
        },
        methods: {
            getTime (timestamp){
                const date = new Date(timestamp);
                return `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`;
            },
          async requestAct (act) {
            this.actBusy.push(act.id)
            try {
              const { errors, data } = await this.$apollo.mutate({
                mutation: gql`
          mutation RequestOrder ($id: Int!) {
            generateAct(id: $id) {
              url
            }
          }
          `,
                variables: {
                  id: act.id
                }
              });

              if (errors && !isEmpty(errors)) {
                const error = head(errors).message || 'Ошибка сервера';
              } else {

                if (data.generateAct.url) {
                  //window.location.href = data.generatePdf.url;
                  window.open(data.generateAct.url, '_blank');
                }
              }
            } catch (error) {
              console.log(error.message)
            }
            finally {

              this.actBusy = this.actBusy.filter(it=> it !== act.id)
            }
          },
        }
    }
</script>
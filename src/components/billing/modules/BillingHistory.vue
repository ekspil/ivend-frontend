<template>
    <div class="table-responsive payment-table payment-table--history">
        <table class="table card-table table-vcenter text-nowrap" v-if="dps && dps.length > 0">
            <thead>
            <th class="service-date-cel sortable up">Дата</th>
            <th class="service-price-cel sortable">Сумма</th>
            <th class="service-status-cel sortable">Статус</th>
            </thead>
            <tbody>
            <tr v-for="deposit in dps" :key="deposit.id" :class="(getStatusClass(deposit.status)).class">
                <td class="service-date-cel">{{ getTime(deposit.timestamp) }}</td>
                <td class="service-price-cel">{{ deposit.amount }}</td>
                <td class="service-status-cel">{{ (getStatusClass(deposit.status)).text }} <a v-if="deposit.status === 'PENDING'" :href="deposit.redirectUrl" target="_blank" class="btn btn-white btn-block ml-2" style="min-width: max-content;">Оплатить</a> <a v-if="deposit.status === 'PENDING'" @click.prevent="deleteDeposit(deposit.id)" target="_blank" class="btn btn-white btn-block ml-2" style="min-width: max-content; margin-top: 0;">Отмена</a></td>
            </tr>
            </tbody>
        </table>

        <div v-else class="aligned-text">Нет депозитов</div>
    </div>
</template>

<script>

    import gql from "graphql-tag";

    export default {
        name: 'BillingHistory',
        props: {
            deposits: {
                type: Array,
                default: () => []
            }
        },
        data: ()=>({
          deleted: []
        }),
        computed: {
          dps(){
            return this.deposits.filter(d=> !this.deleted.includes(d.id))
          }
        },
        methods: {
            getTime (timestamp){
                const date = new Date(timestamp);
                return `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`;
            },
          async deleteDeposit(id){

                const { errors } = await this.$apollo.mutate({
                    mutation: gql `mutation removeDeposit($id: Int!){
                        removeDeposit(id: $id)
                    }`,
                    variables: {
                     id
                    }
                });
                if(errors) return false
                this.deleted.push(id)



          },
            getStatusClass (status) {
                if (status === 'SUCCEEDED') {
                    return { class: 'payment-table__successed-row', text: 'Успешно' };
                } else if (status === 'PENDING') {
                    return { class: 'payment-table__pending-row', text: 'В ожидании' };
                } else if (status === 'CANCELLED') {
                    return { class: 'payment-table__cancelled-row', text: 'Отменено' };
                } else if (status === 'ADMIN_EDIT') {
                    return { class: 'payment-table__successed-row', text: 'Ручной ввод' };
                }
            }
        }
    }
</script>
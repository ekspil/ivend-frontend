<template>
    <div class="table-responsive payment-table payment-table--history">
        <table class="table card-table table-vcenter text-nowrap" v-if="deposits && deposits.length > 0">
            <thead>
                <th class="service-date-cel sortable up">Дата</th>
                <th class="service-price-cel sortable">Сумма</th>
                <th class="service-status-cel sortable">Статус</th>
            </thead>
            <tbody>
                <tr v-for="deposit in deposits" :key="deposit.id" :class="getStatusClass(deposit.status).class">
                    <td class="service-date-cel">10.02.2019 13:30</td>
                    <td class="service-price-cel">{{ deposit.amount }}</td>
                    <td class="service-status-cel">{{ getStatusClass(deposit.status).text }}</td>
                </tr>
            </tbody>
        </table>

        <div v-else class="aligned-text">Нет депозитов</div>
    </div>
</template>

<script>
export default {
    name: 'BillingHistory',
    props: {
        deposits: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        getStatusClass (status) {
            if (status === 'SUCCEEDED') {
                return { class: 'payment-table__successed-row', text: 'Успешно' };
            } else if (status === 'PENDING') {
                return { class: 'payment-table__pending-row', text: 'В ожидании' };
            } else if (status === 'CANCELED') {
                return { class: 'payment-table__cancelled-row', text: 'Отменено' };
            }
        }
    }
}
</script>

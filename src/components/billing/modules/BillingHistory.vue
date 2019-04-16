<template>
    <div class="table-responsive payment-table payment-table--history">
        <table class="table card-table table-vcenter text-nowrap" v-if="deposits && deposits.length > 0">
            <thead>
            <th class="service-date-cel sortable up">Дата</th>
            <th class="service-price-cel sortable">Сумма</th>
            <th class="service-status-cel sortable">Статус</th>
            </thead>
            <tbody>
            <tr v-for="deposit in deposits" :key="deposit.id" :class="(getStatusClass(deposit.status)).class">
                <td class="service-date-cel">{{ getTime(deposit.timestamp) }}</td>
                <td class="service-price-cel">{{ deposit.amount }}</td>
                <td class="service-status-cel">{{ (getStatusClass(deposit.status)).text }} <a v-if="deposit.status === 'PENDING'" :href="deposit.redirectUrl" target="_blank" class="btn btn-white btn-block ml-2" style="min-width: max-content;">Оплатить</a></td>
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
            getTime (timestamp){
                const date = new Date(timestamp);
                return `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`;
            },
            getStatusClass (status) {
                if (status === 'SUCCEEDED') {
                    return { class: 'payment-table__successed-row', text: 'Успешно' };
                } else if (status === 'PENDING') {
                    return { class: 'payment-table__pending-row', text: 'В ожидании' };
                } else if (status === 'CANCELLED') {
                    return { class: 'payment-table__cancelled-row', text: 'Отменено' };
                }
            }
        }
    }
</script>
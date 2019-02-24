<template>
    <div class="table-responsive payment-table payment-table--history">
        <table class="table card-table table-vcenter text-nowrap" v-if="deposits && deposits.length > 0">
            <thead>
                <th class="service-date-cel sortable up">Дата</th>
                <th class="service-price-cel sortable">Сумма</th>
                <th class="service-status-cel sortable">Статус</th>
            </thead>
            <tbody>
                <tr class="payment-table__pending-row" v-for="deposit in deposits" :key="deposit.id">
                    <td class="service-date-cel">10.02.2019 13:30</td>
                    <td class="service-price-cel">{{ deposit.amount }}</td>
                    <td class="service-status-cel">{{ deposit.status }}</td>
                </tr>
            </tbody>
        </table>

        <div v-else class="aligned-text">Нет депозитов</div>
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: 'BillingHistory',
        apollo: {
            deposits: {
                query: gql`
                    query {
                        getProfile {
                            billing {
                                deposits {
                                    id,
                                    amount,
                                    status
                                }
                            }
                        }
                    }
                `,
                update: data => data.getProfile.billing.deposits
            }
        },
        data: () => ({
            deposits: null
        })
}
</script>
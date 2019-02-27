<template>
    <div class="table-responsive payment-table payment-table--services">
        <table class="table card-table table-vcenter text-nowrap">
            <thead>
                <th class="service-name-cel sortable up">Название</th>
                <th class="service-price-cel sortable">Стоимость р/день</th>
                <th></th>
            </thead>
            <tbody>
                <tr class="payment-table__row-subtable">
                    <td class="cel-table" colspan="3">
                        <table class="controller-service-table">
                            <thead class="active">
                                <tr>
                                    <th colspan="3">Контроллер 1</th>
                                </tr>
                            </thead>
                            <tr v-for="service in services.controller" :key="service.id">
                                <td class="service-name-cel">{{ service.name }}</td>
                                <td class="service-price-cel">{{ service.price }}</td>
                                <td class="delete-cel-btn">
                                    <button class=""><i class="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

	export default {
		name: 'BillingServices',
        data: () => ({
            services: []
        }),
        apollo: {
            services: {
                query: gql`
                    query getServices {
                        getAvailableServices {
                            controller {
                                id,
                                name,
                                price,
                                billingType
                            }
                        }
                    }
                `,

                update: data => data.getAvailableServices
            }
        }
	}
</script>

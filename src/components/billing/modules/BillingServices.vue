<template>
    <div class="table-responsive payment-table payment-table--services">
        <table class="table card-table table-vcenter text-nowrap">
            <thead>
                <th class="service-name-cel sortable up">Название</th>
                <th class="service-price-cel sortable">Стоимость р/месяц</th>
                <th></th>
            </thead>
            <tbody>
                <tr class="payment-table__row-subtable" v-for="(controller, index) in controllers" :key="controller.id" v-if="controller.services.length > 0">
                    <td class="cel-table" colspan="3">
                        <table class="controller-service-table">
                            <thead :class="!controllers[index].hidden && 'active'" @click="toggleController(index)">
                                <tr>
                                    <th colspan="3">{{ controller.uid }}</th>
                                </tr>
                            </thead>
                            <tr
                                v-for="service in controller.services" :key="service.id"
                                v-if="(defaultHidden && controllers[index].hidden) || (!defaultHidden && !controllers[index].hidden)"
                            >
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

    import { not } from 'ramda';

	export default {
		name: 'BillingServices',
        data: () => ({
            controllers: [],
            defaultHidden: process.env.VUE_APP_SERVICES_DEFAULT_HIDDEN
        }),
        apollo: {
            controllers: {
                query: gql`
                    query getServices {
                        getControllers {
                            id
                            uid
                            services {
                                id
                                name
                                price
                                billingType
                            }
                        }
                    }
                `,
                pollInterval: 60000,

                update: data => data.getControllers
            }
        },
        methods: {
            toggleController (index) {
                this.$set(this.controllers[index], 'hidden', not(this.controllers[index].hidden));
            }
        }
	}
</script>

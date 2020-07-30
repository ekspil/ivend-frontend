<template>
    <div class="table-responsive payment-table payment-table--services">
        <table class="table card-table table-vcenter text-nowrap">
            <thead>
                <th class="service-name-cel sortable up">Название</th>
                <th class="service-price-cel sortable">Количество</th>
                <th class="service-price-cel sortable">Стоимость р/месяц</th>
            </thead>
            <tbody>

                            <tr
                                v-for="service in servs" :key="service.id"

                            >
                                <td class="service-name-cel">{{ service.name }}</td>
                                <td class="service-price-cel">{{ service.count }}</td>
                                <td class="service-price-cel">{{ service.price }}</td>

                            </tr>

                            <tr
                                    v-if="servs"
                            >
                                <td class="service-name-cel" style="color: #00dabf">Итого</td>
                                <td class="service-price-cel"></td>
                                <td class="service-price-cel" style="color: #00dabf; font-weight: bold">{{servs.reduce((acc, i) => acc + i.price, 0)}}</td>

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
                                fixCount
                                billingType
                            }
                        }
                    }
                `,
                pollInterval: 60000,

                update: data => data.getControllers
            }
        },
        computed:{
		    servs: function(){
		        const services = []
                for(let controller of this.controllers){
                    for(let service of controller.services){
                        const [exist] = services.filter(serv => serv.id === service.id)
                        if(!exist){
                            service.count = 1
                            services.push(service)
                        }else{
                            services.map(serv => {
                                if(serv.id !== service.id) return serv
                                serv.price = serv.price + service.price
                                serv.count++
                                if(service.fixCount){
                                    serv.count = service.fixCount
                                    serv.price = service.price
                                }
                                return serv
                            })
                        }


                    }
                }
                if(services.length){
                    const json = JSON.stringify(services)
                    this.$store.commit("cache/setServices", json)
                    return services
                }

            }
        },
        methods: {
            toggleController (index) {
                this.$set(this.controllers[index], 'hidden', not(this.controllers[index].hidden));
            }
        }
	}
</script>

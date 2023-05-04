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
    props: {
      orangeBilling: {
        type: Object,
        default: () => null
      }
    },
        data: () => ({
            controllers: [],
            svs: [],
            defaultHidden: process.env.VUE_APP_SERVICES_DEFAULT_HIDDEN,
        }),
        apollo: {
            controllers: {
                query: gql`
                    query getServices($userId: Int)  {
                        getControllers(userId: $userId) {
                            id
                            uid
                            services(userId: $userId) {
                                id
                                name
                                price
                                fixCount
                                billingType
                            }
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
                  return data.getControllers
                }
            }
        },
        computed:{
            servs: function(){
                let services = []
                for(let controller of this.controllers){
                    for(let service of controller.services){
                        const [exist] = services.filter(serv => serv.id === service.id)
                        if(!exist){
                          let s = JSON.parse(JSON.stringify(service))
                          s.count = 1
                          if(s.id === 60 && this.orangeBilling) {
                            s.price = -this.orangeBilling.orangeFixSum
                            s.count = -this.orangeBilling.orangeCount
                          }
                            services.push(s)
                        }else{
                            services.map(serv => {
                                if(serv.id === 60 && this.orangeBilling) {
                                  serv.price = -this.orangeBilling.orangeFixSum
                                  serv.count = -this.orangeBilling.orangeCount
                                  return serv
                                }
                                if(serv.id !== service.id) return serv
                                serv.price = serv.price + service.price
                                serv.count++
                                if(service.fixCount){
                                    serv.count = service.fixCount
                                    serv.price = service.price
                                    if(serv.id === 60 && this.orangeBilling) {
                                      serv.price = -this.orangeBilling.orangeFixSum
                                      serv.count = -this.orangeBilling.orangeCount
                                    }
                                }
                                return serv
                            })
                        }


                    }
                }

                if(services.length){
                    const json = JSON.stringify(services)
                    services = null
                    this.$store.commit("cache/setServices", json)
                    return JSON.parse(json)
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
<style>
.service-price-cel {
  font-weight: bold;
}
</style>

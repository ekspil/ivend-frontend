<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Тарифы</div>
            </div>

            <div class="card-body">

              <div class="table-responsive">
                <table class="table card-table table-vcenter text-nowrap">
                  <thead class="bg-primary text-white">
                  <tr>
                    <th class="text-white">Название услуги</th>
                    <th class="text-white">Стоимость</th>


                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">Услуга телеметрии за один ТА</th>


                    <td>{{ (this.tariff ? this.tariff.telemetry : 100).toFixed(2) }} руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row">Услуга фискализации за один ТА (от 20 ТА)</th>


                    <td>{{ (this.tariff ? this.tariff.fiscal/20 : 100).toFixed(2) }} руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row">Услуга фискализации до 20 ТА за всю сеть</th>


                    <td>{{ (this.tariff ? this.tariff.fiscal : 2000).toFixed(2)}}  руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row">Услуга СМС информирования</th>


                    <td>2 руб./смс</td>
                  </tr>


                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Реквизиты и контакты</div>
            </div>

            <div class="card-body" v-html="infoRequisites">


            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  export default {
    name: 'Tariffs',
    async beforeMount() {
      if(this.$store.state.user.partnerInfo){
        this.infoRequisites = this.$store.state.user.partnerInfo.infoRequisites
        const { data } = await this.$apollo.query({
          query: gql`
					query($partnerId: Int!){
					getTariff(partnerId: $partnerId){
               telemetry
               acquiring
               fiscal
            }
					}

					`,
          variables: {
            partnerId: this.$store.state.user.partnerInfo.partnerId
          }
        })

        if(data && data.getTariff){
          this.tariff = data.getTariff
        }
      }


    },
    data: () => ({
      tariff: null,
      infoRequisites: `
      <p>ООО "ИНТЕРНЕТ  ВЕНДИНГ"<br>
                ИНН: 7805714120<br>
                ОГРН: 1177847308671<br><br>

                г. Санкт-Петербург<br>
                пр. Трамвайный 12А<br>
                8 (931) 328 81 59<br>
                info@ivend.pro</p>
      `
    })
  }
</script>

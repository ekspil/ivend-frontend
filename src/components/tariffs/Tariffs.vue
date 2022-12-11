<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Тарифы и услуги</div>
            </div>

            <div class="card-body">

              <div class="table-responsive">
                <table class="table card-table table-vcenter text-nowrap">
                  <thead class="bg-primary text-white">
                  <tr>
                    <th class="text-white">Тарифы</th>
                    <th class="text-white">Стоимость</th>


                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row" class="black-bold">Абонентская плата за Услугу телеметрии Контроллера</th>


                    <td class="black-bold">{{ (this.tariff && this.tariff.telemetry ) ? this.tariff.telemetry : 100 }} руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Абонентская плата за Услугу телеметрии Терминала</th>


                    <td class="black-bold">{{100}} руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Абонентская плата за Услугу телеметрии Смарт-терминала</th>


                    <td class="black-bold">{{150}} руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Абонентская плата за Услугу фискализации одного Автомата (от 20 шт)</th>


                    <td class="black-bold">{{ (this.tariff && this.tariff.fiscal ) ? this.tariff.fiscal/20 : 100}} руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Абонентская плата за Услугу фискализации сети Автоматов (до 20 шт)</th>


                    <td class="black-bold">{{ (this.tariff && this.tariff.fiscal ) ? this.tariff.fiscal : 2000}}  руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Аренда онлайн-кассы OrangeData (за 1 год)</th>


                    <td class="black-bold">{{ (this.tariff && this.tariff.fiscalOrangeRent ) ? this.tariff.fiscalOrangeRent : 1500}}  руб./год</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Услуга почековой фискализации Автомата (только OrangeData, за 1 чек)</th>


                    <td class="black-bold">{{ (this.tariff && this.tariff.fiscalOrangeBill ) ? this.tariff.fiscalOrangeBill : 0.25}}  руб./чек</td>
                  </tr>


                  </tbody>
                </table>
                <table class="table card-table table-vcenter text-nowrap">
                  <thead class="bg-primary text-white">
                  <tr>
                    <th class="text-white">Услуги</th>
                    <th class="text-white">Стоимость</th>


                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row" class="black-bold">Услуга регистрации онлайн-кассы в ФНС </th>


                    <td class="black-bold">2500 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Услуга регистрации замены ФН в ФНС</th>


                    <td class="black-bold">2500 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Услуга снятия с учета онлайн-кассы в ФНС</th>


                    <td class="black-bold">2500 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Услуга настройки ЛК OrangeData</th>


                    <td class="black-bold">2500 руб.</td>
                  </tr>

                  <tr>
                    <th scope="row" class="black-bold">Услуга настройки ЛК iVend</th>


                    <td class="black-bold">2500 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Заключение договора с банком эквайером</th>


                    <td class="black-bold">2000 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Установка и запуск банковского терминала  на автомате</th>


                    <td class="black-bold">7000 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Прошивка банковского терминала  D200</th>


                    <td class="black-bold">2000 руб.</td>
                  </tr>

                  <tr>
                    <th scope="row" class="black-bold">Прошивка контроллера  iVend</th>


                    <td class="black-bold">500 руб.</td>
                  </tr>

                  <tr>
                    <th scope="row" class="black-bold">Установка и запуск контроллера  iVend на автомате</th>


                    <td class="black-bold">2000 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Замена процессорной платы контроллера  iVend</th>


                    <td class="black-bold">3000 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Замена платы модема контроллера  iVend</th>


                    <td class="black-bold">2000 руб.</td>
                  </tr>
                  <tr>
                    <th scope="row" class="black-bold">Замена интерфейсной платы контроллера  iVend</th>


                    <td class="black-bold">1000 руб.</td>
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
      if(this.$store.state.user.partnerInfo && this.$store.state.user.partnerInfo.infoRequisites){
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
      <p>ООО "АЙВЕНД"<br>
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
<style scoped>

.black-bold {
  color: black !important;
  font-weight: bold !important;
}
</style>
